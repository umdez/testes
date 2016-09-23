/* Agrupa todas as URLs das rotas dos modelos e também do roteador.
 */

define([ 
  
], function(
  
) {
  'use strict';

  var grupoDeUrls = {
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

  var gerarUrl = function(tipo) {
    return grupoDeUrls[tipo] ? grupoDeUrls[tipo].apply(this, [].slice.call(arguments, 1)) : undefined;
  };

  return gerarUrl;
});