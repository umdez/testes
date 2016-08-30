
define([
  "backbone"
, "modelos/funcao/funcao"
, "colecoes/escopos/escopos"
], function(
  Backbone
, ModeloDeFuncao
, ColecaoDeEscopos
) {
  'use strict';

  var ModeloDeConta = Backbone.Model.extend({

    urlRoot: '/Contas',
    
    idAttribute: 'id',

    initialize: function(){
      this.funcao = new ModeloDeFuncao({});
      this.escopos = new ColecaoDeEscopos({});
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