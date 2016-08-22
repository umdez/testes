/*******************************************************************
 * Listificando é de (C) propriedade da Devowly Sistemas 2015-2016 *
 *                 https://github.com/devowly                      *
 *******************************************************************
 * 
 * $Id aplicativo.js, criado em 26/07/2016 às 17:26 por Leo Felippe $
 *
 * Versão atual 0.0.2-Beta
 */

define([ 
  'roteador' // Requisitamos o nosso roteador
], function(
  Roteador
) {
  'use strict';
  
  /* @Função inicializar(). Responsável por inicializar o nosso roteador.
   */
  var inicializar = function(){
    
    // Iniciamos o nosso roteador aqui.
    Roteador.inicializar();
  };

  return { 
    inicializar: inicializar
  };
});