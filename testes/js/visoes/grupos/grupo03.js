define([
  'modulosConfig'
, 'urls'
, 'handlebars'
, 'text!templantes/grupos/grupo03.html'
], function(
  modulosConfig
, gerarUrl
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
        'modulos': modulosConfig.grupoTres
      }));
    },

    events: {
      
    }

  });

  return VisaoDoGrupoTres;
});