
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

  var ModeloDeUsuario = Backbone.Model.extend({

    url: function() {
      return gerarUrl('Usuario', this.id);
    },
    
    idAttribute: 'id',

    initialize: function(){
      this.funcao = new ModeloDeFuncao({});
      this.endereco = new ModeloDeEndereco({});
      //this.escopos = new ColecaoDeEscopos.Colecao({});
    },

    defaults: {
      'id': null
    , 'nome': null
    , 'sobrenome': null
    , 'jid': null
    , 'uuid': null
    , 'estatos': null
    , 'funcao_id': null
    }

  });
  
  return ModeloDeUsuario;
});