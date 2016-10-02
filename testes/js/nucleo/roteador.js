
/* Aqui vamos adicionar as caracteristicas de trabalhar com as rotas, Carregar
 * os arquivos de visão etc.  
 */
  
define([
  "aplicativo"
, "roteando"
, "utilitarios/gdv"
, "visoes/base/base"
], function(
  aplic
, roteando
, GDV
, VisaoDeBase
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'roteador' });

  var SitioRoteador = Backbone.Router.extend({
    
    routes: {
      '': 'inicio'
    },
    
    anterior: { },
    posterior: { },

    initialize: function () {
      Registrar('BAIXO', 'Iniciando roteador.');

      this.visaoDeBase = GDV.reusarVisao("Nucleo", "VisaoDeBase", function() {
        return new VisaoDeBase();
      });
    },

    inicio: function() {
      Registrar('BAIXO', 'Acessando rota de inicio.');
    },
    
    registrador: function(rota, nome, args) {
      Registrar('BAIXO', 'Acessando a rota ('+ rota +') de nome ('+ nome +') com argumentos ('+ args +')');
    }
    
  });
  
  var inicializar = function() {
    
    var roteamento = function() {
      aplic.roteador = new SitioRoteador();

      // Adicionamos todas as rotas anteriores
      aplic.roteador.anterior = aplic.anteriores || {};

      // Adicionamos todas as rotas posteriores
      aplic.roteador.posterior = aplic.posteriores || {};

      // Adic cada uma das rotas
      _.each(aplic.rotas, function(rota){
        aplic.roteador.route(rota.rota, rota.nome, rota.cd);
      });

      Backbone.history.start({pushState: false, root: '/'}); 
      Registrar('BAIXO', 'Roteador e historio de rotas iniciados com sucesso.');
    }
    
    aplic.sessao.seAutenticado({
      'sucesso': function(modelo, resposta, opcoes) {
        Registrar('BAIXO', 'Usuario autenticado com sucesso.');
        roteamento();
      },
      'erro': function(modelo, resposta, opcoes) {
        Registrar('ALTO', 'Erro: ['+ modelo.status + '] ('+ JSON.parse(modelo.responseText).mensagem +')');
        roteamento();
      }
    });
  };

  return { 
    inicializar: inicializar
  };
});