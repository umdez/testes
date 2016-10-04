/* Agrupa todas as URLs das contas */

define([ 
  './configuracao'
], function(
  configuracao
) {
  'use strict';

  var urls = {
    'Contas': function() {
      return configuracao.base +"/Contas";
    },
    'Conta': function(idDaConta) {
      return configuracao.base +"/Contas/"+ idDaConta;
    }
  };
 
  console.log('(urls/contas) URLs das contas foram carregadas.');

  return urls;
});