var Base = require('../base');
var utilitario = require('util');

var Usuarios = function(argumentos) {
  Usuarios.super_.call(this, argumentos);

  this.limiteDeListagens = this.criarUmLimite({ 
    nome: 'limiteDeListagens', intervalo: 60*60*1000, max: 150
  , mensagem: 'Muitas tentativas de listagens aos usuários. Por favor, tente novamente mais tarde.'
  });

  this.iniciar();
};

utilitario.inherits(Usuarios, Base);


Usuarios.prototype.iniciar = function() {
  
  var fonte = this.fonte || null;

  if (fonte === null) return;

  var meuObj = this;

  fonte.listar.iniciar.antesQue(function(requisicao, resposta, contexto) {
    return meuObj.limiteDeListagens.afunilarServico(requisicao, resposta, contexto);
  });
  
  //fonte.listar.iniciar.antesQue(function(requisicao, resposta, contexto) {
  //  return meuObj.jwt.autorizar(requisicao, resposta, contexto, function(seAutorizado) { 
  //    if (seAutorizado) { };
  //  });
  //});

  //fonte.listar.iniciar.antesQue(function(requisicao, resposta, contexto) {
  //  return meuObj.verificarPermissao(requisicao, contexto, function(sePermitido) {
  //    if (sePermitido) { };
  //  }); 
  //});

  fonte.listar.iniciar(function(requisicao, resposta, contexto) {
    return contexto.continuar;
  });
  
};

module.exports = Usuarios;