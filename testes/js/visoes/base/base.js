'use strict';

/* Suporte para visão base do sistema. */

define([
  'aplicativo'
, 'backbone' 
, 'gdv'
, 'bootstrap'
, 'jasny'
, 'visoes/base/entrada'
, 'visoes/base/painel'
, 'visoes/base/topo'
], function(
  aplicativo
, Backbone
, GDV
, BootStrap
, Jasny
, VisaoDeEntrada
, VisaoDoPainel
, VisaoDoTopoPainel
) {
  
  var VisaoDeBase = Backbone.View.extend({
    
    visaoDeEntrada: null,
    visaoDoPainel: null,
    visaoDoTopoPainel: null,

    initialize: function() {

      this.visaoDeEntrada = GDV.reusarVisao("VisaoBaseDeEntrada", function() {
        return new VisaoDeEntrada();
      });

      this.visaoDoPainel = GDV.reusarVisao("VisaoBaseDePainel", function() {
        return new VisaoDoPainel();
      });

      this.visaoDoTopoPainel = GDV.criarVisao("VisaoBaseDeTopoPainel", function() {
        return new VisaoDoTopoPainel();
      });
      $('div#painel > div#topo').html(this.visaoDoTopoPainel.render().el);
 
      this.render();
      aplicativo.sessao.on("change:autenticado", this.render);
    },

    render: function() {
      // esconde todas visões de base
      $('div.paginas-base').hide();
      
      if(aplicativo.sessao.get('autenticado')) {
        
        // Sempre renderizar a cada nova autenticacao.
        this.visaoDoTopoPainel = GDV.criarVisao("VisaoBaseDeTopoPainel", function() {
          return new VisaoDoTopoPainel();
        });
        $('div#painel > div#topo').html(this.visaoDoTopoPainel.render().el);

        $('#painel').show();
      } else {
        $('#entrada').show();
      } 
      return this;
    }
    
  });

  return VisaoDeBase;
});