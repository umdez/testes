
define([
  'aplicativo'
, 'backbone' 
, 'parsley'
, 'modulos/baseDasVisoes'
, 'handlebars'
, 'text!modulos/usuario/templantes/leitura.html'
], function(
  aplic
, Backbone
, parsley
, Base
, hbs
, Templante
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/usuario/visoes/leitura' });

  var VisaoDeLeitura = Backbone.View.extend({

    tagName: "div",

    sePodeAtualizarUsuario: false,
    sePodeRemoverUsuario: false,
    
    templante: hbs.compile(Templante),

    initialize: function() {
      this.render();
    },

    render: function() {

      this.$el.html(this.templante(this.model.toJSON()));
      this.stickit();

      this.validacao = this.$el.find('form.leitura-usuario').parsley();

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

    bindings: {
      'input#jid-usuario': 'jid',
      'input#nome-usuario': 'nome'
    },

    events: {
      'submit form.leitura-usuario': 'aoClicarEmSubmeter',
      'click button#salvar-usuario': 'aoClicarEmSalvar',
      'click button#remover-usuario': 'aoClicarEmRemover',
    },

    aoClicarEmSubmeter: function(evento) {
      // Previnimos a submissão
      evento.preventDefault();
    },

    aoClicarEmSalvar: function(evento) {
      if(!this.sePodeAtualizarUsuario) {
        Registrar('BAIXO', 'Você não possui a permissão necessária para salvar os dados de usuários.');
        return;
      }

      var meuObj = this;

      this.validacao.whenValid({}).then(function() {

        meuObj.model.save().done(function(modelo, resposta, opcoes) {
          
          // Inicia novamente a validação
          meuObj.validacao.reset();
          Registrar('BAIXO', 'Dados do usuario foram salvos com sucesso');
        })
        .fail(function(modelo, resposta, opcoes) {
          Registrar('ALTO', 'Erro: ['+ modelo.status + '] ('+ JSON.parse(modelo.responseText).mensagem +')');
        }); 

      }).fail(function() {
        Registrar('BAIXO', 'É necessário informar os dados corretos para salvar.');
      });
    },

    aoClicarEmRemover: function(evento) {
      if (!this.sePodeRemoverUsuario) {
        Registrar('BAIXO', 'Você não possui a permissão necessária para remover usuários.');
        return;
      }
    },

    aoFechar: function() {
      Registrar('BAIXO', 'A visão (VisaoDeLeitura) acaba de fechar.');
      // quando fecharmos essa visão remover visões filhas?
    },

    aoRecriar: function() {
      Registrar('BAIXO', 'A visão (VisaoDeLeitura) acaba de ser recriada.');
      // remover visões filhas e recria-las?
    }
  });

  VisaoDeLeitura = VisaoDeLeitura.extend(Base);

  return VisaoDeLeitura;
});