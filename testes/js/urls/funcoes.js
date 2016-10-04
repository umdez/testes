/* Agrupa todas as URLs das funcoes */

define([ 
  './configuracao'
], function(
  configuracao
) {
  'use strict';

  var base = "/restificando";

  var urls = {
    'Funcoes': function() {
      return configuracao.base +"/Funcoes";
    },
    'Funcao': function(idDaFuncao) {
      return configuracao.base +"/Funcoes/"+ idDaFuncao;
    }
  };
 
  console.log('(urls/funcoes) URLs das funções foram carregadas.');

  return urls;
});