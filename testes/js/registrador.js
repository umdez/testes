/* Registrar mensagens do nosso sistema para depuração.
 */

define([ 
  
], function(
  
) {
  'use strict';

  var NIVEL = {
    'BAIXO': 1  // msgs simples
  , 'MEDIO': 2
  , 'ALTO': 3   // msgs criticas
  };

  var FILTRO = {
    'TODOS': NIVEL.ALTO + 1,  // filtra tudo.
    'MEDIOS':  NIVEL.MEDIO,   // apenas as mensagens criticas.
    'NENHUM':  NIVEL.BAIXO,   // registrar tudo.
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

  return {

    'BAIXO': NIVEL.BAIXO,
    'MEDIO': NIVEL.MEDIO,
    'ALTO':  NIVEL.ALTO,
  
    'NENHUM': 'NENHUM',
    'ALTOS': 'ALTOS',       
    'TODOS': 'TODOS',     

    reg: function(nivel, msg) {
      registrador.registrar(this.envolucro, nivel, msg);
    },

    nivel: function(nivel) {
      registrador.setarFiltro(nivel);
    }
  };
});