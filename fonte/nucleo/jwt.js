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
  // Inicialmente procuramos pelo token numa sessão segura se caso não
  // encontrado, procuramos no body e também depois no cabeçalho.
  if (requisicao.session && requisicao.session.token) {
    this.token = requisicao.session.token; 
  } else if (requisicao.body && requisicao.body.token) {
    this.token = requisicao.body.token;
  } else if (requisicao.headers['x-acesso-token']) {
    this.token = requisicao.headers['x-acesso-token'];
  }
  return this.token;
};

jsonWebToken.prototype.encontrarUmJid = function(requisicao) {
  if (requisicao.body && requisicao.body.jid) {
    this.jid = requisicao.body.jid; 
  } else if (requisicao.params && requisicao.params.jid) {
    this.jid = requisicao.params.jid;
  } else if (requisicao.headers['x-autenticacao-jid']) {
    this.jid = requisicao.headers['x-autenticacao-jid'];
  }
  return this.jid;
};

jsonWebToken.prototype.encontrarUmaSenha = function(requisicao) {
  if (requisicao.body && requisicao.body.senha) {
    this.senha = requisicao.body.senha;
  } else if (requisicao.params && requisicao.params.senha) {
    this.senha = requisicao.params.senha;
  } else if (requisicao.headers['x-autenticacao-senha']) {
    this.senha = requisicao.headers['x-autenticacao-senha'];
  }
  return this.senha;
};

jsonWebToken.prototype.autenticar = function(requisicao, resposta, contexto, cd) {
  var meuObj = this;
  this.encontrarUmJid(requisicao);
  this.encontrarUmaSenha(requisicao);
 
  return new Promessa(function(deliberar, recusar) {

    if (meuObj.jid && meuObj.senha) {
      
     return meuObj.modelos['Usuarios'].findOne({
        attributes: ['id', 'nome', 'jid', 'uuid', 'senha', 'estatos'], 
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
          deliberar(contexto.erro(403, "Dados de acesso informados estão incorretos."));
        } else {
          var seSenhaConfere = meuObj.senha ? conta.verificarSenha(meuObj.senha) : false;
          if (seSenhaConfere) {
            
            var usuario = { 
              'id': conta.id
            , 'jid': conta.jid
            };
            
            meuObj.token = jwt.sign(usuario, meuObj.superSegredo, { expiresIn: (14*60*60*1000) });

            var instancia = _.assignIn({
              'nome': conta.nome
            , 'estatos': _.parseInt(conta.estatos, [radix=16])  
            }, usuario);

            if (requisicao.session) {
              requisicao.session.token = meuObj.token;
            } else {
              instancia.token = meuObj.token; 
            }
            contexto.instancia = instancia;
              
            var funcao = conta.Funcoes || null;

            var ficha = meuObj.fichario.adicUsuario(_.assignIn({ 
              'token': meuObj.token
            , 'uuid': conta.uuid
            , 'funcao': funcao ? funcao.get('nome') : null
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
              
                  ficha.adicEscopo({
                    'id': escopo.get('id')
                  , 'nome': _.toUpper(escopo.get('nome'))
                  , 'bandeira': _.parseInt(escopo.get('bandeira'), [radix=16])
                  });
                  
                }); 
              }
              cd(true);
              deliberar(contexto.continuar);
            });
           
          } else {
            deliberar(contexto.erro(403, "Dados de acesso informados estão incorretos."));
          }
        }
      });

    } else {
      deliberar(contexto.erro(403, "Dados de acesso informados estão incorretos."));
    }

    deliberar(contexto.continuar);
  });
};

jsonWebToken.prototype.autorizar = function(requisicao, resposta, contexto, cd) {
  var meuObj = this;
  this.encontrarUmToken(requisicao);

  return new Promessa(function(deliberar, recusar) {

    if (meuObj.token) {
      
      jwt.verify(meuObj.token, meuObj.superSegredo, function (erro, decodificado) {
        if (erro) {
          // erro.name: 'TokenExpiredError' ou outros
          // erro.message: Mensagem sobre o erro ocorrido.
          
          if (requisicao.session) requisicao.session.regenerate(function(erro) {});

          deliberar(contexto.erro(403, "Dados de acesso informados estão incorretos."));
        } else if (decodificado) {
          var instancia = { 
            'id': decodificado.id
          , 'jid': decodificado.jid
          };

          cd(true);

          contexto.instancia = instancia;
          deliberar(contexto.continuar);
        } else {
          
          if (requisicao.session) requisicao.session.regenerate(function(erro) {});

          deliberar(contexto.erro(403, "Dados de acesso informados estão incorretos."));
        }
      });
    } else {
      deliberar(contexto.erro(403, "Dados de acesso informados estão incorretos."));
    }
  });
};  

jsonWebToken.prototype.sair = function(requisicao, resposta, contexto, cd) {
  
  return new Promessa(function(deliberar, recusar) {
   
    if (requisicao.session) requisicao.session.destroy(function(erro) { });  

    var instancia = { };
          
    cd(true);

    contexto.instancia = instancia;

    deliberar(contexto.continuar);
  });
};  

module.exports = jsonWebToken;