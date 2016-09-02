var jwt = require('jsonwebtoken');
var Promessa = require('bluebird');
var _ = require('lodash');

var jsonWebToken = function(argumentos) {
  this.inicializar(argumentos);
};

jsonWebToken.prototype.inicializar = function(opcoes) {
  this.modelos = opcoes.modelos;
  this.token = null;
  this.jid = null;
  this.senha = null;
  this.superSegredo = opcoes.superSegredo;
  this.fichario = require('fichario');

  this.fichario.setaHoraDeExpiracao(60*14+10);
};

jsonWebToken.prototype.encontrarUmToken = function(requisicao) {

  this.token = null;

  if (requisicao.session && requisicao.session.token) {
    this.token = requisicao.session.token; 
  } 
  return this.token;
};

jsonWebToken.prototype.encontrarUmJid = function(requisicao) {
  
  this.jid = null;

  if (requisicao.body && requisicao.body.jid) {
    this.jid = requisicao.body.jid; 
  } 
  return this.jid;
};

jsonWebToken.prototype.encontrarUmaSenha = function(requisicao) {
  
  this.senha = null;

  if (requisicao.body && requisicao.body.senha) {
    this.senha = requisicao.body.senha;
  } 
  return this.senha;
};

jsonWebToken.prototype.autenticar = function(requisicao, resposta, contexto, cd) {
  var meuObj = this;

  return new Promessa(function(deliberar, recusar) {

    meuObj.encontrarUmJid(requisicao);
    meuObj.encontrarUmaSenha(requisicao);

    if (meuObj.jid && meuObj.senha) {
      
     return meuObj.modelos['Usuarios'].findOne({
        attributes: ['id', 'nome', 'jid', 'uuid', 'senha', 'estatos', 'funcao_id'], 
        where: {
          jid: meuObj.jid
        }, 
        include: [{
          model: meuObj.modelos['Funcoes'],
          as: 'Funcoes',
          attributes: ['id', 'nome']
        }]
      })
      .then(function (conta) {
        
        if (conta == null) {
          deliberar(contexto.erro(400, "Dados informados não correspondem."));
        } else {
          var seSenhaConfere = meuObj.senha ? conta.verificarSenha(meuObj.senha) : false;
          
          if (seSenhaConfere) {

            var usuario = { 
              'id': conta.id
            , 'jid': conta.jid
            , 'nome': conta.nome
            , 'estatos': conta.estatos
            , 'funcao_id': conta.funcao_id
            };
            
            meuObj.token = jwt.sign(usuario, meuObj.superSegredo, { expiresIn: (14*60*60*1000) });

            var instancia = _.assignIn({ }, usuario);

            if (requisicao.session) {
              requisicao.session.token = meuObj.token;
            } 
            
            contexto.instancia = instancia;
              
            var funcao = conta.Funcoes || null;

            var ficha = meuObj.fichario.adicUsuario(_.assignIn({ 
              'token': meuObj.token
            , 'uuid': conta.uuid
            , 'funcao': funcao ? funcao.get('nome') : null
            , 'estatos': _.parseInt(conta.estatos, [radix=16]) 
            }, instancia));

            return meuObj.modelos['Escopos'].findAll({
              attributes: ['id', 'nome', 'bandeira'], 
              where: {
               funcao_id: funcao ? funcao.get('id') : -1
              }
            })
            .then(function (escopos) {
              if (escopos != null) {
               
                _(escopos).forEach(function(escopo) {
              
                  meuObj.fichario.adicEscopo(meuObj.token, {
                    'id': escopo.get('id')
                  , 'nome': _.toLower(escopo.get('nome'))
                  , 'bandeira': _.parseInt(escopo.get('bandeira'), [radix=16])
                  });

                }); 
              }
              cd(true);
              deliberar(contexto.continuar);
            });
           
          } else {
            deliberar(contexto.erro(400, "Senha de acesso informada não corresponde."));
          }
        }
      });

    } else {
      deliberar(contexto.erro(400, "Dados de acesso informados não são válidos."));
    }

    deliberar(contexto.continuar);
  });
};

jsonWebToken.prototype.autorizar = function(requisicao, resposta, contexto, cd) {
  var meuObj = this;

  return new Promessa(function(deliberar, recusar) {

    meuObj.encontrarUmToken(requisicao);

    if (meuObj.token) {
      
      jwt.verify(meuObj.token, meuObj.superSegredo, function (erro, decodificado) {
        if (erro) {
          // erro.name: 'TokenExpiredError' ou outros
          // erro.message: Mensagem sobre o erro ocorrido.

          deliberar(contexto.erro(400, "Não foi possível verificar o seu token de acesso."));
        } else if (decodificado) {

          var instancia = { 
            'id': decodificado.id
          , 'jid': decodificado.jid
          , 'nome': decodificado.nome
          , 'estatos': decodificado.estatos
          , 'funcao_id': decodificado.funcao_id
          };

          contexto.instancia = instancia;

          return meuObj.modelos['Escopos'].findAll({
            attributes: ['id', 'nome', 'bandeira'], 
            where: {
              funcao_id: decodificado.funcao_id
            }
          })
          .then(function (escopos) {

            meuObj.fichario.limparEscopos(meuObj.token);

            if (escopos != null) {
              
              _(escopos).forEach(function(escopo) {

                meuObj.fichario.adicEscopo(meuObj.token, {
                  'id': escopo.get('id')
                , 'nome': _.toLower(escopo.get('nome'))
                , 'bandeira': _.parseInt(escopo.get('bandeira'), [radix=16])
                });
                
              }); 
            }
            cd(true);
            deliberar(contexto.continuar);
          });

        } else {

          deliberar(contexto.erro(400, "Não foi possível acessar os dados da sua conta com o token informado."));
        }
      });
    } else {
      deliberar(contexto.erro(400, "É necessário informar um token válido."));
    }
  });
};  

jsonWebToken.prototype.sair = function(requisicao, resposta, contexto, cd) {
 
  var meuObj = this;

  return new Promessa(function(deliberar, recusar) {
    
    meuObj.encontrarUmToken(requisicao);

    if (requisicao && requisicao.session) {
      requisicao.session.destroy(function(erro){ });
    } 

    meuObj.fichario.removerFicha(meuObj.token);
          
    cd(true);

    contexto.instancia = { };

    deliberar(contexto.continuar);
  });
};  

module.exports = jsonWebToken;