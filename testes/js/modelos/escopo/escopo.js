
define([
  "backbone"
, "urls"
], function(
  Backbone
, URLs
) {
  'use strict';

  var ModeloDeEscopo = Backbone.Model.extend({
    
    url: function() {
      return URLs.gerarUrl('Escopo', this.funcao_id, this.id);
    },

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