
define([
  'aplicativo'
, 'parsley'
], function(
  aplicativo
, parsley
) {
 
  var VisaoDeEntrada = Backbone.View.extend({

    el: '#conteudo-raiz > div#entrada',

    jid: null,  
    senha: null, 

    validacao: null,

    initialize: function () {
      this.validacao = $('form.entrada').parsley('validate');
    },
    
    events: {
      'submit form.entrada': 'aoClicarEntrar',
      'change input#entrada-jid': 'aoEscreverAtualizarJid',
      'change input#entrada-senha': 'aoEscreverAtualizarSenha'
    },

    aoEscreverAtualizarJid: function(evento) {
      this.jid = $('input#entrada-jid').val();
    },

    aoEscreverAtualizarSenha: function(evento) {
      this.senha = $('input#entrada-senha').val();
    },

    aoClicarEntrar: function (evento) {
      evento.preventDefault();
      var meuObj = this;

      aplicativo.sessao.entrar({ 'jid': this.jid, 'senha': this.senha }, {
        'sucesso': function(modelo, resposta, opcoes) {
          meuObj.limparFormulario();
          meuObj.jid = meuObj.senha = null;

          // Inicia novamente a validação
          meuObj.validacao.reset();
        },
        'erro': function(modelo, resposta, opcoes) {
          console.log('Erro: ['+ modelo.status + '] ('+ JSON.parse(modelo.responseText).mensagem +')');
        }
      });
    }, 

    limparFormulario: function() {
      $('input#entrada-jid').val('');
      $('input#entrada-senha').val('');
    }

  });

  return VisaoDeEntrada;
});