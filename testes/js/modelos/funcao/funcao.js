
define([
  "backbone"
, "urls"
], function(
  Backbone
, URLs
) {
  'use strict';

  var ModeloDeFuncao = Backbone.Model.extend({

    url: function() {
      return URLs.gerarUrl('Funcao', this.id);
    },
    
    idAttribute: 'id',

    initialize: function(){
      
    },

    defaults: {
      'id': 0
    , 'nome': ''
    }

  });
  
  return ModeloDeFuncao;
});