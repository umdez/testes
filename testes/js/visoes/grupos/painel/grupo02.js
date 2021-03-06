define([
  'aplicativo'
, "i18n/indice"
, 'visoes/grupos/configuracao'
, 'handlebars'
, 'text!templantes/grupos/painel/grupo02.html'
], function(
  aplic
, Lingua
, config
, hbs
, Templante
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'visoes/grupos/grupo02' });

  var VisaoDoGrupoDois = Backbone.View.extend({

    el: "div#painel > div#conteudo > div.grupo-dois",

    templante: hbs.compile(Templante),

    initialize: function () {
      Registrar('BAIXO', Lingua.gerar('GRUPOS.INFO.INICIANDO_VISAO', {'nome': 'grupo02'}));

      this.render();
    },

    render: function() {
      this.$el.html(this.templante({
        'modulos': config.painel.grupoDois
      }));
    },

    events: {
      
    }

  });

  return VisaoDoGrupoDois;
});