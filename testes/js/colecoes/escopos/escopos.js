define([
  "backbone"
, "urls"
, "modelos/escopo/escopo"
], function(
  Backbone
, gerarUrl
, ModeloDeEscopo
) {
  'use strict';
 
  var ColecaoDeEscopos = Backbone.Collection.extend({

    model: ModeloDeEscopo,
    
    url: function() {
      return gerarUrl('Escopos', this.idDaFuncao);
    },

    initialize: function(modelos, propriedades) {
      this.idDaFuncao = propriedades.idDaFuncao;
    }

  });

  return ColecaoDeEscopos;
});