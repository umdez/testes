
define([
  "backbone"
, "urls"
, "modelos/escopo/escopo"
], function(
  Backbone
, URLs
, ModeloDeEscopo
) {
  'use strict';

  var ColecaoDeEscopos = Backbone.Collection.extend({

    model: ModeloDeEscopo,
    
    url: function() {
      return URLs.gerarUrl('Escopos');
    }

  });

  return ColecaoDeEscopos;
});