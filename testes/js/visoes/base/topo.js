
define([
  'aplicativo'
, 'urls'
, 'handlebars'
, 'text!templantes/base/topo.html'
], function(
  aplic
, gerarUrl
, hbs
, Templante
) {
  'use strict';
 
  var Registrar = _.bind(aplic.registrar, { envolucro: 'visoes/base/topo' });

  var VisaoDoTopoPainel = Backbone.View.extend({

    tagName: "div",

    templante: hbs.compile(Templante),

    initialize: function () {
      _.bindAll(this,
        'selecionarItemMenu',
        'aoClicarEmItemDaBarraDeNav'
      );

      Registrar('BAIXO', 'Iniciando a visão.');

      this.listenTo(aplic.evts, 'item-navegacao-topo:selecionar', this.selecionarItemMenu);

      this.render();
    },

    render: function() {
      this.$el.html(this.templante({
        'nome': aplic.sessao.conta.get('nome')
      }));
      return this;
    },

    events: {
      'click ul.menu-painel-topo li.item-menu a': 'aoClicarEmItemDaBarraDeNav',
      'click li#sair-painel a': 'aoClicarSair'
    },

    aoClicarEmItemDaBarraDeNav: function(evento) {
      evento.preventDefault();

      var id = $(evento.currentTarget).attr('id');
      
      Registrar('BAIXO', 'Recebido clique em item ('+ id +') do menu de nav. do topo.');

      switch (id) {
        case 'item-grupo-um': 
          aplic.roteador.navigate(gerarUrl('#GrupoUm'), true);
          break;
        case 'item-grupo-dois': 
          aplic.roteador.navigate(gerarUrl('#GrupoDois'), true);
          break;
      };
    },

    aoClicarSair : function(evento) {
      evento.preventDefault();

      aplic.sessao.sair({
        'sucesso': function(modulo, resposta) {
          aplic.roteador.navigate('', true);
          Registrar('BAIXO', 'Você saiu do painel com sucesso.');
        },
        'erro': function(modelo, resposta) {
          Registrar('BAIXO', 'Erro ao tentar sair do painel.');
        }
      });
    },

    deselecionarItemsMenu: function() {
      // remover seleção de todos items do menu de topo
      this.$el.find('ul.menu-painel-topo li').removeClass('active');
    },

    selecionarItemMenu: function(item) {
      this.deselecionarItemsMenu();
      this.$el.find(item).addClass('active');
    },

    aoFechar: function() {
      
    }

  });

  return VisaoDoTopoPainel;
});