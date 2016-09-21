/* Registrar mensagens do nosso sistema para depuração.
 */

define([ 
  "aplicativo"
, 'backbone'
], function(
  aplic
, Backbone
) {
  'use strict';

  var NIVEL = {
    'BAIXO': 1  // msgs simples
  , 'MEDIO': 2
  , 'ALTO': 3   // msgs criticas
  };

  var FILTRO = {
    'TODOS': NIVEL.ALTO + 1,    // filtra tudo.
    'BAIXOS': NIVEL.BAIXO + 1,  // filtra apenas as mensagens simples.
    'MEDIOS': NIVEL.MEDIO + 1,  // filtra apenas as mensagens simples e médias.
    'NENHUM': NIVEL.BAIXO,      // não filtra nenhuma mensagem.
  };

  var registrador = {
    filtrar: FILTRO.TODOS,

    registrar: function(envolucro, nivel, msg) {

      if (nivel >= this.filtrar) {
        if (nivel === NIVEL.ALTO) {
          console.log('[alto] ('+ envolucro +') '+ msg);
        } else if (nivel === NIVEL.MEDIO) {
          console.log('[medio] ('+ envolucro +') '+ msg);
        } else if (nivel === NIVEL.BAIXO) {
          console.log('[baixo] ('+ envolucro +') '+ msg);
        }
      } else {
        return;
      }
    },

    setarFiltro: function(nivel) {
      this.filtrar = FILTRO[nivel];
    }
  };

  registrador.filtrar = FILTRO.NENHUM;

  var VisaoDeRegistro = Backbone.View.extend({
    
    initialize: function() {
      this.listenTo(aplic.evts, 'registrador:registrar', this.registrar);
    },

    registrar: function(envolucro, nivel, msg) {
      registrador.registrar(envolucro, NIVEL[nivel.toUpperCase()], msg);
    }
  });

  var visaoDeRegistro = new VisaoDeRegistro({});

  registrador.registrar('registrador', NIVEL.BAIXO, 'Iniciando o registrador.');

  return {
    
    'NENHUM': 'NENHUM',
    'MEDIOS': 'MEDIOS',   
    'BAIXOS':'BAIXOS',    
    'TODOS': 'TODOS',     

    filtrar: function(nivel) {
      registrador.setarFiltro(nivel);
    }
  };
});