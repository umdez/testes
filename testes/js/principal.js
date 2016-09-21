
define([ 
  "aplicativo"
, 'registrador'
, "roteador"
, "strophe"
, "modulos/indice"
, "parsley.ptbr"
], function(
  aplic
, Regis
, Roteador
, Xmpp
, modulos  // inicia os modulos
, parsleyPtBr
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'principal' });

  aplic.xmpp = {
    'Strophe': Xmpp.Strophe
  , 'cliente': new Xmpp.Strophe.Connection("https://127.0.0.1:8001/http-bind/")
  };

  aplic.sessao.on("change:autenticado", function() {
    var conta = aplic.sessao.conta;
    var seAutenticado = aplic.sessao.get('autenticado');

    Registrar('BAIXO', 'nome?? ' + conta.get('nome'));
    Registrar('BAIXO', 'Funçao?? ' + conta.funcao.get('nome'));
 
    if (seAutenticado) { 
      var Strophe = aplic.xmpp.Strophe;
      var Estatos = Strophe.Status;
      var cliente = aplic.xmpp.cliente;

      cliente.connect('fulana@localhost', 'felippe101', function(estatos) {
        
        if(estatos === Estatos.ERROR) {
          Registrar('BAIXO', 'An error has occurred');
        } else if (estatos === Estatos.CONNECTING) {
          Registrar('BAIXO', 'The connection is currently being made');
        } else if(estatos === Estatos.CONNFAIL) {
          Registrar('BAIXO', 'The connection attempt failed');
        } else if(estatos === Estatos.AUTHENTICATING) {
          Registrar('BAIXO', 'The connection is authenticating');
        } else if(estatos === Estatos.AUTHFAIL) {
          Registrar('BAIXO', 'The authentication attempt failed');
        } else if(estatos === Estatos.CONNECTED) {
          Registrar('BAIXO', 'The connection has succeeded');
        } else if(estatos === Estatos.DISCONNECTED) {
          Registrar('BAIXO', 'The connection has been terminated');
        } else if(estatos === Estatos.DISCONNECTING) {
          Registrar('BAIXO', 'The connection is currently being terminated');
        } else if(estatos === Estatos.ATTACHED) {
          Registrar('BAIXO', 'The connection has been attached');
        } else if(estatos === Estatos.CONNTIMEOUT) {
          Registrar('BAIXO', 'The connection has timed out');
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