var Base = require('./base');
var utilitario = require('util');

var Autorizacao = function(argumentos) {
  Autorizacao.super_.call(this, argumentos);
   
  this.limiteDeRequisicoes = this.criarUmLimite({ 
    nome: 'limiteDeRequisicoes', intervalo: 60*60*1000, max: 150 
  , mensagem: 'Muitas tentativas de requisição para autorização. Por favor, tente novamente mais tarde.'
  });

  this.iniciar();
};

utilitario.inherits(Autorizacao, Base);

Autorizacao.prototype.iniciar = function() {
  var fonte = this.fonte || null;

  if (fonte === null) return;

  var meuObj = this;

  fonte.listar.iniciar.antesQue(function(requisicao, resposta, contexto) {
    return meuObj.limiteDeRequisicoes.afunilarServico(requisicao, resposta, contexto);
  });
  
  fonte.listar.iniciar.antesQue(function(requisicao, resposta, contexto) {
    return meuObj.jwt.autorizar(requisicao, resposta, contexto, function(seAutorizado) { 
      if (seAutorizado) {};
    });
  });

  fonte.listar.iniciar.antesQue(function(requisicao, resposta, contexto) {
    return meuObj.verificarEstatos(requisicao, contexto, function(seVerificado) {
      if (seVerificado) { }
    });
  });

  fonte.listar.iniciar(function(requisicao, resposta, contexto) {
    return contexto.continuar;
  });

  fonte.listar.trazer.antesQue(function(requisicao, resposta, contexto) {
    // NOTA: Iremos requisitar os nossos próprios dados, portanto, nós impedimos
    // a requisição pela database.
    return contexto.pular; 
  });

  fonte.listar.trazer(function(requisicao, resposta, contexto) {
    return contexto.pular;  // Impedimos a requisição dos dados
  });

};

module.exports = Autorizacao;