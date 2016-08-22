/*******************************************************************
 * Listificando é de (C) propriedade da Devowly Sistemas 2015-2016 *
 *                 https://github.com/devowly                      *
 *******************************************************************
 * 
 * $Id roteador.js, criado em 26/07/2016 às 17:34 por Leo Felippe $
 *
 * Versão atual 0.0.2-Beta
 */

/* Aqui vamos adicionar as caracteristicas de trabalhar com as rotas, Carregar
 * os arquivos de visão etc.  
 */
 
define([
  'jquery'
, 'backbone'
, 'underscore'
, 'visoes/base/base'
], function(
  $
, Backbone
, _
, VisaoBase
) {
  'use strict';
  
  /* @Roteador SitioRoteador().
   *
   * Aqui temos as propriedades e métodos do nosso roteador. O roteador, como o nome já indica,
   * realiza a apresentação das visões para cada cada rota acessada.
   */
  var SitioRoteador = Backbone.Router.extend({
    
    /* @Propriedade {Objeto} [routes] Contêm as nossas rotas.
     */
    routes: {
      '':            'inicio'
    , ':modulo':     'asRotasDeUmNivel'
    , ':modulo/:id': 'asRotasDeDoisNiveis'
    },
    
    /* @Construtor initialize(). Aqui realizamos o inicio do nosso roteador.
     */
    initialize: function () {
      
      this.visaoBase = new VisaoBase();
    },
    
    /* @Método inicio(). Esta é a rota sempre apresentada inicialmente.
     */
    inicio: function() {
      
    },
    
    /* @Método asRotasDeUmNivel(). Esta é a rota chamada quando o usuário não
     * especificar um id.
     */
    asRotasDeUmNivel: function(modulo){
      
    },

    /* @Método asRotasDeDoisNiveis(). Esta é a rota chamada quando o usuário
     * informar um id.
     */
    asRotasDeDoisNiveis: function(modulo, id){
      
    }
    
  });
  
  /* @Função inicializar(). Responsável por iniciar o nosso roteador e o
   * histório de rotas.
   */
  var inicializar = function() {
    
    var sitioRoteador = new SitioRoteador();
      
    // Iniciamos aqui o histórico das rotas.
    Backbone.history.start();   
  };
 
  return { 
    inicializar: inicializar
  };
});