
define([
  'aplicativo'
, "i18n/indice"
, 'handlebars'
, 'text!templantes/base/topo.html'
], function(
  aplic
, Lingua
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
        'deselecionarItemsMenu',
        'aoClicarEmItemDaBarraDeNav'
      );

      Registrar('BAIXO', Lingua.gerar('BASE.INFO.INICIANDO_VISAO', {'nome': 'topo'}));

      this.listenTo(aplic.evts, 'item-navegacao-topo:selecionar', this.selecionarItemMenu);
      this.listenTo(aplic.evts, 'item-navegacao-topo:deselecionar', this.deselecionarItemsMenu);

      this.render();
    },

    render: function() {
      this.$el.html(this.templante({
        'nome': aplic.sessao.get('autenticado') ? aplic.sessao.conta.get('nome') : ''
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
      
      Registrar('BAIXO', Lingua.gerar('TOPO.INFO.CLIQUE_ITEM_BARRA_DE_MENU', {'id': id}));

      switch (id) {
        case 'item-grupo-um': 
          aplic.navegar('#GrupoUm', null, null, true); 
          break;
        case 'item-grupo-dois': 
          aplic.navegar('#GrupoDois', null, null, true);
          break;
        default:
          Registrar('BAIXO', Lingua.gerar('TOPO.INFO.CLIQUE_ITEM_MENU_INESPERADO', {'id': id}));
          break;
      };
    },

    aoClicarSair : function(evento) {
      evento.preventDefault();

      aplic.sessao.sair({
        'sucesso': function(modulo, resposta) {
          aplic.navegar('', null, null, true);
          Registrar('BAIXO', 'Você saiu do painel com sucesso.');
        },
        'erro': function(xhr, err) {
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