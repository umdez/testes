var Base = require('../base');
var utilitario = require('util');

var Funcoes = function(argumentos) {
  Funcoes.super_.call(this, argumentos);

  this.limiteDeLeituras = this.criarUmLimite({ 
    nome: 'limiteDeRequisicoes', intervalo: 60*60*1000, max: 150 
  , mensagem: 'Muitas tentativas de leituras as funcoes. Por favor, tente novamente mais tarde.'
  });

  this.iniciar();
};

utilitario.inherits(Funcoes, Base);

Funcoes.prototype.iniciar = function() {
  
  var fonte = this.fonte || null;

  if (fonte === null) return;

  var meuObj = this;

  fonte.ler.iniciar.antesQue(function(requisicao, resposta, contexto) {
    return meuObj.limiteDeLeituras.afunilarServico(requisicao, resposta, contexto);
  });
  
  //fonte.ler.iniciar.antesQue(function(requisicao, resposta, contexto) {
  //  return meuObj.jwt.autorizar(requisicao, resposta, contexto, function(seAutorizado) { 
  //    if (seAutorizado) { };
  //  });
  //});

  //fonte.ler.iniciar.antesQue(function(requisicao, resposta, contexto) {
  //  return meuObj.verificarPermissao(requisicao, contexto, function(sePermitido) {
  //    if (sePermitido) { };
  //  }); 
  //});

  fonte.ler.iniciar(function(requisicao, resposta, contexto) {
    return contexto.continuar;
  });
  
};

module.exports = Funcoes;