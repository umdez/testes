/* Trabalhar com um conjunto de grupos. 
 */

define([
  'aplicativo'
, 'gdv'
, 'visoes/grupos/grupo01'
, 'visoes/grupos/grupo02'
], function(
  aplic
, GDV
, VisaoDoGrupoUm
, VisaoDoGrupoDois
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'visoes/base/grupos' });

  var VisaoDosGrupos = Backbone.View.extend({

    el: "div#painel > div#conteudo", 

    visaoDoGrupoUm: null,
    visaoDoGrupoDois: null,

    initialize: function () {
      _.bindAll(this,
        'esconderTodosOsConteudosDosGrupos',
        'mostrarConteudoDeUmGrupo'
      );

      Registrar('BAIXO', 'Iniciando a visão.');
      
      this.listenTo(aplic.evts, 'grupos-conteudos:esconder', this.esconderTodosOsConteudosDosGrupos);
      this.listenTo(aplic.evts, 'grupos-conteudo:mostrar', this.mostrarConteudoDeUmGrupo);

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