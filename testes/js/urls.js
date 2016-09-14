
define([ 
  
], function(
  
) {
  'use strict';
  
  var URLs = {
    Funcoes: function() {
      return "/Funcoes";
    },
    Funcao: function(id) {
      return "/Funcoes/"+ id;
    },
    Escopos: function() {
      return "/Escopos";
    },
    Escopo: function(idDafuncao, id) {
      return "/Funcoes/"+ idDafuncao +"/Escopos/"+ id;
    },
    Contas: function() {
      return "/Contas";
    },
    Conta: function(id) {
      return "/Contas/"+ id;
    },
    Usuarios: function() {
      return "/Usuarios";
    },
    Usuario: function(id) {
      return "/Usuarios/"+ id;
    }
  };
 
  return {
    gerarUrl: function(tipo) {
      return URLs[tipo] ? URLs[tipo].apply(this, [].slice.call(arguments, 1)) : undefined;
    }
  };
});