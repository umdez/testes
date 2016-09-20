
define([
  'aplicativo'
, 'urls'
, 'registrador'
, 'handlebars'
, 'text!templantes/base/topo.html'
], function(
  aplicativo
, URLs
, Regis
, hbs
, Templante
) {
  'use strict';
 
  var VisaoDoTopoPainel = Backbone.View.extend({

    tagName: "div",

    templante: hbs.compile(Templante),

    initialize: function () {
      this.render();
    },

    render: function() {
      this.$el.html(this.templante({
        'nome': aplicativo.sessao.conta.get('nome')
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
      aplicativo.roteador.navigate('GrupoUm', true);
    },

    aoClicarEmGrupoDois: function(evento) {
      evento.preventDefault();
      aplicativo.roteador.navigate('GrupoDois', true);
    },

    aoClicarSair : function(evento) {
      evento.preventDefault();

      aplicativo.sessao.sair({
        'sucesso': function(modulo, resposta) {
          aplicativo.roteador.navigate('', true);
          Regis.reg(Regis.BAIXO, 'Você saiu do painel com sucesso.');
        },
        'erro': function(modelo, resposta) {
          Regis.reg(Regis.BAIXO, 'Erro ao tentar sair do painel.');
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