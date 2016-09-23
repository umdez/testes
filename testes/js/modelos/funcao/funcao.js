
define([
  "backbone"
, "urls"
], function(
  Backbone
, gerarUrl
) {
  'use strict';

  var ModeloDeFuncao = Backbone.Model.extend({

    url: function() {
      return gerarUrl('Funcao', this.id);
    },
    
    idAttribute: 'id',

    initialize: function(){
      
    },

    defaults: {
      'id': null
    , 'nome': ''
    }

  });
  
  return ModeloDeFuncao;
});