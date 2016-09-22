
define([
  "backbone"
, "urls"
, "modelos/funcao/funcao"
, "colecoes/escopos/escopos"
], function(
  Backbone
, gerarUrl
, ModeloDeFuncao
, ColecaoDeEscopos
) {
  'use strict';

  var ModeloDeUsuario = Backbone.Model.extend({

    url: function() {
      return gerarUrl('Usuario', this.id);
    },
    
    idAttribute: 'id',

    initialize: function(){
      this.funcao = new ModeloDeFuncao({});
      //this.escopos = new ColecaoDeEscopos.Colecao({});
    },

    defaults: {
      'id': null
    , 'nome': null
    , 'jid': null
    , 'uuid': null
    , 'estatos': null
    , 'funcao_id': null
    }

  });
  
  return ModeloDeUsuario;
});