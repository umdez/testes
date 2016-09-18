
define([
  'aplicativo'
, 'urls'
, 'modulos'
, 'text!templantes/base/painel.html'
], function(
  aplicativo
, URLs
, modulos
, Templante
) {

  var VisaoDoPainel = Backbone.View.extend({

    el: '#conteudo-raiz > div#painel',

    templante: _.template(Templante),

    initialize: function () {
      this.render();
    },

    render: function() {
      this.$el.html(this.templante());
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

    escoderTodosOsConteudos: function() {
      this.$el.find('div#conteudo div.conteudo-painel').hide();
    },

    mostrarUmConteudo: function(item) {
      this.$el.find(item).show();
    },

    deselecionarItemsTopoMenu: function() {
      // remover seleção de todos items do menu de topo
      this.$el.find('ul.menu-painel-topo li').removeClass('active');
    },

    selecionarItemTopoMenu: function(item) {
      this.deselecionarItemsTopoMenu();
      this.$el.find(item).addClass('active');
    }

  });

  return VisaoDoPainel;
});