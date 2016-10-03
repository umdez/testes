/* Contêm métodos utilizados por várias visões dos vários módulos. */

define([
  "aplicativo"
, "utilitarios/gdv"
], function (
  aplicativo
, GDV
) {
  'use strict';

  var BaseDasVisoes = {

    verificarEscopo: function(nome, acao) {
      var escopos = aplicativo.escopos;

      return escopos.verificarEscopo(nome, acao);
    },

    executarAcoes: function(acoes, cd) {
      _(acoes).reduceRight(_.wrap, cd)();
    }
  };

  var Uniao = {};
  _.extend(Uniao, GDV);
  _.extend(Uniao, BaseDasVisoes);
  return Uniao;
});