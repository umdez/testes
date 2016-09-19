define([
  'modulos'
, 'urls'
, 'handlebars'
, 'text!templantes/grupos/grupo02.html'
], function(
  modulos
, URLs
, hbs
, Templante
) {
  'use strict';

  var VisaoDoGrupoDois = Backbone.View.extend({

    el: "div#painel > div#conteudo > div.grupo-dois",

    templante: hbs.compile(Templante),

    initialize: function () {
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