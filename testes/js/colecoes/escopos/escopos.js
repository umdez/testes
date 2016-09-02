
define([
  "backbone"
, "modelos/escopo/escopo"
], function(
  Backbone
, ModeloDeEscopo
) {
  'use strict';

  var ColecaoDeEscopos = Backbone.Collection.extend({

    model: ModeloDeEscopo,
    
    url: '/Escopos'

  });
  
  return ColecaoDeEscopos;

});