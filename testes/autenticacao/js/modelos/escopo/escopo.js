
define([
  "backbone"
], function(
  Backbone
) {
  'use strict';

  var ModeloDeEscopo = Backbone.Model.extend({

    urlRoot: '/Escopos',
    
    idAttribute: 'id',

    initialize: function(){
      
    },

    defaults: {
      'id': null
    , 'nome': ''
    , 'bandeira': null
    , 'funcao_id': null
    }

  });
  
  return ModeloDeEscopo;
});