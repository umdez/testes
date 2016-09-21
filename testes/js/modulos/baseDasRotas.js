
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
    },

    verificarUmaPermissaoDeAcesso: function (acao, cd, msg) {
      this.verificarPermissao(acao, function(sePermitido) {
        if (sePermitido) {
          if ('prosseguir' in cd) cd.prosseguir();
        } else {
          if ('proibir' in cd) cd.proibir(msg);
        }
      });
    }
  };
 
  var Uniao = {};
  _.extend(Uniao, GDV);
  _.extend(Uniao, BaseDasRotas);

  return Uniao;
});