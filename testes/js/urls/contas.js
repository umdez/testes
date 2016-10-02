/* Agrupa todas as URLs das contas */

define([ 
  'urls/configuracao'
], function(
  configuracao
) {
  'use strict';

  var urls = {
    'Contas': function() {
      return configuracao.base +"/Contas";
    },
    'Conta': function(id) {
      return configuracao.base +"/Contas/"+ id;
    }
  };
 
  console.log('(urls/contas) URLs das contas foram carregadas.');

  return urls;
});