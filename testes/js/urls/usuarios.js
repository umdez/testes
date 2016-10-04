/* Agrupa todas as URLs dos usuários */

define([ 
  './configuracao'
], function(
  configuracao
) {
  'use strict';

  var urls = {
    'Usuarios': function() {
      return configuracao.base +"/Usuarios";
    },
    'Usuario': function(idDoUsuario) {
      return configuracao.base +"/Usuarios/"+ idDoUsuario;
    }, 
    'UsuarioEndereco': function(idDoEndereco) {
      return configuracao.base +"/UsuarioEndereco/"+ idDoEndereco;
    },
    'UsuarioEnderecos': function() {
      return configuracao.base +"/UsuarioEndereco";
    },
    '#Usuarios': function() {
      return "Usuarios";
    },
    '#Usuario': function(idDoUsuario) {
      return "Usuarios/"+ idDoUsuario;
    },
    '#UsuariosCadastro': function() {
      return "UsuariosCadastro";
    },
    '#UsuariosListagem': function() {
      return "UsuariosListagem";
    },
    '#UsuariosLeitura': function(idDoUsuario) {
      return "UsuariosLeitura/"+ idDoUsuario;
    },
    '#UsuariosLeituraAba': function(idDoUsuario, nomeDaAba) {
      return "UsuariosLeitura/"+ idDoUsuario + "aba/"+ nomeDaAba;
    }
  };
 
  console.log('(urls/usuarios) URLs dos usuários foram carregadas.');

  return urls;
});