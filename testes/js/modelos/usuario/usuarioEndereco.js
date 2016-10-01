
define([
  "backbone"
, "urls"
], function(
  Backbone
, gerarUrl
) {
  'use strict';

  var ModeloDeEndereco = Backbone.RelationalModel.extend({

    url: function() {
      return gerarUrl('UsuarioEndereco', this.idEndereco);
    },
    
    idAttribute: 'id',

    initialize: function(propriedades) {
      this.idEndereco = propriedades.idEndereco;
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