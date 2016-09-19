
define([ 
  "backbone"
, "escopos"
, "modelos/sessao/sessao"
], function(
  Backbone
, Escopos
, ModeloDeSessao
) {
  'use strict';
  
  var aplicativo = {
    
    sessao: new ModeloDeSessao({}),

    eventos: _.extend({}, Backbone.Events),

    modulos: {},

    rotas: {},

    escopos: null, 

    roteador: null,

    modulo: function(nome) {
      if (this.modulos[nome]) {
        return this.modulos[nome];
      }
      return this.modulos[nome] = { };
    },

    adcRota: function(rota, funcao) {
      this.rotas[rota] = funcao; 
    },

    buscarRota: function(rota, id) {
      if (this.rotas[rota]) {
        this.rotas[rota](rota, id);
      }
    },

  };

  aplicativo.escopos = new Escopos(aplicativo.sessao);

  return aplicativo;
});