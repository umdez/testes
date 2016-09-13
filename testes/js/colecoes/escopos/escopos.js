
define([
  "backbone"
, "urls"
, "modelos/escopo/escopo"
], function(
  Backbone
, Urls
, ModeloDeEscopo
) {
  'use strict';

  var ColecaoDeEscopos = Backbone.Collection.extend({

    model: ModeloDeEscopo,
    
    url: function() {
      return Urls.gerarUrl('Escopos');
    }

  });

  // NOTA: Adicionar paginação
  
  return {
    Colecao: ColecaoDeEscopos
  //, Paginacao: PaginacaoDeEscopos 
  }
});