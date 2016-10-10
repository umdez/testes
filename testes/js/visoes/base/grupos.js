/* Trabalhar com um conjunto de grupos. 
 */

define([
  'aplicativo'
, "i18n/indice"
, 'utilitarios/gdv'
, 'visoes/grupos/painel/grupo00'
, 'visoes/grupos/painel/grupo01'
, 'visoes/grupos/painel/grupo02'
], function(
  aplic
, Lingua
, GDV
, VisaoDoGrupoZero
, VisaoDoGrupoUm
, VisaoDoGrupoDois
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'visoes/base/grupos' });

  var VisaoDosGrupos = Backbone.View.extend({

    el: "div#painel > div#conteudo", 

    visaoDoGrupoZero: null,
    visaoDoGrupoUm: null,
    visaoDoGrupoDois: null,

    initialize: function () {
      _.bindAll(this,
        'esconderTodosOsConteudosDosGrupos',
        'mostrarConteudoDeUmGrupo'
      );
      
      Registrar('BAIXO', Lingua.gerar('BASE.INFO.INICIANDO_VISAO', {'nome': 'grupos'}));
      
      this.listenTo(aplic.evts, 'grupos-conteudos:esconder', this.esconderTodosOsConteudosDosGrupos);
      this.listenTo(aplic.evts, 'grupos-conteudo:mostrar', this.mostrarConteudoDeUmGrupo);

      this.render();
    },

    render: function() {

      this.visaoDoGrupoZero = GDV.reusarVisao("Grupos", "VisaoDoGrupoZero", function() {
        return new VisaoDoGrupoZero();
      });

      this.visaoDoGrupoUm = GDV.reusarVisao("Grupos", "VisaoDoGrupoUm", function() {
        return new VisaoDoGrupoUm();
      });

      this.visaoDoGrupoDois = GDV.reusarVisao("Grupos", "VisaoDoGrupoDois", function() {
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