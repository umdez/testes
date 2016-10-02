
define([
  "backbone"
, "urls/indice"
, "modelos/escopo/escopo"
, "colecoes/escopos/escopos"
], function(
  Backbone
, gerarUrl
, ModeloDeEscopo
, ColecaoDeEscopos
) {
  'use strict';

  var ModeloDeFuncao = Backbone.RelationalModel.extend({
    
    url: function() {
      return gerarUrl('Funcao', this.idDaFuncao);
    },
    
    initialize: function(propriedades){
      this.idDaFuncao = propriedades.idDaFuncao;
    },

    idAttribute: 'id',

    defaults: {
      'id': null
    , 'nome': null
    },

    relations: [{
      type: Backbone.HasMany,
      key: 'Escopos',
      relatedModel: ModeloDeEscopo,
      collectionType: ColecaoDeEscopos,
      reverseRelation: {
        key: 'Funcoes',
        type: Backbone.HasOne,
        includeInJSON: true
      }
    }]
  });

  return ModeloDeFuncao;
});