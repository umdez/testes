define([
  'aplicativo'
, 'modulos'
, 'urls'
, 'handlebars'
, 'text!templantes/grupos/grupo01.html'
], function(
  aplicativo
, modulos
, URLs
, hbs
, Templante
) {
  'use strict';

  var VisaoDoGrupoUm = Backbone.View.extend({

    el: "div#painel > div#conteudo > div.grupo-um",

    templante: hbs.compile(Templante),

    initialize: function () {
      this.render();
    },

    render: function() {
      this.$el.html(this.templante({
        'modulos': modulos.grupoUm
      }));
    },

    events: {
      'click ul.menu-vertical-esquerda li.item-cadastrar-usuario a': 'aoClicarEmCadastrarUsuario',
      'click ul.menu-vertical-esquerda li.item-pesquisar-usuario a': 'aoClicarEmPesquisarUsuario',
    },

    aoClicarEmCadastrarUsuario: function(evento) {
      evento.preventDefault();
      aplicativo.roteador.navigate(URLs.gerarUrl('#UsuariosCadastro'), true);
    },

    aoClicarEmPesquisarUsuario: function(evento) {
      evento.preventDefault();
      aplicativo.roteador.navigate(URLs.gerarUrl('#UsuariosListagem'), true);
    },

    apresentarAvisoDeErro: function(mensagem) {
      this.$el.find('div#aviso-erro.conteudo-grupo-um > span#mensagem').text(mensagem);
      this.$el.find('div#aviso-erro.conteudo-grupo-um').show();
    },

    esconderTodosAvisos: function() {
      this.$el.find('div#aviso-erro.conteudo-grupo-um').hide();
    }

  });

  return VisaoDoGrupoUm;
});