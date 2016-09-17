
define([
  "aplicativo"
], function (
  aplicativo
) {
  'use strict';

  var BaseDasVisoes = {
    
    verificarEscopo: function(nome, acao) {
      var escopos = aplicativo.escopos;

      return escopos.verificarEscopo(nome, acao);
    }
  };

  return BaseDasVisoes;
});