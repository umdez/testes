
define([
  "backbone"
, "urls"
], function(
  Backbone
, gerarUrl
) {
  'use strict';

  var ModeloDeEndereco = Backbone.Model.extend({

    url: function() {
      return gerarUrl('UsuarioEndereco', null, this.id);
    },
    
    idAttribute: 'id',

    initialize: function(){
      
    },

    defaults: {
      'id': null
    , 'logradouro': null
    , 'complemento': null
    , 'bairro': null
    , 'numero': null
    , 'cidade': null
    }

  });
  
  return ModeloDeEndereco;
});