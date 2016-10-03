/* Contêm métodos utilizados por vários controladores de vários módulos. */

define([
  "aplicativo"
, "utilitarios/gdv"
], function (
  aplic
, GDV
) {
  'use strict';

  var BaseDosControladores = {

    verificarPermissao: function(acao, cd) {
      var escopos = aplic.escopos;

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
    },

    rotasDoControlador: function() {
      return {
        adcAnterior: function(rota, cd){
           aplic.adcRotaAnterior(rota, cd);
        },
        adcPosterior: function(rota, cd) {
           aplic.adcRotaPosterior(rota, cd);
        }, 
        adcRota: function(rota, nome, cd) {
          aplic.adcRota(rota, nome, cd);
        }
      }
    }

  };
 
  var Uniao = {};
  _.extend(Uniao, GDV);
  _.extend(Uniao, BaseDosControladores);

  return Uniao;
});