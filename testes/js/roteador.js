
/* Aqui vamos adicionar as caracteristicas de trabalhar com as rotas, Carregar
 * os arquivos de visão etc.  
 */
  
define([
  "aplicativo"
, "backbone"
, "gdv"
, "visoes/base/base"
], function(
  aplic
, Backbone
, GDV
, VisaoDeBase
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'roteador' });

  var SitioRoteador = Backbone.Router.extend({
    
    routes: {
      '':            'inicio'
    , ':modulo':     'asRotasDeUmNivel'
    , ':modulo/:id': 'asRotasDeDoisNiveis'
    },
    
    initialize: function () {
      Registrar('BAIXO', 'Iniciando roteador.');

      this.visaoDeBase = GDV.reusarVisao("Nucleo", "VisaoDeBase", function() {
        return new VisaoDeBase();
      });
    },
    
    inicio: function() {
      Registrar('BAIXO', 'Acessando rota de inicio.');
    },
    
    asRotasDeUmNivel: function(modulo) {
      Registrar('BAIXO', 'Buscando a rota '+ modulo);
      aplic.buscarRota(modulo, null);
    },

    asRotasDeDoisNiveis: function(modulo, id) {
      Registrar('BAIXO', 'Buscando a rota '+ modulo +'/'+ id);
      aplic.buscarRota(modulo, id);
    }
    
  });
  
  var inicializar = function() {
    
    var roteamento = function() {
      aplic.roteador = new SitioRoteador();
      Backbone.history.start(); 
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