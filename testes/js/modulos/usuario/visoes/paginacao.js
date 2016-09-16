
define([
  'backbone'
, 'text!modulos/usuario/templantes/paginacao.html'
], function(
  Backbone
, Templante
) {
  'use strict';

  var VisaoDePaginacao = Backbone.View.extend({

    el: 'div#usuario-pesquisa.conteudo-painel',

    templante: _.template(Templante),
    
    attributes: {
      
    },
    
    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.templante());
    },

    events: {
      
    }
    
  });

  return VisaoDePaginacao;
});