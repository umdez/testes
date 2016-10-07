/* Agrupa todas as URLs dos grupos */

define([ 
  './configuracao'
], function(
  configuracao
) {
  'use strict';

  var urls = {
    '#GrupoZero': function() {
      return "GrupoZero";
    },
    '#GrupoUm': function() {
      return "GrupoUm";
    },
    '#GrupoDois': function() {
      return "GrupoDois";
    }
  };
 
  console.log('(urls/grupos) URLs dos grupos foram carregadas.');

  return urls;
});