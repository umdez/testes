
define([
  'modulos'
, 'registrador'
, 'handlebars'
, 'text!templantes/base/painel.html'
], function(
  modulos
, Regis
, hbs
, Templante
) {
  'use strict';

  var Registro = Regis.reg.bind({ envolucro: 'visoes/base/painel' });

  var VisaoDoPainel = Backbone.View.extend({

    el: '#conteudo-raiz > div#painel',

    templante: hbs.compile(Templante),

    initialize: function () {
      Registro(Regis.BAIXO, 'Iniciando a visão.');
      
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
 
    apresentarAvisoDeErro: function(mensagem) {
      this.$el.find('div#aviso-erro.conteudo-painel > span#mensagem').text(mensagem);
      this.$el.find('div#aviso-erro.conteudo-painel').show();
    },

    esconderTodosAvisos: function() {
      this.$el.find('div#aviso-erro.conteudo-painel').hide();
    }

  });

  return VisaoDoPainel;
});