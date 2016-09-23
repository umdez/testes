
define([ 
  "backbone"
, 'bootstrap'
, "escopos"
, "urls"
, "modelos/sessao/sessao"
], function(
  Backbone
, BootStrap
, Escopos
, gerarUrl
, ModeloDeSessao
) {
  'use strict';
  
  console.log('(aplicativo) Iniciando o aplicativo.');

  var aplicativo = {
    
    sessao: new ModeloDeSessao({}),

    depuracao: 'BAIXO',

    // eventos globais
    evts: _.extend({}, Backbone.Events),

    modulos: {},

    rotas: {},

    escopos: null, 

    navegar: function(tipo, id) {
      var url = null;
      
      if (typeof id !== 'undefined') {
        url = gerarUrl(tipo, id);
      } else {
        url = gerarUrl(tipo);
      }
      this.roteador.navigate(url, true);
    }, 

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

    registrar: function(nivel, msg) {
      aplicativo.evts.trigger('registrador:registrar', this.envolucro, nivel, msg);
    }

  };

  aplicativo.escopos = new Escopos(aplicativo);

  return aplicativo;
});