'use strict';

/* Suporte para visão base do sistema. */

define([
  'aplicativo'
, "i18n/indice"
, 'backbone' 
, 'utilitarios/gdv'
, "modulos/indice"
, 'visoes/base/entrada'
, 'visoes/base/painel'
, 'visoes/base/topo'
, 'visoes/base/grupos'
], function(
  aplic
, Lingua
, Backbone
, GDV
, modulos  // inicia os modulos
, VisaoDeEntrada
, VisaoDoPainel
, VisaoDoTopoPainel
, VisaoDosGruposPainel
) {
  'use strict';
 
  var Registrar = _.bind(aplic.registrar, { envolucro: 'visoes/base/base' });

  var VisaoDeBase = Backbone.View.extend({
    
    el: 'body > div#conteudo-raiz',

    visaoDeEntrada: null,
    visaoDoPainel: null,
    visaoDoTopoPainel: null,
    visaoDosGruposPainel: null,

    initialize: function() {
      Registrar('BAIXO', Lingua.gerar('BASE.INFO.INICIANDO_VISAO', {'nome': 'base'}));

      this.visaoDeEntrada = GDV.reusarVisao("Nucleo", "VisaoDeEntrada", function() {
        return new VisaoDeEntrada();
      });

      this.visaoDoPainel = GDV.reusarVisao("Nucleo", "VisaoDoPainel", function() {
        return new VisaoDoPainel();
      });

      this.visaoDoTopoPainel = GDV.criarVisao("Nucleo", "VisaoDoTopoPainel", function() {
        return new VisaoDoTopoPainel();
      });
      this.$el.find('div#painel > div#topo').html(this.visaoDoTopoPainel.render().el);
 
      this.visaoDosGruposPainel = GDV.reusarVisao("Nucleo", "VisaoDosGruposPainel", function() {
        return new VisaoDosGruposPainel();
      });
      
      this.render();
      aplic.sessao.on("change:autenticado", this.render.bind(this));
    },

    render: function() {
      // esconde todas visões de base
      this.$el.find('div.paginas-base').hide();

      if(aplic.sessao.get('autenticado')) {
        Registrar('BAIXO', Lingua.gerar('APLIC.INFO.ENTRADA_NO_SISTEMA_MUDAR_VISAO', {'acao': 'entrada'}));

        // Sempre renderizar a cada nova autenticacao.
        this.visaoDoTopoPainel = GDV.criarVisao("Nucleo", "VisaoDoTopoPainel", function() {
          return new VisaoDoTopoPainel();
        });
        this.$el.find('div#painel > div#topo').html(this.visaoDoTopoPainel.render().el);
        this.$el.find('div#painel').show();
      } else {
        Registrar('BAIXO', Lingua.gerar('APLIC.INFO.ENTRADA_NO_SISTEMA_MUDAR_VISAO', {'acao': 'saida'}));
        this.$el.find('div#entrada').show();
      } 
      return this;
    }
    
  });

  return VisaoDeBase;
});