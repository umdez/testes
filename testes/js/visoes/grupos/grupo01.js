/* Este é um agrupamento com diversas visões */

define([
  'aplicativo'
, 'modulos'
, 'urls'
, 'registrador'
, 'handlebars'
, 'text!templantes/grupos/grupo01.html'
], function(
  aplicativo
, modulos
, URLs
, Regis
, hbs
, Templante
) {
  'use strict';

  var Registro = Regis.reg.bind({ envolucro: 'grupo01' });

  var VisaoDoGrupoUm = Backbone.View.extend({

    el: "div#painel > div#conteudo > div.grupo-um",

    templante: hbs.compile(Templante),

    initialize: function () {
      Registro(Regis.BAIXO, 'Iniciando a visão.');
      
      this.render();
    },

    render: function() {
      this.$el.html(this.templante({
        'modulos': modulos.grupoUm
      }));
    },

    events: {
      'click ul.menu-vertical-esquerdo li.item-menu a': 'aoClicarEmItemDoMenuEsquerdo'
    },

    aoClicarEmItemDoMenuEsquerdo: function(evento) {
      evento.preventDefault();

      var id = $(evento.currentTarget).attr('id');
      
      Registro(Regis.BAIXO, 'Recebido clique em item ('+ id +') do menu esquerdo.');

      switch (id) {
        case 'item-cadastrar-usuario': 
          aplicativo.roteador.navigate(URLs.gerarUrl('#UsuariosCadastro'), true);
          break;
        case 'item-pesquisar-usuario': 
          aplicativo.roteador.navigate(URLs.gerarUrl('#UsuariosListagem'), true);
          break;
      }
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