
define([
  'aplicativo'
, 'backbone' 
, 'i18n/indice'
, "modulos/visoes"
, 'handlebars'
, 'text!modulos/exemploVisaoReusada/templantes/exemplo.html' 
], function(
  aplic
, Backbone
, Lingua
, Base
, hbs
, TemplanteCadastro
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/exemploVisaoReusada/visoes/exemplo' });

  var VisaoDeExemploReusada = Backbone.View.extend({

    el: 'div.grupo-um div#visao-reusada-exemplo.conteudo-grupo-um',

    templante: hbs.compile(TemplanteCadastro), 
    
    initialize: function() {
      this.render();
    },

    render: function() { 
      this.$el.html(this.templante({}));
    },

    aoReusar: function() {
      Registrar('BAIXO', Lingua.gerar('VISAO.INFO.AO_REUSAR', { 'nome': 'VisaoDeExemploReusada' }));
    }
    
  });

  return VisaoDeExemploReusada.extend(Base);
});