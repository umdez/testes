define([ 
  "aplicativo"
, "roteador"
, "strophe"
, "modulos"
], function(
  aplicativo
, Roteador
, Xmpp
, modulos
) {
  'use strict';

  aplicativo.roteador = new Roteador();  

  aplicativo.xmpp = {
    'Strophe': Xmpp.Strophe
  , 'cliente': new Xmpp.Strophe.Connection("https://127.0.0.1:8001/http-bind/")
  };

  aplicativo.sessao.entrar({'jid': 'fulana@localhost', 'senha': 'montes'}, {
    'sucesso': function(modelo, resposta, opcoes) {

        var Strophe = aplicativo.xmpp.Strophe;
        var cliente = aplicativo.xmpp.cliente;

        cliente.connect('felippe@localhost', 'felippe101', function(estatos) {
          
          if(estatos === Strophe.Status.ERROR) {
            console.log('An error has occurred');
          } else if (estatos === Strophe.Status.CONNECTING) {
            console.log('The connection is currently being made');
          } else if(estatos === Strophe.Status.CONNFAIL) {
            console.log('The connection attempt failed');
          } else if(estatos === Strophe.Status.AUTHENTICATING) {
            console.log('The connection is authenticating');
          } else if(estatos === Strophe.Status.AUTHFAIL) {
            console.log('The authentication attempt failed');
          } else if(estatos === Strophe.Status.CONNECTED) {
            console.log('The connection has succeeded');
          } else if(estatos === Strophe.Status.DISCONNECTED) {
            console.log('The connection has been terminated');
          } else if(estatos === Strophe.Status.DISCONNECTING) {
            console.log('The connection is currently being terminated');
          } else if(estatos === Strophe.Status.ATTACHED) {
            console.log('The connection has been attached');
          } else if(estatos === Strophe.Status.CONNTIMEOUT) {
            console.log('The connection has timed out');
          }
        });
        aplicativo.sessao.seAutenticado({});

        aplicativo.sessao.seAutenticado({

          'sucesso': function(modelo, resposta, opcoes) {
              var conta = aplicativo.sessao.conta;
              var escopos = conta.funcao.get('Escopos');
              var seAutenticado = aplicativo.sessao.get('autenticado');

              /*
              aplicativo.sessao.sair({
                'sucesso': function(modulo, resposta) {
                
                },
                'erro': function(erro){
                    
                }
              });
              */
          },
          'erro': function(modelo, resposta, opcoes) {
            
          }
      });
    },
    'erro': function(modelo, resposta, opcoes) {
      console.log(modelo.status + ' '+ JSON.parse(modelo.responseText).mensagem);
    }
  });


  aplicativo.sessao.seAutenticado({
    'sucesso': function(modelo, resposta, opcoes) {
      
    },
    'erro': function(modelo, resposta, opcoes) {
      
    }
  });

  aplicativo.sessao.on("change:autenticado", function(){
    var seAutenticado = aplicativo.sessao.get('autenticado');
    console.log('autenticado?? ' + seAutenticado);
    console.log('nome?? ' + aplicativo.sessao.conta.get('nome'));
    console.log('Escopos?? ' + aplicativo.sessao.conta.funcao.get('Escopos'))
    console.log('Funçao?? ' + aplicativo.sessao.conta.funcao.get('nome'))
  }, this);

  var inicializar = function() {

  };

  return {
    inicializar: inicializar
  };

});