
define([
  'aplicativo'
, "linguas/indice"
, 'parsley'
, 'text!templantes/base/entrada.html'
], function(
  aplic
, Lingua
, parsley
, Templante
) {
  'use strict';
  
  var Registrar = _.bind(aplic.registrar, { envolucro: 'visoes/base/entrada' });

  var VisaoDeEntrada = Backbone.View.extend({

    el: '#conteudo-raiz > div#entrada',

    jid: null,  
    senha: null, 

    templante: _.template(Templante),

    validacao: null,

    initialize: function () {
      Registrar('BAIXO', Lingua.gerar('BASE.INFO.INICIANDO_VISAO', {'nome': 'entrada'}));

      this.render();
    },
    
    render: function() {
      this.$el.html(this.templante());
      this.validacao = this.$el.find('form.entrada').parsley();
    },

    events: {
      'submit form.entrada': 'aoSubmeter',
      'change input#entrada-jid': 'aoEscreverAtualizarJid',
      'change input#entrada-senha': 'aoEscreverAtualizarSenha'
    },

    aoEscreverAtualizarJid: function(evento) {
      this.jid = this.$el.find('input#entrada-jid').val();
    },

    aoEscreverAtualizarSenha: function(evento) {
      this.senha = this.$el.find('input#entrada-senha').val();
    },

    aoSubmeter: function (evento) {
      evento.preventDefault();
      var meuObj = this;

      aplic.sessao.entrar({ 'jid': this.jid, 'senha': this.senha }, {
        'sucesso': function(modelo, resposta, opcoes) {
          meuObj.limparFormulario();
          meuObj.jid = meuObj.senha = null;

          // Inicia novamente a validação
          meuObj.validacao.reset();

          Registrar('BAIXO', Lingua.gerar('APLIC.INFO.ENTRADA_NO_SISTEMA'));
        },
        'erro': function(modelo, resposta, opcoes) {
          //Registrar('BAIXO', 
          //    Lingua.gerar('APLIC.ERRO.ERRO_COM_ESTATOS'
          //  , {'estatos': modelo.status, 'msg': JSON.parse(modelo.responseText).mensagem }
          //));

          Registrar('ALTO', 'Erro: ['+ modelo.status + '] ('+ JSON.parse(modelo.responseText).mensagem +')');
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