
define([
  "backbone"
, "urls"
, "modelos/funcao/funcao"
], function(
  Backbone
, Urls
, ModeloDeFuncao
) {
  'use strict';

  var ModeloDeConta = Backbone.Model.extend({
 
    url: function() {
      return Urls.gerarUrl('Contas');
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