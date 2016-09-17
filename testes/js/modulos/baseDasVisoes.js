
define([
  "aplicativo"
], function (
  aplicativo
) {
  'use strict';

  var BaseDasVisoes = {
    
    nome: null,
    
    verificarEscopo: function(acao) {
      var escopos = aplicativo.escopos;

      return escopos.verificarEscopo(this.nome, acao);
    }
  };

  return BaseDasVisoes;
});