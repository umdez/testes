/* Agrupa todas as URLs dos usuários */

define([ 
  'urls/configuracao'
], function(
  configuracao
) {
  'use strict';

  var urls = {
    'Usuarios': function() {
      return configuracao.base +"/Usuarios";
    },
    'Usuario': function(id) {
      return configuracao.base +"/Usuarios/"+ id;
    }, 
    'UsuarioEndereco': function(idEndereco) {
      return configuracao.base +"/UsuarioEndereco/"+ idEndereco;
    },
    'UsuarioEnderecos': function() {
      return configuracao.base +"/UsuarioEndereco";
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
    '#ExemploDeReuso': function() {
      return "ExemploDeReuso";
    }
  };
 
  console.log('(urls/usuarios) URLs dos usuários foram carregadas.');

  return urls;
});