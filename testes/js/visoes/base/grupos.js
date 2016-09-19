
define([
  'gdv'
, 'visoes/grupos/grupo01'
, 'visoes/grupos/grupo02'
], function(
  GDV
, VisaoDoGrupoUm
, VisaoDoGrupoDois
) {
  'use strict';

  var VisaoDosGrupos = Backbone.View.extend({

    el: "div#painel > div#conteudo", 

    visaoDoGrupoUm: null,
    visaoDoGrupoDois: null,

    initialize: function () {
      this.render();
    },

    render: function() {
      this.visaoDoGrupoUm = GDV.reusarVisao("VisaoDoGrupoUm", function() {
        return new VisaoDoGrupoUm();
      });

      this.visaoDoGrupoDois = GDV.reusarVisao("VisaoDoGrupoDois", function() {
        return new VisaoDoGrupoDois();
      });
    },

    esconderTodosOsConteudosDosGrupos: function() {
      this.$el.find('div.grupos-painel div.conteudo-grupos').hide(); 
    },

    mostrarConteudoDeUmGrupo: function(item) {
      this.$el.find(item).show();
    }

  });

  return VisaoDosGrupos;
});