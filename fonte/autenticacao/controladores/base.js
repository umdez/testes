var jwt = require('../../nucleo/jwt');
var Promessa = require('bluebird');
var _ = require('lodash');

var ESTATOS_BLOQUEADO = 0x00000001;
var ESTATOS_VERIFICADO = 0x00000002;  // verificado pelo email? 

var Controlador = function(argumentos) {
  this.inicializar(argumentos);
};

Controlador.prototype.inicializar = function(opcoes) {
  this.fonte = opcoes.fonte;
  this.modelo = this.fonte ? this.fonte.modelo : null;
  this.jwt = new jwt(opcoes);
  this.fichario = this.jwt.fichario;
  this.limitadorDeUso = require('limitador');
  this.limitar = [];
  this.token = null;
  this.jid = null;
  this.senha = null;
};

Controlador.prototype.criarUmLimite = function(opcoes) {
  this.limitar[opcoes.nome] = new this.limitadorDeUso(opcoes);
  this.limitar[opcoes.nome].dados = opcoes;
  this.limitar[opcoes.nome].afunilarServico = this.afunilarServico.bind({dados: this.limitar[opcoes.nome]});
  this.limitar[opcoes.nome].zerarUmLimite = this.zerarUmLimite.bind({dados: this.limitar[opcoes.nome]});
  return this.limitar[opcoes.nome];
};

Controlador.prototype.afunilarServico = function(requisicao, resposta, contexto) {
  return this.dados.Restificando(requisicao, resposta, contexto);
};

Controlador.prototype.zerarUmLimite = function(requisicao) {
  return this.dados.Restificando.reiniciarChave(requisicao.ip);
};

Controlador.prototype.verificarEstatos = function(requisicao, contexto, cd) {
  var meuObj = this;

  return new Promessa(function(deliberar, recusar) {
    var token = meuObj.jwt.encontrarUmToken(requisicao);
    var metodo = _.toUpper(requisicao.method);
    
    var seBloqueado = (meuObj.fichario.sePossuiEstatos(token, ESTATOS_BLOQUEADO) != 0);
    var seVerificado = (meuObj.fichario.sePossuiEstatos(token, ESTATOS_VERIFICADO) != 0);

    var acoes = {
        "POST": function() {
        
        if (seBloqueado) {
          deliberar(contexto.erro(403, "Voce não possui o estatos requerido."));
        } else if (seVerificado) {
          cd(true);
          deliberar(contexto.continuar);
        } else {
          cd(true);
          deliberar(contexto.continuar);
        }

      }
      , "UPDATE": function() {

        if (seBloqueado) {
          deliberar(contexto.erro(403, "Voce não possui o estatos requerido."));
        } else {
          cd(true);
          deliberar(contexto.continuar);
        }
      }
      , "PUT": function( ) {
        
        if (seBloqueado) {
          deliberar(contexto.erro(403, "Voce não possui o estatos requerido."));
        } else {
          cd(true);
          deliberar(contexto.continuar);
        }

      }, "DELETE": function() {
        cd(true);
        deliberar(contexto.continuar);
      }
    };

    if (acoes[metodo]) {
      return acoes[metodo]();
    } else {
      deliberar(contexto.continuar);
    }
  });
};

module.exports = Controlador;