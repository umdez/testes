/* Agrupa todas as URLs dos escopos */

define([ 
  'urls/configuracao'
], function(
  configuracao
) {
  'use strict';

  var urls = {
    'Escopos': function(idDafuncao) {
      return configuracao.base +"/funcoes/"+ idDafuncao +"/Escopos";
    },
    'Escopo': function(idDafuncao, id) {
      return configuracao.base +"/Funcoes/"+ idDafuncao +"/Escopos/"+ id;
    }
  };
 
  console.log('(urls/escopos) URLs dos escopos foram carregadas.');

  return urls;
});