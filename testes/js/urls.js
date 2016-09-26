/* Agrupa todas as URLs das rotas dos modelos e também do roteador.
 */

define([ 
  
], function(
  
) {
  'use strict';

  var base = "/restificando";

  var grupoDeUrls = {
    'Funcoes': function() {
      return base +"/Funcoes";
    },
    'Funcao': function(id) {
      return base +"/Funcoes/"+ id;
    },
    'Escopos': function() {
      return base +"/Escopos";
    },
    'Escopo': function(idDafuncao, id) {
      return base +"/Funcoes/"+ idDafuncao +"/Escopos/"+ id;
    },
    'Contas': function() {
      return base +"/Contas";
    },
    'Conta': function(id) {
      return base +"/Contas/"+ id;
    },
    'Usuarios': function() {
      return base +"/Usuarios";
    },
    'Usuario': function(id) {
      return base +"/Usuarios/"+ id;
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
    '#UsuariosLeitura': function(id) {
      return "UsuariosLeitura/"+ id;
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