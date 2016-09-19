define([
  'modulos'
, 'urls'
, 'handlebars'
, 'text!templantes/grupos/grupo01.html'
], function(
  modulos
, URLs
, hbs
, Templante
) {
  'use strict';

  var VisaoDoGrupoUm = Backbone.View.extend({

    el: "div#painel > div#conteudo > div.grupo-um",

    templante: hbs.compile(Templante),

    initialize: function () {
      this.render();
    },

    render: function() {
      this.$el.html(this.templante({
        'modulos': modulos.grupoUm
      }));
    },

    events: {
      
    }

  });

  return VisaoDoGrupoUm;
});