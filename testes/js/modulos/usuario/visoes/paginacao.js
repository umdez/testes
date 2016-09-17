
define([
  'backbone'
, "modulos/baseDasVisoes"
, 'text!modulos/usuario/templantes/paginacao.html'
], function(
  Backbone
, Base
, Templante
) {
  'use strict';

  var VisaoDePaginacao = Backbone.View.extend({

    el: 'div#usuario-pesquisa.conteudo-painel',

    templante: _.template(Templante),
    
    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.templante());
    },

    events: {
      
    }
    
  });

  VisaoDePaginacao = VisaoDePaginacao.extend(Base);

  return VisaoDePaginacao;
});