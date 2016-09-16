
define([
  'backbone' 
, 'underscore'
, 'text!modulos/usuario/templantes/cadastro.html'
], function(
  Backbone
, _
, Templante
) {
  'use strict';

  var VisaoDeCadastro = Backbone.View.extend({

    tagName: "div",

    templante: _.template(Templante),
    
    attributes: {
      
    },
    
    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.templante());
      return this;
    },

    events: {
      
    },

    onClose: function() {
      
    }
    
  });

  return VisaoDeCadastro;
});