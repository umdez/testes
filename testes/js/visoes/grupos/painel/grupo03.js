define([
  'visoes/grupos/configuracao'
, 'handlebars'
, 'text!templantes/grupos/painel/grupo03.html'
], function(
  config
, hbs
, Templante
) {
  'use strict';

  var VisaoDoGrupoTres = Backbone.View.extend({

    el: "div#painel > div#conteudo > div.grupo-tres",

    templante: hbs.compile(Templante),

    initialize: function () {
      this.render();
    },

    render: function() {
      this.$el.html(this.templante({
        'modulos': config.painel.grupoTres
      }));
    },

    events: {
      
    }

  });

  return VisaoDoGrupoTres;
});