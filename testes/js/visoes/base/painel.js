
define([
  'modulos'
, 'handlebars'
, 'text!templantes/base/painel.html'
], function(
  modulos
, hbs
, Templante
) {
  'use strict';

  var VisaoDoPainel = Backbone.View.extend({

    el: '#conteudo-raiz > div#painel',

    templante: hbs.compile(Templante),

    initialize: function () {
      this.render();
    },

    render: function() {
      this.$el.html(this.templante({ }));
    },

    esconderTodosOsGrupos: function() {
      this.$el.find('div.grupos-painel').hide(); 
    },

    mostrarUmGrupo: function(item) {
      this.$el.find(item).show();
    },
 
    apresentarAviso: function(mensagem) {
      this.$el.find('div#aviso-erro.conteudo-painel > span#mensagem').text(mensagem);
      this.$el.find('div#aviso-erro.conteudo-painel').show();
    },

    esconderAviso: function() {
      this.$el.find('div#aviso-erro.conteudo-painel').hide();
    }

  });

  return VisaoDoPainel;
});