
define([
  "backbone"
, "urls"
, "modelos/funcao/funcao"
], function(
  Backbone
, URLs
, ModeloDeFuncao
) {
  'use strict';

  var ModeloDeConta = Backbone.Model.extend({
 
    url: function() {
      return URLs.gerarUrl('Contas');
    },
    
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