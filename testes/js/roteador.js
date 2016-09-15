
/* Aqui vamos adicionar as caracteristicas de trabalhar com as rotas, Carregar
 * os arquivos de visão etc.  
 */
 
define([
  "aplicativo"
, "backbone"
], function(
  aplicativo
, Backbone
) {
  'use strict';
  
  var SitioRoteador = Backbone.Router.extend({
    
    routes: {
      '':            'inicio'
    , ':modulo':     'asRotasDeUmNivel'
    , ':modulo/:id': 'asRotasDeDoisNiveis'
    },
    
    initialize: function () {
      
      
    },
    
    inicio: function() {
      
    },
    
    asRotasDeUmNivel: function(modulo){
      aplicativo.buscarRota(modulo, null)
    },

    asRotasDeDoisNiveis: function(modulo, id){
      aplicativo.buscarRota(modulo, id)
    }
    
  });
  
  var inicializar = function() {
    
    var roteamento = function() {
      aplicativo.roteador = new SitioRoteador();
      Backbone.history.start(); 
    }
    
    aplicativo.sessao.seAutenticado({
      'sucesso': function(modelo, resposta, opcoes) {
        roteamento();
      },
      'erro': function(modelo, resposta, opcoes) {
        roteamento();
      }
    });
  };

  return { 
    inicializar: inicializar
  };
});