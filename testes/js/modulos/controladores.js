/* Contêm métodos utilizados por vários controladores de vários módulos. */

define([
  "aplicativo"
, "gdv"
], function (
  aplicativo
, GDV
) {
  'use strict';

  var BaseDosControladores = {

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
          if ('impedir' in cd) cd.impedir(msg);
        }
      });
    }
  };
 
  var Uniao = {};
  _.extend(Uniao, GDV);
  _.extend(Uniao, BaseDosControladores);

  return Uniao;
});