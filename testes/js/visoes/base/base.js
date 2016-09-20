'use strict';

/* Suporte para visão base do sistema. */

define([
  'aplicativo'
, 'backbone' 
, 'registrador'
, 'gdv'
, 'bootstrap'
, 'jasny'
, 'visoes/base/entrada'
, 'visoes/base/painel'
, 'visoes/base/topo'
, 'visoes/base/grupos'
], function(
  aplicativo
, Backbone
, Regis
, GDV
, BootStrap
, Jasny
, VisaoDeEntrada
, VisaoDoPainel
, VisaoDoTopoPainel
, VisaoDosGruposPainel
) {
  'use strict';

  var Registro = Regis.reg.bind({ envolucro: 'base' });

  var VisaoDeBase = Backbone.View.extend({
    
    el: 'body > div#conteudo-raiz',

    visaoDeEntrada: null,
    visaoDoPainel: null,
    visaoDoTopoPainel: null,
    visaoDosGruposPainel: null,

    initialize: function() {
      Registro(Regis.BAIXO, 'Iniciando a visão.');
      
      this.visaoDeEntrada = GDV.reusarVisao("VisaoBaseDeEntrada", function() {
        return new VisaoDeEntrada();
      });

      this.visaoDoPainel = GDV.reusarVisao("VisaoBaseDePainel", function() {
        return new VisaoDoPainel();
      });

      this.visaoDoTopoPainel = GDV.criarVisao("VisaoBaseDeTopoPainel", function() {
        return new VisaoDoTopoPainel();
      });
      this.$el.find('div#painel > div#topo').html(this.visaoDoTopoPainel.render().el);
 
      this.visaoDosGruposPainel = GDV.reusarVisao("VisaoGruposDoPainel", function() {
        return new VisaoDosGruposPainel();
      });
      
      this.render();
      aplicativo.sessao.on("change:autenticado", this.render.bind(this));
    },

    render: function() {
      // esconde todas visões de base
      this.$el.find('div.paginas-base').hide();

      if(aplicativo.sessao.get('autenticado')) {
        
        // Sempre renderizar a cada nova autenticacao.
        this.visaoDoTopoPainel = GDV.criarVisao("VisaoBaseDeTopoPainel", function() {
          return new VisaoDoTopoPainel();
        });
        this.$el.find('div#painel > div#topo').html(this.visaoDoTopoPainel.render().el);

        this.$el.find('div#painel').show();
      } else {
        this.$el.find('div#entrada').show();
      } 
      return this;
    }
    
  });

  return VisaoDeBase;
});