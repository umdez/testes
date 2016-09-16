
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
      'click ul.menu-painel-topo li.item-cadastrar a': 'aoClicarEmCadastroDeUsuario',
      'click ul.menu-painel-topo li.item-pesquisar a': 'aoClicarEmPesquisaDeUsuario',
      'submit form.sair': 'aoClicarSair'
    },

    aoClicarEmCadastroDeUsuario: function(evento) {
      evento.preventDefault();
      aplicativo.roteador.navigate("Usuarios/0", true);
    },

    aoClicarEmPesquisaDeUsuario: function(evento) {
      evento.preventDefault();
      aplicativo.roteador.navigate("Usuarios", true);
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