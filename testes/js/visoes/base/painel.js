
define([
  'aplicativo'
, "i18n/indice"
, 'handlebars'
, 'text!templantes/base/painel.html'
], function(
  aplic
, Lingua
, hbs
, Templante
) {
  'use strict';
  
  var Registrar = _.bind(aplic.registrar, { envolucro: 'visoes/base/painel' });

  var VisaoDoPainel = Backbone.View.extend({

    el: '#conteudo-raiz > div#painel',

    templante: hbs.compile(Templante),

    initialize: function () {
      _.bindAll(this,
        'esconderTodosOsGrupos',
        'mostrarUmGrupo',
        'esconderTodosAvisos'
      );

      Registrar('BAIXO', Lingua.gerar('BASE.INFO.INICIANDO_VISAO', {'nome': 'painel'}));
      
      this.listenTo(aplic.evts, 'painel-avisos:esconder', this.esconderTodosAvisos);
      this.listenTo(aplic.evts, 'painel-grupos:esconder', this.esconderTodosOsGrupos);
      this.listenTo(aplic.evts, 'painel-grupo:mostrar', this.mostrarUmGrupo);

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