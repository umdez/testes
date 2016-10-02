/* Agrupa todas as URLs das funcoes */

define([ 
  'urls/configuracao'
], function(
  configuracao
) {
  'use strict';

  var base = "/restificando";

  var urls = {
    'Funcoes': function() {
      return configuracao.base +"/Funcoes";
    },
    'Funcao': function(id) {
      return configuracao.base +"/Funcoes/"+ id;
    }
  };
 
  console.log('(urls/funcoes) URLs das funções foram carregadas.');

  return urls;
});