
define([
  "backbone"
, "urls"
, "modelos/usuario/usuario"
], function(
  Backbone
, URLs
, ModeloDeUsuario
) {
  'use strict';

  var ColecaoDeUsuarios = Backbone.Collection.extend({

    model: ModeloDeUsuario,
    
    url: function() {
      return URLs.gerarUrl('Usuarios');
    }

  });

  return ColecaoDeUsuarios;
});