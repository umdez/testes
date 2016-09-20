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
    'NENHUM': NIVEL.ALTO + 1,
    'ALTOS':  NIVEL.ALTO,      // apenas mensagens criticas
    'TODOS':  NIVEL.BAIXO,     // registrar tudo.
  };

  var registrador = {
    mostrar: FILTRO.TODOS,

    registrar: function(envolucro, nivel, msg) {

      if (nivel >= this.mostrar) {
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

    setarNivelDeFiltragem: function(nivel) {
      this.mostrar = FILTRO[nivel];
    }
  };

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
      registrador.setarNivelDeFiltragem(nivel);
    }
  };
});