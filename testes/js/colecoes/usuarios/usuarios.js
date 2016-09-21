
define([
  "backbone"
, "urls"
, "modelos/usuario/usuario"
], function(
  Backbone
, gerarUrl
, ModeloDeUsuario
) {
  'use strict';

  var ColecaoDeUsuarios = Backbone.Collection.extend({

    model: ModeloDeUsuario,
    
    url: function() {
      return gerarUrl('Usuarios');
    }

  });

  return ColecaoDeUsuarios;
});