
define([
  "backbone"
, "urls"
, "modelos/usuario/usuario"
], function(
  Backbone
, Urls
, ModeloDeUsuario
) {
  'use strict';

  var ColecaoDeUsuarios = Backbone.Collection.extend({

    model: ModeloDeUsuario,
    
    url: function() {
      return Urls.gerarUrl('Usuarios');
    }

  });

  // NOTA: Adicionar paginação
  
  return {
    Colecao: ColecaoDeUsuarios
  //, Paginacao: PaginacaoDeUsuarios
  }
});