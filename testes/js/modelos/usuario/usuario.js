
define([
  "backbone"
, "urls"
, "modelos/funcao/funcao"
, "modelos/usuario/usuarioEndereco"
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
        key: 'Usuarios',
        type: Backbone.HasMany,
        includeInJSON: true
      }
    },
    {
      type: Backbone.HasOne,
      key: 'UsuarioEndereco',
      relatedModel: ModeloDeEndereco,
      reverseRelation: {
        key: 'Usuarios',
        type: Backbone.HasOne,
        includeInJSON: true
      }
    }]

  });
  
  return ModeloDeUsuario;
});