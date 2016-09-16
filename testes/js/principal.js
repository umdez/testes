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

  aplicativo.xmpp = {
    'Strophe': Xmpp.Strophe
  , 'cliente': new Xmpp.Strophe.Connection("https://127.0.0.1:8001/http-bind/")
  };

  aplicativo.sessao.on("change:autenticado", function() {
    var conta = aplicativo.sessao.conta;
    var seAutenticado = aplicativo.sessao.get('autenticado');
    console.log('nome?? ' + conta.get('nome'));
    console.log('Funçao?? ' + conta.funcao.get('nome'))

    if (seAutenticado) { 
      var Strophe = aplicativo.xmpp.Strophe;
      var Estatos = Strophe.Status;
      var cliente = aplicativo.xmpp.cliente;

      cliente.connect('fulana@localhost', 'felippe101', function(estatos) {
        
        if(estatos === Estatos.ERROR) {
          console.log('An error has occurred');
        } else if (estatos === Estatos.CONNECTING) {
          console.log('The connection is currently being made');
        } else if(estatos === Estatos.CONNFAIL) {
          console.log('The connection attempt failed');
        } else if(estatos === Estatos.AUTHENTICATING) {
          console.log('The connection is authenticating');
        } else if(estatos === Estatos.AUTHFAIL) {
          console.log('The authentication attempt failed');
        } else if(estatos === Estatos.CONNECTED) {
          console.log('The connection has succeeded');
        } else if(estatos === Estatos.DISCONNECTED) {
          console.log('The connection has been terminated');
        } else if(estatos === Estatos.DISCONNECTING) {
          console.log('The connection is currently being terminated');
        } else if(estatos === Estatos.ATTACHED) {
          console.log('The connection has been attached');
        } else if(estatos === Estatos.CONNTIMEOUT) {
          console.log('The connection has timed out');
        }
      });
    }
  }, this);

  var inicializar = function() {
    Roteador.inicializar();
  };

  return {
    inicializar: inicializar
  };

});