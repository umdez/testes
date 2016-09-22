
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

  var ColecaoDeFuncoes = Backbone.Collection.extend({

    model: ModeloDeFuncao,
    
    url: function() {
      return gerarUrl('Funcoes');
    }

  });

  return ColecaoDeFuncoes;
});