/* Agrupa todas as URLs das rotas dos modelos e também do roteador.
 */

define([ 
  'aplicativo'
], function(
  aplic
) {
  'use strict';

  var URLs = {
    'Funcoes': function() {
      return "/Funcoes";
    },
    'Funcao': function(id) {
      return "/Funcoes/"+ id;
    },
    'Escopos': function() {
      return "/Escopos";
    },
    'Escopo': function(idDafuncao, id) {
      return "/Funcoes/"+ idDafuncao +"/Escopos/"+ id;
    },
    'Contas': function() {
      return "/Contas";
    },
    'Conta': function(id) {
      return "/Contas/"+ id;
    },
    'Usuarios': function() {
      return "/Usuarios";
    },
    'Usuario': function(id) {
      return "/Usuarios/"+ id;
    }, 
    '#Usuarios': function() {
      return "Usuarios";
    },
    '#Usuario': function(id) {
      return "Usuarios/"+ id;
    },
    '#UsuariosCadastro': function() {
      return "UsuariosCadastro";
    },
    '#UsuariosListagem': function() {
      return "UsuariosListagem";
    },
    '#GrupoUm': function() {
      return "GrupoUm";
    },
    '#GrupoDois': function() {
      return "GrupoDois";
    }
  };
 
  console.log('(urls) URLs foram carregadas.');

  return {
    gerarUrl: function(tipo) {
      return URLs[tipo] ? URLs[tipo].apply(this, [].slice.call(arguments, 1)) : undefined;
    }
  };
});