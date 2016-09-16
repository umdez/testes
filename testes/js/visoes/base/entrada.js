
define([
  'aplicativo'
], function(
  aplicativo
) {

  var VisaoDeEntrada = Backbone.View.extend({

    el: '#conteudo-raiz > div#entrada',

    jid: null,  
    
    senha: null, 

    initialize: function () {

    },
    
    events: {
      'submit form.entrada': 'aoClicarEntrar',
      'change input#entrada-jid': 'aoEscreverAtualizarJid',
      'change input#entrada-senha': 'aoEscreverAtualizarSenha'
    },

    aoEscreverAtualizarJid: function(evento) {
      this.jid = $(evento.currentTarget).val();
    },

    aoEscreverAtualizarSenha: function(evento) {
      this.senha = $(evento.currentTarget).val();
    },

    aoClicarEntrar: function (evento) {
      evento.preventDefault();
      var meuObj = this;
      
      aplicativo.sessao.entrar({'jid': this.jid, 'senha': this.senha}, {
        'sucesso': function(modelo, resposta, opcoes) {
          meuObj.jid = meuObj.senha = null;
        },
        'erro': function(modelo, resposta, opcoes) {
          console.log('Não foi possível autenticar o usuário. '+ modelo.status + ' ('+ JSON.parse(modelo.responseText).mensagem +')');
        }
      });
    }

  });

  return VisaoDeEntrada;
});