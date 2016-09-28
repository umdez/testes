
define([
  'aplicativo'
, 'backbone' 
, 'modulos/visoes'
, 'handlebars'
, 'modulos/usuario/visoes/leitura/funcoes'
, 'text!modulos/usuario/templantes/leitura/leitura.html'
], function(
  aplic
, Backbone
, Base
, hbs
, VisaoDasFuncoes
, Templante
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/usuario/visoes/leitura' });

  var VisaoDeLeitura = Backbone.View.extend({

    tagName: "div",

    visaoDasFuncoes: null,

    funcao_id: null, 

    sePodeAtualizarUsuario: false,
    sePodeRemoverUsuario: false,
    
    templante: hbs.compile(Templante),

    modUsuario: aplic.modulo("Usuario"),

    initialize: function() {
      _.bindAll(this, 'aoSelecionarUmaOpcaoDeFuncao', 'aoRecriar');

      this.listenTo(this.modUsuario.evts, 'funcao-do-usuario-leitura:selecionada', this.aoSelecionarUmaOpcaoDeFuncao);
    },

    render: function() {
      var meuObj = this;

      this.$el.html(this.templante(this.model.toJSON()));
      this.stickit();

      this.validacao = this.$el.find('form.leitura-usuario').parsley();

      this.sePodeAtualizarUsuario = this.verificarEscopo('Usuarios', "ATUALIZACAO");
      //this.sePodeRemoverUsuario = this.verificarEscopo('Usuarios', "REMOCAO");

      if (this.sePodeAtualizarUsuario) {
        this.$el.find('button#salvar-usuario').prop("disabled", false); 
      }

      //if (this.sePodeRemoverUsuario) {
      //  this.$el.find('button#remover-usuario').prop("disabled", false); 
      //}
      
      this.visaoDasFuncoes = this.criarVisao("VisaoDeLeituraDeUsuario", "VisaoDasFuncoes", function() {
        return new VisaoDasFuncoes({'funcao_id': meuObj.model.get('funcao_id')});
      });
      this.$el.find('form.leitura-usuario div#funcoes-usuario').html(this.visaoDasFuncoes.render().el);
 
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

    aoSelecionarUmaOpcaoDeFuncao: function(valorDaFuncao) {
      this.funcao_id = valorDaFuncao;
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
 
        meuObj.model.set({'funcao_id': meuObj.funcao_id });
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
      //if (!this.sePodeRemoverUsuario) {
      //  Registrar('BAIXO', 'Você não possui a permissão necessária para remover usuários.');
      //  return;
      //}
    },

    aoRecriar: function() {
      Registrar('BAIXO', 'A visão (VisaoDeLeitura) acaba de ser recriada.');
    }
  });

  VisaoDeLeitura = VisaoDeLeitura.extend(Base);

  return VisaoDeLeitura;
});