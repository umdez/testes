define([ 
  "aplicativo"
, "pace"
], function(
  aplic
, Pace
) {
  'use strict';
  
  Pace.start({
    document: true
  });

   var VisaoDoCarregando = Backbone.View.extend({
    
    el: 'body > div#conteudo-raiz',

    initialize: function() {
      this.listenTo(aplic.evts, 'carregando:apresentar', this.apresentar);
    },

    apresentar: function() {
      Pace.restart();
    }

   });

   var visaoDoCarregando = new VisaoDoCarregando();
});