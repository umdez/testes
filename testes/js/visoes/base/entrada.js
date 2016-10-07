
define([
  'aplicativo'
, "i18n/indice"
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

      // faz botão apresentar mensagem de entrando.
      this.$el.find('button#entrada-botao').button('loading');

      aplic.sessao.entrar({ 'jid': this.jid, 'senha': this.senha }, {
        'sucesso': function(modelo, resposta, opcoes) {
          meuObj.limparFormulario();
          meuObj.jid = meuObj.senha = null;

          // Inicia novamente a validação
          meuObj.validacao.reset();
 
          // remove mensagem de entrando do botão
          meuObj.$el.find('button#entrada-botao').button('reset');

          aplic.evts.trigger('erro-de-estatos:esconder', meuObj.$el.find('div#aviso-erro.entrada-do-painel'));

          aplic.navegar('#GrupoZero', null, null, true);
          Registrar('BAIXO', Lingua.gerar('APLIC.INFO.ENTRADA_NO_SISTEMA'));
        },
        'erro': function(xhr, err, opcoes) {

          // remove mensagem de entrando do botão
          meuObj.$el.find('button#entrada-botao').button('reset');

          meuObj.apresentarAvisoDeErro(xhr, err, 'entrarNoPainel');
          
          Registrar('ALTO', 'Erro ao tentar realizar entrada no sistema.');
        }
      }); 
    }, 

    limparFormulario: function() {
      this.$el.find('input#entrada-jid').val('');
      this.$el.find('input#entrada-senha').val('');
    },

    apresentarAvisoDeErro: function(xhr, err, acao) {
      var envolucro = 'div#aviso-erro.entrada-do-painel';

      aplic.evts.trigger('erro-de-estatos:apresentar', this.$el.find(envolucro), xhr, err, acao);
    }

  });

  return VisaoDeEntrada;
});