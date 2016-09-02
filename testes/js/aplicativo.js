
define([ 
  "backbone"
, "modelos/sessao/sessao"
], function(
  Backbone
, ModeloDeSessao
) {
  'use strict';
  
  var aplicativo = {};

  aplicativo.sessao = new ModeloDeSessao({});

  aplicativo.eventos = _.extend({}, Backbone.Events);

  return aplicativo;
});