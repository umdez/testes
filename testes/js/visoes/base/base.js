'use strict';

/* Suporte para visão base do sistema. */

define([
  'aplicativo'
, 'backbone' 
, 'visoes/base/entrada'
, 'visoes/base/painel'
], function(
  aplicativo
, Backbone
, VisaoDeEntrada
, VisaoDoPainel
) {
  
  var VisaoDeBase = Backbone.View.extend({
    
    attributes: {
      
    },
    
    initialize: function() {
      this.visaoDeEntrada = new VisaoDeEntrada();
      this.visaoDoPainel = new VisaoDoPainel();

      this.render();
      aplicativo.sessao.on("change:autenticado", this.render);
    },

    render: function() {
      $('div.pages').hide();
      
      if(aplicativo.sessao.get('autenticado')) {
        $('#painel').show();
      } else {
        $('#entrada').show();
      } 
      return this;
    },

    events: {
      
    },
    
    onClose: function() {
      
    }
    
  });

  return VisaoDeBase;
});