/* Contêm métodos utilizados por várias visões dos vários módulos. */

define([
  "aplicativo"
, "gdv"
], function (
  aplicativo
, GDV
) {
  'use strict';

  var BaseDasVisoes = {
    
    verificarEscopo: function(nome, acao) {
      var escopos = aplicativo.escopos;

      return escopos.verificarEscopo(nome, acao);
    }
  };

  var Uniao = {};
  _.extend(Uniao, GDV);
  _.extend(Uniao, BaseDasVisoes);
  return Uniao;
});