
define([
  'aplicativo'
, 'backbone' 
, 'modulos/visoes'
, 'handlebars'
, 'text!modulos/usuario/templantes/leitura/leitura.html'
], function(
  aplic
, Backbone
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

    modUsuario: aplic.modulo("Usuario"),
    modFuncao: aplic.modulo("Funcao"),

    initialize: function() {
      _.bindAll(this, 'aoRecriar');
    },

    render: function() {
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
      return this;
    },

    bindings: {
      'input#jid-usuario': 'jid',
      'input#nome-usuario': 'nome',
      'input#sobrenome-usuario': 'sobrenome',
      'select#funcao-usuario': {
        observe: 'funcao_id',
        selectOptions: {
          collection: 'this.modFuncao.Lista',
          labelPath: 'nome',
          valuePath: 'id'
        }
      }
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
      //if (!this.sePodeRemoverUsuario) {
      //  Registrar('BAIXO', 'Você não possui a permissão necessária para remover usuários.');
      //  return;
      //}
    },

    aoRecriar: function() {
      Registrar('BAIXO', 'A visão (VisaoDeLeitura) acaba de ser recriada.');
    }
  });

  return VisaoDeLeitura.extend(Base);
});