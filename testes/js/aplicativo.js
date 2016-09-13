
define([ 
  "backbone"
, "modelos/sessao/sessao"
], function(
  Backbone
, ModeloDeSessao
) {
  'use strict';
  
  var aplicativo = {
    
    sessao: new ModeloDeSessao({}),

    eventos: _.extend({}, Backbone.Events),

    modulos: {},

    rotas: {},

    modulo: function(nome) {
      if (this.modulos[nome]) {
        return this.modulos[nome];
      }
      return this.modulos[nome] = { };
    },

    adcRota: function(modulo, funcao) {
      this.rotas[modulo] = funcao; 
    },

    buscarRota: function(modulo, id) {
      if (this.rotas[modulo]) {
        this.rotas[modulo](id);
      }
    },

  };

  return aplicativo;
});