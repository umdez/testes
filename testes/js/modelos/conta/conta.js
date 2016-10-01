define([
  "backbone"
, "urls"
, "modelos/funcao/funcao"
], function(
  Backbone
, gerarUrl
, ModeloDeFuncao
) {
  'use strict';

  var ModeloDeConta = Backbone.RelationalModel.extend({
    
    url: function() {
      return gerarUrl('Contas');
    },

    initialize: function(){
      
    },

    defaults: {
      'id': null
    , 'nome': ''
    , 'estatos': ''
    , 'jid': ''
    , 'funcao_id': null
    },

    relations: [{
      type: Backbone.HasOne,
      key: 'Funcoes',
      relatedModel: ModeloDeFuncao,
      reverseRelation: {
        key: 'Conta',
        type: Backbone.HasOne,
        includeInJSON: true
      }
    }]
  });

  return ModeloDeConta;
});