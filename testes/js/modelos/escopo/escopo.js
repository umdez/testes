define([
  "backbone"
, "urls/indice"
, "relational"
], function(
  Backbone
, gerarUrl
, Relacional
) {
  'use strict';

  var ModeloDeEscopo = Backbone.RelationalModel.extend({
    
    url: function() {
      return gerarUrl('Escopo', this.idDaFuncao, this.idDoEscopo);
    },
    
    initialize: function(propriedades){
      this.idDaFuncao = propriedades.idDaFuncao;
      this.idDoEscopo = propriedades.idDoEscopo;
    },

    idAttribute: 'id',

    defaults: {
      'id': null
    , 'nome': null
    , 'bandeira': null
    , 'funcao_id': null
    }
  });

  return ModeloDeEscopo;
});