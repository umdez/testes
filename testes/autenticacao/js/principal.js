define([ 
  "aplicativo"
, "roteador"
], function(
  aplicativo
, Roteador
) {
  'use strict';

  aplicativo.roteador = new Roteador();

  aplicativo.sessao.entrar({'jid': 'fulana@localhost', 'senha': 'montes'}, function(erro) {
    if (!erro) {
      
      aplicativo.sessao.seAutenticado(function(erro) {
        if (!erro) {
          
          aplicativo.sessao.sair(function(erro){
            if (!erro) {
              
            } else {
              
            }
          });
        } else {
          
        }
      });
    } else {
      
    }
  });

  var inicializar = function() {

  };

  return {
    inicializar: inicializar
  };

});