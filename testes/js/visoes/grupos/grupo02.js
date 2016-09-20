define([
  'modulos'
, 'urls'
, 'registrador'
, 'handlebars'
, 'text!templantes/grupos/grupo02.html'
], function(
  modulos
, URLs
, Regis
, hbs
, Templante
) {
  'use strict';

  var Registro = Regis.reg.bind({ envolucro: 'grupo02' });

  var VisaoDoGrupoDois = Backbone.View.extend({

    el: "div#painel > div#conteudo > div.grupo-dois",

    templante: hbs.compile(Templante),

    initialize: function () {
      Registro(Regis.BAIXO, 'Iniciando a visão.');

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