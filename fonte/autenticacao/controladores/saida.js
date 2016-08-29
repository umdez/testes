var Base = require('./base');
var utilitario = require('util');

var Saida = function(argumentos) {
  Saida.super_.call(this, argumentos);

  this.iniciar();
};

utilitario.inherits(Saida, Base);

Saida.prototype.iniciar = function() {
  var fonte = this.fonte || null;

  if (fonte === null) return;

  var meuObj = this;

  fonte.deletar.iniciar.antesQue(function(requisicao, resposta, contexto) {
    return meuObj.jwt.sair(requisicao, resposta, contexto, function(seSaiu) { 
      if (seSaiu) {};
    });
  });

  fonte.deletar.iniciar(function(requisicao, resposta, contexto) {
    return contexto.continuar;
  });

  fonte.deletar.trazer.antesQue(function(requisicao, resposta, contexto) {
    // NOTA: Não precisamos puxar os dados da database. Portanto, impedimos isso
    // de acontecer.
    return contexto.pular; 
  });

  fonte.deletar.trazer(function(requisicao, resposta, contexto) {
    return contexto.pular;  // Impedimos a requisição dos dados
  });

  fonte.deletar.escrever.antesQue(function(requisicao, resposta, contexto) {
    // NOTA: Precisamos apenas receber os dados e realizar a saida, portanto,
    // nós iremos impedir qualquer tentativa de remoção dos dados da database.
    return contexto.pular; 
  });

  fonte.deletar.escrever(function(requisicao, resposta, contexto) {
    return contexto.pular;  // Impedimos a remoção desta conta
  });

  fonte.deletar.enviar.antesQue(function(requisicao, resposta, contexto) {
    return contexto.continuar;
  });
};

module.exports = Saida;