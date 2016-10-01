
define([ 
  "aplicativo"
, 'registrador'
, "roteador"
, "strophe"
], function(
  aplic
, Regis
, Roteador
, Xmpp
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'principal' });

  aplic.xmpp = {
    'Strophe': Xmpp.Strophe
  , 'cliente': new Xmpp.Strophe.Connection("https://127.0.0.1:8001/http-bind/")
  };

  aplic.sessao.on("change:autenticado", function() {
    var conta = aplic.sessao.get('Conta');
    var seAutenticado = aplic.sessao.get('autenticado');

    if (seAutenticado) {
      Registrar('BAIXO', 'nome?? ' + conta.get('nome'));
      Registrar('BAIXO', 'Funçao?? ' + conta.get('Funcoes').get('nome'));
    }
 
    if (seAutenticado) { 
      var Strophe = aplic.xmpp.Strophe;
      var Estatos = Strophe.Status;
      var cliente = aplic.xmpp.cliente;

      cliente.connect('fulana@localhost', 'felippe101', function(estatos) {
        
        if(estatos === Estatos.ERROR) {
          Registrar('BAIXO', '(XMPP) An error has occurred');
        } else if (estatos === Estatos.CONNECTING) {
          Registrar('BAIXO', '(XMPP) The connection is currently being made');
        } else if(estatos === Estatos.CONNFAIL) {
          Registrar('BAIXO', '(XMPP) The connection attempt failed');
        } else if(estatos === Estatos.AUTHENTICATING) {
          Registrar('BAIXO', '(XMPP) The connection is authenticating');
        } else if(estatos === Estatos.AUTHFAIL) {
          Registrar('BAIXO', '(XMPP) The authentication attempt failed');
        } else if(estatos === Estatos.CONNECTED) {
          Registrar('BAIXO', '(XMPP) The connection has succeeded');
        } else if(estatos === Estatos.DISCONNECTED) {
          Registrar('BAIXO', '(XMPP) The connection has been terminated');
        } else if(estatos === Estatos.DISCONNECTING) {
          Registrar('BAIXO', '(XMPP) The connection is currently being terminated');
        } else if(estatos === Estatos.ATTACHED) {
          Registrar('BAIXO', '(XMPP) The connection has been attached');
        } else if(estatos === Estatos.CONNTIMEOUT) {
          Registrar('BAIXO', '(XMPP) The connection has timed out');
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