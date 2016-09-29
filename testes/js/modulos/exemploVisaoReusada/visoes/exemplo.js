
define([
  'aplicativo'
, 'backbone' 
, "modulos/visoes"
, 'handlebars'
, 'text!modulos/exemploVisaoReusada/templantes/exemplo.html' 
], function(
  aplic
, Backbone
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
      Registrar('BAIXO', 'A visão (VisaoDeExemploReusada) acaba de ser reusada.');
    }
    
  });

  return VisaoDeExemploReusada.extend(Base);
});