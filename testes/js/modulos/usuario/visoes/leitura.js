
define([
  'backbone' 
, 'parsley'
, 'modulos/baseDasVisoes'
, 'handlebars'
, 'text!modulos/usuario/templantes/leitura.html'
], function(
  Backbone
, parsley
, Base
, hbs
, Templante
) {
  'use strict';

  var VisaoDeLeitura = Backbone.View.extend({

    tagName: "div",

    jid: null,
    nome: null,

    sePodeAtualizarUsuario: false,
    sePodeRemoverUsuario: false,
    
    templante: hbs.compile(Templante),

    initialize: function() {
      this.render();
    },

    render: function() {

      this.$el.html(this.templante(this.model.toJSON()));
      
      this.validacao = this.$el.find('form.leitura-usuario').parsley('validate');

      this.sePodeAtualizarUsuario = this.verificarEscopo('Usuarios', "ATUALIZACAO");
      this.sePodeRemoverUsuario = this.verificarEscopo('Usuarios', "REMOCAO");

      if (this.sePodeAtualizarUsuario) {
        this.$el.find('button#salvar-usuario').prop("disabled", false); 
      }

      if (this.sePodeRemoverUsuario) {
        this.$el.find('button#remover-usuario').prop("disabled", false); 
      }
      return this;
    },

    events: {
      'submit form.leitura-usuario': 'aoClicarEmSubmeter',
      'click button#salvar-usuario': 'aoClicarEmSalvar',
      'click button#remover-usuario': 'aoClicarEmRemover',
      'change input#jid-usuario': 'aoEscreverAtualizarJid',
      'change input#nome-usuario': 'aoEscreverAtualizarNome'
    },
    
    aoEscreverAtualizarJid: function(evento) {
      this.jid = this.$el.find('input#jid-usuario').val();
    },

    aoEscreverAtualizarNome: function(evento) {
      this.nome = this.$el.find('input#nome-usuario').val();
    },

    aoClicarEmSubmeter: function(evento) {
      // Previnimos a submissão
      evento.preventDefault();
    },

    aoClicarEmSalvar: function(evento) {
      if(!this.sePodeAtualizarUsuario) return;

      var meuObj = this;

      this.validacao.whenValid({}).then(function() {
        
        // Ter certeza que possuimos os dados de entrada atuais
        meuObj.pegarEntradas();
 
        meuObj.model.set({ 
          'jid': meuObj.jid,
          'nome': meuObj.nome
        });

        meuObj.model.save().done(function(modelo, resposta, opcoes) {
          
          // Inicia novamente a validação
          meuObj.validacao.reset();

          console.log('Dados do usuario foram salvos com sucesso');
        })
        .fail(function(modelo, resposta, opcoes){
          console.log('Erro: ['+ modelo.status + '] ('+ JSON.parse(modelo.responseText).mensagem +')');
        }); 

      }).fail(function() {
        console.log('É necessário informar os dados corretos para salvar.');
      })
    },

    aoClicarEmRemover: function(evento) {
      if (!this.sePodeRemoverUsuario) return;
    },

    pegarEntradas: function() {
      this.jid = this.$el.find('input#jid-usuario').val();
      this.nome = this.$el.find('input#nome-usuario').val();
    },

    onClose: function() {
      
    }
  });

  VisaoDeLeitura = VisaoDeLeitura.extend(Base);

  return VisaoDeLeitura;
});