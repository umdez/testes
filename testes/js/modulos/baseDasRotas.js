
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
    
    verificarEscopo: function(acao) {
      var escopos = aplicativo.escopos;

      return escopos.verificarEscopo(this.nome, acao);
    },

    selecionarUmItem: function(item) {
      $('ul.menu-painel-topo li').removeClass('active');
      $(item).addClass('active');
    }
  };
 
  var Uniao = {};
  _.extend(Uniao, GDV);
  _.extend(Uniao, BaseDasRotas);

  return Uniao;
});