/* Agrupa todas as URLs dos exemplos */

define([ 
  './configuracao'
], function(
  configuracao
) {
  'use strict';

  var urls = {
    '#ExemploDeReuso': function() {
      return "ExemploDeReuso";
    }
  };
 
  console.log('(urls/usuarios) URLs dos exemplos foram carregadas.');

  return urls;
});