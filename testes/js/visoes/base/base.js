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
, 'visoes/base/grupos'
], function(
  aplic
, Backbone
, GDV
, BootStrap
, Jasny
, VisaoDeEntrada
, VisaoDoPainel
, VisaoDoTopoPainel
, VisaoDosGruposPainel
) {
  'use strict';

  var Registrar = aplic.registrar.bind({ envolucro: 'visoes/base/base' });

  var VisaoDeBase = Backbone.View.extend({
    
    el: 'body > div#conteudo-raiz',

    visaoDeEntrada: null,
    visaoDoPainel: null,
    visaoDoTopoPainel: null,
    visaoDosGruposPainel: null,

    initialize: function() {
      Registrar('BAIXO', 'Iniciando a visão.');
      
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
      aplic.sessao.on("change:autenticado", this.render.bind(this));
    },

    render: function() {
      // esconde todas visões de base
      this.$el.find('div.paginas-base').hide();

      if(aplic.sessao.get('autenticado')) {
        
        Registrar('BAIXO', 'Usuário realizou a entrada com sucesso. Mudando visão.');

        // Sempre renderizar a cada nova autenticacao.
        this.visaoDoTopoPainel = GDV.criarVisao("VisaoBaseDeTopoPainel", function() {
          return new VisaoDoTopoPainel();
        });
        this.$el.find('div#painel > div#topo').html(this.visaoDoTopoPainel.render().el);

        this.$el.find('div#painel').show();
      } else {
        Registrar('BAIXO', 'Usuário realizou a saida com sucesso. Mudando visão.');

        this.$el.find('div#entrada').show();
      } 
      return this;
    }
    
  });

  return VisaoDeBase;
});