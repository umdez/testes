
/* Aqui vamos adicionar as caracteristicas de trabalhar com as rotas, Carregar
 * os arquivos de visão etc.  
 */
 
define([
  "backbone"
], function(
  Backbone
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
      
    },

    asRotasDeDoisNiveis: function(modulo, id){
      
    }
    
  });
  
  return SitioRoteador;

});