
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

  return ColecaoDeEscopos;
});