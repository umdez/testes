/* Agrupa todas as URLs das rotas dos modelos e também do roteador.
 */

define([ 
  
], function(
  
) {
  'use strict';

  var grupoDeUrls = {
    'Funcoes': function() {
      return "/restificando/Funcoes";
    },
    'Funcao': function(id) {
      return "/restificando/Funcoes/"+ id;
    },
    'Escopos': function() {
      return "/restificando/Escopos";
    },
    'Escopo': function(idDafuncao, id) {
      return "/restificando/Funcoes/"+ idDafuncao +"/Escopos/"+ id;
    },
    'Contas': function() {
      return "/restificando/Contas";
    },
    'Conta': function(id) {
      return "/restificando/Contas/"+ id;
    },
    'Usuarios': function() {
      return "/restificando/Usuarios";
    },
    'Usuario': function(id) {
      return "/restificando/Usuarios/"+ id;
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