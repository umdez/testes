/* Este é um agrupamento com diversas visões */

define([
  'aplicativo'
, 'visoes/grupos/configuracao'
, 'handlebars'
, 'text!templantes/grupos/grupo01.html'
], function(
  aplic
, modulosConfig
, hbs
, Templante
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'visoes/grupos/grupo01' });

  var VisaoDoGrupoUm = Backbone.View.extend({

    el: "div#painel > div#conteudo > div.grupo-um",

    templante: hbs.compile(Templante),

    initialize: function () {
      _.bindAll(this, 
        'apresentarAvisoDeErro', 
        'esconderTodosAvisos',
        'aoClicarEmItemDoMenuEsquerdo'
      );

      Registrar('BAIXO', 'Iniciando a visão.');
      
      this.listenTo(aplic.evts, 'grupo-um-aviso-erro:mostrar', this.apresentarAvisoDeErro);
      this.listenTo(aplic.evts, 'grupo-um-avisos:esconder', this.esconderTodosAvisos);

      this.render();
    },

    render: function() {
      this.$el.html(this.templante({
        'modulos': modulosConfig.grupoUm
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
          aplic.navegar('#UsuariosCadastro', null, null, true);
          break;
        case 'item-pesquisar-usuario': 
          aplic.navegar('#UsuariosListagem', null, null, true);
          break;
        case 'item-reusar-visao':
          aplic.navegar('#ExemploDeReuso', null, null, true);
          break;
        default:
          Registrar('BAIXO', 'O item clicado não era esperado.');
          break;
      };
    },

    apresentarAvisoDeErro: function(msg) {
      this.$el.find('div#aviso-erro.conteudo-grupo-um > span#mensagem').text(msg);
      this.$el.find('div#aviso-erro.conteudo-grupo-um').show();
    },

    esconderTodosAvisos: function() {
      this.$el.find('div#aviso-erro.conteudo-grupo-um').hide();
    }

  });

  return VisaoDoGrupoUm;
});