
define([
  'backbone' 
, 'text!modulos/usuario/templantes/leitura.html'
], function(
  Backbone
, Templante
) {
  'use strict';

  var VisaoDeLeitura = Backbone.View.extend({

    tagName: "div",

    templante: _.template(Templante),
    
    model: null, 

    attributes: {
      
    },
    
    initialize: function() {
      this.render();
    },

    render: function() {
      console.log(this.nome);
      this.$el.html(this.templante(this.model.toJSON()));
      return this;
    },

    events: {
      
    },
    
    onClose: function() {
      
    }
  });

  VisaoDeLeitura = VisaoDeLeitura.extend({
    nome: 'OKay!!!'
  });

  return VisaoDeLeitura;
});