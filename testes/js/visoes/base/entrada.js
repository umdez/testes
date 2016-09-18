
define([
  'aplicativo'
, 'parsley'
, 'text!templantes/base/entrada.html'
], function(
  aplicativo
, parsley
, Templante
) {
 
  var VisaoDeEntrada = Backbone.View.extend({

    el: '#conteudo-raiz > div#entrada',

    jid: null,  
    senha: null, 

    templante: _.template(Templante),

    validacao: null,

    initialize: function () {
      this.render();
    },
    
    render: function() {
      this.$el.html(this.templante());
      this.validacao = this.$el.find('form.entrada').parsley('validate');
    },

    events: {
      'submit form.entrada': 'aoClicarEntrar',
      'change input#entrada-jid': 'aoEscreverAtualizarJid',
      'change input#entrada-senha': 'aoEscreverAtualizarSenha'
    },

    aoEscreverAtualizarJid: function(evento) {
      this.jid = this.$el.find('input#entrada-jid').val();
    },

    aoEscreverAtualizarSenha: function(evento) {
      this.senha = this.$el.find('input#entrada-senha').val();
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
      this.$el.find('input#entrada-jid').val('');
      this.$el.find('input#entrada-senha').val('');
    }

  });

  return VisaoDeEntrada;
});