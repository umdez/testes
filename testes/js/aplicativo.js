
define([ 
  "backbone"
, 'bootstrap'
, "nucleo/escopos"
, "urls/indice"
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

    navegar: function(tipo, idNivelUm, idNivelDois, seDisparar) {
      var url = null;
      
      if ((typeof idNivelUm != null) && (typeof idNivelDois != null)) {
        url = gerarUrl(tipo, idNivelUm, idNivelDois);
      } else if (typeof idNivelUm != null) {
        url = gerarUrl(tipo, idNivelUm);
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
 
    adcRotas: function() {
      var meuObj = this;

      return {
        adcAnterior: function(rota, cd){
           meuObj.anteriores[rota] = cd;
        },
        adcPosterior: function(rota, cd) {
           meuObj.posteriores[rota] = cd;
        }, 
        adcRota: function(rota, nome, cd) {
          meuObj.rotas.push({'rota': rota, 'nome': nome, 'cd': cd});
        }
      };
    },

    registrar: function(nivel, msg) {
      aplicativo.evts.trigger('registrador:registrar', this.envolucro, nivel, msg);
    }

  };

  aplicativo.escopos = new Escopos(aplicativo);

  return aplicativo;
});