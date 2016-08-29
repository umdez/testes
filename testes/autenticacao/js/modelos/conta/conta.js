
define([
  "aplicativo"
, "backbone"
], function(
  aplicativo
, Backbone
) {
  'use strict';

  var ModeloDeConta = Backbone.Model.extend({

    urlRoot: '/contas',
    
    idAttribute: 'id',

    initialize: function(){
      
    },

    defaults: {
      'id': 0,
      'nome': '',
      'estatos': '',
      'jid': ''
    }

  });
  
  return ModeloDeConta;
});