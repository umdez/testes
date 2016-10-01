
define([ 
  "backbone"
, 'bootstrap'
, "escopos"
, "urls"
, "relational"
, "modelos/sessao/sessao"
], function(
  Backbone
, BootStrap
, Escopos
, gerarUrl
, Relacional
, ModeloDeSessao
) {
  'use strict';
  
  console.log('(aplicativo) Iniciando o aplicativo.');

  var aplicativo = {
    
    sessao: new ModeloDeSessao({}),

    // eventos globais
    evts: _.extend({}, Backbone.Events),

    modulos: {},

    rotas: [],
    anteriores: {},
    posteriores: {},

    escopos: null, 

    navegar: function(tipo, id, seDisparar) {
      var url = null;
      
      if (typeof id != null) {
        url = gerarUrl(tipo, id);
      } else {
        url = gerarUrl(tipo);
      }
      this.roteador.navigate(url,  {'trigger': seDisparar});
    }, 

    roteador: null,

    modulo: function(nome) {
      if (this.modulos[nome]) {
        return this.modulos[nome];
      }
      return this.modulos[nome] = { };
    },
 
    adcRotaAnterior: function(rota, cd) {
      this.anteriores[rota] = cd;
    },

    adcRotaPosterior: function(rota, cd) {
      this.posteriores[rota] = cd;
    },

    adcRota: function(rota, nome, cd) {
      this.rotas.push({'rota': rota, 'nome': nome, 'cd': cd});
    },

    registrar: function(nivel, msg) {
      aplicativo.evts.trigger('registrador:registrar', this.envolucro, nivel, msg);
    }

  };

  aplicativo.escopos = new Escopos(aplicativo);

  return aplicativo;
});