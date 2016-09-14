
define([
  "backbone"
, "urls"
], function(
  Backbone
, Urls
) {
  'use strict';

  var ModeloDeFuncao = Backbone.Model.extend({

    url: function() {
      return Urls.gerarUrl('Funcao', this.id);
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