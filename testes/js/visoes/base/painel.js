
define([
  'aplicativo'
], function(
  aplicativo
) {

  var VisaoDoPainel = Backbone.View.extend({

    el: '#conteudo-raiz > div#painel',

    initialize: function () {
      
    },
    
    events: {
      'submit form.sair': 'aoClicarSair'
    },

    aoClicarSair : function(evento) {
      evento.preventDefault();

      aplicativo.sessao.sair({
        'sucesso': function(modulo, resposta) {
        
        },
        'erro': function(erro){
            
        }
      });
    }

  });

  return VisaoDoPainel;
});