define([ 
  "aplicativo"
, "roteador"
], function(
  aplicativo
, Roteador
) {
  'use strict';

  aplicativo.roteador = new Roteador();

  var suporteAosErros = function(modelo, resposta, opcoes) {
    var estatos = modelo.status ? modelo.status : 0;

    var listaDeEstatos = {
      "400" : function() {

      }
    , "401": function() {

      }
    }

    listaDeEstatos[estatos]();

    //console.log(estatos + ' ' + JSON.parse(resposta).mensagem);
    console.log(modelo.status);
  }

  aplicativo.sessao.entrar({'jid': 'fulana2@localhost', 'senha': 'montes'}, {
    
    'sucesso': function(modelo, resposta, opcoes) {

      aplicativo.sessao.seAutenticado({

        'sucesso': function(modelo, resposta, opcoes) {
         
          aplicativo.sessao.sair({
            'sucesso': function(modulo, resposta) {
             
            },
            'erro': function(erro){
                
            }
          });
           
        },
        'erro': function(modelo, resposta, opcoes) {
            
        }
     });
     
    },
    'erro': function(modelo, resposta, opcoes) {
      console.log(modelo.status + ' '+ JSON.parse(modelo.responseText).mensagem);
    }
  });

  var inicializar = function() {

  };

  return {
    inicializar: inicializar
  };

});