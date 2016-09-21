
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

  var ModeloDeConta = Backbone.Model.extend({
 
    url: function() {
      return gerarUrl('Contas');
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