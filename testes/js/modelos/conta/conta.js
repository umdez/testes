
define([
  "backbone"
, "modelos/funcao/funcao"
, "colecoes/escopos/escopos"
], function(
  Backbone
, ModeloDeFuncao
) {
  'use strict';

  var ModeloDeConta = Backbone.Model.extend({

    urlRoot: '/Contas',
    
    idAttribute: 'id',

    initialize: function(){
      this.funcao = new ModeloDeFuncao({});
    },

    defaults: {
      'id': null
    , 'nome': ''
    , 'estatos': ''
    , 'jid': ''
    , 'funcao_id': null
    }

  });
  
  return ModeloDeConta;
});