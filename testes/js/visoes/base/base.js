'use strict';

/* Suporte para visão base do sistema. */

define([
  'aplicativo'
, 'backbone' 
, 'gdv'
, 'visoes/base/entrada'
, 'visoes/base/painel'
], function(
  aplicativo
, Backbone
, GDV
, VisaoDeEntrada
, VisaoDoPainel
) {
  
  var VisaoDeBase = Backbone.View.extend({
    
    visaoDeEntrada: null,
    visaoDoPainel: null,

    initialize: function() {

      this.visaoDeEntrada = GDV.reusarVisao("VisaoBaseDeEntrada", function() {
        return new VisaoDeEntrada();
      });

      this.visaoDoPainel = GDV.reusarVisao("VisaoBaseDePainel", function() {
        return new VisaoDoPainel();
      });

      this.render();
      aplicativo.sessao.on("change:autenticado", this.render);
    },

    render: function() {
      // esconde todas visões de base
      $('div.paginas-base').hide();
      
      if(aplicativo.sessao.get('autenticado')) {
        $('#painel').show();
      } else {
        $('#entrada').show();
      } 
      return this;
    }
    
  });

  return VisaoDeBase;
});