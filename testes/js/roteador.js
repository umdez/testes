
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
  
  // Iniciamos aqui o histórico das rotas.
  Backbone.history.start(); 

  return SitioRoteador;

});