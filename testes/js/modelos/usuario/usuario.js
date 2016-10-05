
define([
  "backbone"
, "urls/indice"
, "modelos/funcao/funcao"
, "modelos/usuario/endereco"
, "colecoes/escopos/escopos"
], function(
  Backbone
, gerarUrl
, ModeloDeFuncao
, ModeloDeEndereco
, ColecaoDeEscopos
) { 
  'use strict';

  var ModeloDeUsuario = Backbone.RelationalModel.extend({

    url: function() {
      return gerarUrl('Usuario', this.id);
    },
    
    idAttribute: 'id',

    initialize: function(){
      
    },

    defaults: {
      'id': null
    , 'nome': null
    , 'sobrenome': null
    , 'jid': null
    , 'uuid': null
    , 'estatos': null
    , 'funcao_id': null
    },

    relations: [{
      type: Backbone.HasOne,
      key: 'Funcoes',
      relatedModel: ModeloDeFuncao,
      reverseRelation: {
        key: 'Encarregado',
        type: Backbone.HasMany,
        includeInJSON: true
      }
    },
    { 
      type: Backbone.HasOne,
      key: 'UsuarioEndereco',
      relatedModel: ModeloDeEndereco,
      reverseRelation: {
        key: 'Residente',
        type: Backbone.HasOne,
        includeInJSON: true
      }
    }]

  });
  
  return ModeloDeUsuario;
});