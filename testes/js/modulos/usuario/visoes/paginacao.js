
define([
  'backbone' 
, 'underscore'
//, 'text!/autenticacao/js/templantes/base/base.html'
], function(
  Backbone
, _
//, Templante
) {
  'use strict';

  var VisaoDePaginacao = Backbone.View.extend({

   // el: $('#conteudo-raiz'),

   // templante: _.template(Templante),
    
    attributes: {
      
    },
    
    initialize: function() {
      this.render();
    },

    render: function() {
      
      //this.$el.html(this.templante());
    },

    events: {
      
    },
    
  });

  return VisaoDePaginacao;
});