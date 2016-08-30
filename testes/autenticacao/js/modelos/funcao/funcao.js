
define([
  "backbone"
], function(
  Backbone
) {
  'use strict';

  var ModeloDeFuncao = Backbone.Model.extend({

    urlRoot: '/Funcoes',
    
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