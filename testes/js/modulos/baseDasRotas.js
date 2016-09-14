
define([
  "aplicativo"
], function (
  aplicativo
) {
  'use strict';

  var BaseDasRotas = {
    
    nome: null,

    iniciar: function() { },

    suporte: function(id) { },

    verificarPermissao: function(acao, cd) {
      var escopos = aplicativo.escopos;

      escopos.verificarPermissao(this.nome, acao, function(sePermitido) {
        cd(sePermitido);
      });
    },
    
    verificarEscopo: function(acao) {
      var escopos = aplicativo.escopos;

      return escopos.verificarEscopo(this.nome, acao);
    }
  };
 
  return BaseDasRotas;
});