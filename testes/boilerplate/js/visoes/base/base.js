'use strict';

/* Suporte para visão base do sistema. */

define([
  'jquery'
, 'backbone' 
, 'underscore'
, 'text!/boilerplate/js/templantes/base/base.html'
], function(
  $ 
, Backbone
, _
, Templante
) {
  
  var Base = Backbone.View.extend({

    el: $('#conteudo-raiz'),

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
      
    },
    
    onClose: function() {
      
    }
    
  });

  return Base;
});