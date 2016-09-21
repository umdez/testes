define([
  'aplicativo'
, 'modulos'
, 'urls'
, 'handlebars'
, 'text!templantes/grupos/grupo02.html'
], function(
  aplic
, modulos
, URLs
, hbs
, Templante
) {
  'use strict';

  var Registrar = aplic.registrar.bind({ envolucro: 'visoes/grupos/grupo02' });

  var VisaoDoGrupoDois = Backbone.View.extend({

    el: "div#painel > div#conteudo > div.grupo-dois",

    templante: hbs.compile(Templante),

    initialize: function () {
      Registrar('BAIXO', 'Iniciando a visão.');

      this.render();
    },

    render: function() {
      this.$el.html(this.templante({
        'modulos': modulos.grupoDois
      }));
    },

    events: {
      
    }

  });

  return VisaoDoGrupoDois;
});