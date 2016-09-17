
define([
  "aplicativo"
, "gdv"
], function (
  aplicativo
, GDV
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
    }
  };
 
  var Uniao = {};
  _.extend(Uniao, GDV);
  _.extend(Uniao, BaseDasRotas);

  return Uniao;
});