/* Este é um agrupamento com diversas visões */

define([
  'aplicativo'
, 'modulos'
, 'urls'
, 'handlebars'
, 'text!templantes/grupos/grupo01.html'
], function(
  aplic
, modulos
, URLs
, hbs
, Templante
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'visoes/grupos/grupo01' });

  var VisaoDoGrupoUm = Backbone.View.extend({

    el: "div#painel > div#conteudo > div.grupo-um",

    templante: hbs.compile(Templante),

    initialize: function () {
      Registrar('BAIXO', 'Iniciando a visão.');
      
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
      
      Registrar('BAIXO', 'Recebido clique em item ('+ id +') do menu esquerdo.');

      switch (id) {
        case 'item-cadastrar-usuario': 
          aplic.roteador.navigate(URLs.gerarUrl('#UsuariosCadastro'), true);
          break;
        case 'item-pesquisar-usuario': 
          aplic.roteador.navigate(URLs.gerarUrl('#UsuariosListagem'), true);
          break;
      };
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