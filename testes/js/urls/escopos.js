/* Agrupa todas as URLs dos escopos */

define([ 
  './configuracao'
], function(
  configuracao
) {
  'use strict';

  var urls = {
    'Escopos': function(idDafuncao) {
      return configuracao.base +"/funcoes/"+ idDafuncao +"/Escopos";
    },
    'Escopo': function(idDafuncao, idDoEscopo) {
      return configuracao.base +"/Funcoes/"+ idDafuncao +"/Escopos/"+ idDoEscopo;
    }
  };
 
  console.log('(urls/escopos) URLs dos escopos foram carregadas.');

  return urls;
});