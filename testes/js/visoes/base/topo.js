
define([
  'aplicativo'
, 'urls'
, 'handlebars'
, 'text!templantes/base/topo.html'
], function(
  aplicativo
, URLs
, hbs
, Templante
) {

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
      'click ul.menu-painel-topo li.item-cadastrar a': 'aoClicarEmCadastroDeUsuario',
      'click ul.menu-painel-topo li.item-pesquisar a': 'aoClicarEmPesquisaDeUsuario',
      'submit form.sair': 'aoClicarSair'
    },

    aoClicarEmCadastroDeUsuario: function(evento) {
      evento.preventDefault();
      aplicativo.roteador.navigate(URLs.gerarUrl('#Usuario', 0), true);
    },

    aoClicarEmPesquisaDeUsuario: function(evento) {
      evento.preventDefault();
      aplicativo.roteador.navigate(URLs.gerarUrl('#Usuarios'), true);
    },

    aoClicarSair : function(evento) {
      evento.preventDefault();

      aplicativo.sessao.sair({
        'sucesso': function(modulo, resposta) {
          console.log('Você saiu do painel com sucesso.')
        },
        'erro': function(modelo, resposta) {
          console.log('Erro ao tentar sair do painel.')
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

    onClose: function() {
      
    }

  });

  return VisaoDoTopoPainel;
});