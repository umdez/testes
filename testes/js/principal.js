
define([ 
  "aplicativo"
, "roteador"
, "registrador"
, "strophe"
, "modulos"
, "parsley.ptbr"
], function(
  aplicativo
, Roteador
, Regis
, Xmpp
, modulos
, parsleyPtBr
) {
  'use strict';

  var Registro = Regis.reg.bind({ envolucro: 'principal' });

  aplicativo.xmpp = {
    'Strophe': Xmpp.Strophe
  , 'cliente': new Xmpp.Strophe.Connection("https://127.0.0.1:8001/http-bind/")
  };

  aplicativo.sessao.on("change:autenticado", function() {
    var conta = aplicativo.sessao.conta;
    var seAutenticado = aplicativo.sessao.get('autenticado');

    Registro(Regis.BAIXO,'nome?? ' + conta.get('nome'));
    Registro(Regis.BAIXO, 'Funçao?? ' + conta.funcao.get('nome'));
 
    if (seAutenticado) { 
      var Strophe = aplicativo.xmpp.Strophe;
      var Estatos = Strophe.Status;
      var cliente = aplicativo.xmpp.cliente;

      cliente.connect('fulana@localhost', 'felippe101', function(estatos) {
        
        if(estatos === Estatos.ERROR) {
          Registro(Regis.BAIXO, 'An error has occurred');
        } else if (estatos === Estatos.CONNECTING) {
          Registro(Regis.BAIXO, 'The connection is currently being made');
        } else if(estatos === Estatos.CONNFAIL) {
          Registro(Regis.BAIXO, 'The connection attempt failed');
        } else if(estatos === Estatos.AUTHENTICATING) {
          Registro(Regis.BAIXO, 'The connection is authenticating');
        } else if(estatos === Estatos.AUTHFAIL) {
          Registro(Regis.BAIXO, 'The authentication attempt failed');
        } else if(estatos === Estatos.CONNECTED) {
          Registro(Regis.BAIXO, 'The connection has succeeded');
        } else if(estatos === Estatos.DISCONNECTED) {
          Registro(Regis.BAIXO, 'The connection has been terminated');
        } else if(estatos === Estatos.DISCONNECTING) {
          Registro(Regis.BAIXO, 'The connection is currently being terminated');
        } else if(estatos === Estatos.ATTACHED) {
          Registro(Regis.BAIXO, 'The connection has been attached');
        } else if(estatos === Estatos.CONNTIMEOUT) {
          Registro(Regis.BAIXO, 'The connection has timed out');
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