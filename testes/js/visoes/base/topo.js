
define([
  'aplicativo'
, 'urls'
, 'handlebars'
, 'text!templantes/base/topo.html'
], function(
  aplic
, URLs
, hbs
, Templante
) {
  'use strict';
 
  var Registrar = _.bind(aplic.registrar, { envolucro: 'visoes/base/topo' });

  var VisaoDoTopoPainel = Backbone.View.extend({

    tagName: "div",

    templante: hbs.compile(Templante),

    initialize: function () {
      Registrar('BAIXO', 'Iniciando a visão.');

      this.render();
    },

    render: function() {
      this.$el.html(this.templante({
        'nome': aplic.sessao.conta.get('nome')
      }));
      return this;
    },

    events: {
      'click ul.menu-painel-topo li.item-grupo-um a': 'aoClicarEmGrupoUm',
      'click ul.menu-painel-topo li.item-grupo-dois a': 'aoClicarEmGrupoDois',
      'click li#sair-painel a': 'aoClicarSair'
    },

    aoClicarEmGrupoUm: function(evento) {
      evento.preventDefault();
      aplic.roteador.navigate('GrupoUm', true);
    },

    aoClicarEmGrupoDois: function(evento) {
      evento.preventDefault();
      aplic.roteador.navigate('GrupoDois', true);
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