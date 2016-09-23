
define([
  'aplicativo'
, 'backbone' 
, "modulos/baseDasVisoes"
, 'urls'
, 'handlebars'
, 'modulos/usuario/visoes/cadastro/funcoes'
, 'text!modulos/usuario/templantes/cadastro/cadastro.html' 
], function(
  aplic
, Backbone
, Base
, gerarUrl
, hbs
, VisaoDasFuncoes
, TemplanteCadastro
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/usuario/visoes/cadastro' });

  var VisaoDeCadastro = Backbone.View.extend({

    el: 'div.grupo-um div#usuario-cadastro.conteudo-grupo-um',

    visaoDasFuncoes: null,

    funcao_id: null, 

    templante: hbs.compile(TemplanteCadastro), 
    
    modUsuario: aplic.modulo("Usuario"),

    validacao: null,

    initialize: function() {
      _.bindAll(this, 'aoSelecionarUmaOpcaoDeFuncao');

      this.listenTo(this.modUsuario.evts, 'funcao-do-usuario:selecionada', this.aoSelecionarUmaOpcaoDeFuncao);
      this.render();
    },

    render: function() {
      this.$el.html(this.templante({}));
      this.stickit();

      this.validacao = this.$el.find('form.cadastro-usuario').parsley();

      this.visaoDasFuncoes = this.reusarVisao("VisaoDeCadastroDeUsuario", "VisaoDasFuncoes", function() {
        return new VisaoDasFuncoes({});
      });
    },

    bindings: {
      'input#jid-usuario': 'jid',
      'input#nome-usuario': 'nome',
      'input#senha-usuario': 'senha'
    },

    events: {
      'submit form.cadastro-usuario': 'aoClicarEmSubmeter',
      'click button#cadastrar-usuario': 'aoClicarEmCadastrar',
    },

    aoSelecionarUmaOpcaoDeFuncao: function(valorDaFuncao) {
      this.funcao_id = valorDaFuncao;
    },

    aoClicarEmCadastrar: function(evento) {
      var meuObj = this;
      var usuarios = this.modUsuario.Lista;
      var ModUsuario = this.modUsuario.Modelo;

      this.validacao.whenValid({}).then(function() {

        meuObj.model.set({'funcao_id': meuObj.funcao_id });
        meuObj.model.url = gerarUrl('Usuarios');

        meuObj.model.save().done(function(usuario, resposta, opcoes) {
          usuarios.add(usuario);

          meuObj.limparFormulario();

          // Navega para visão de leitura
          aplic.navegar('#Usuario', usuario.id);

          // Inicia novamente a validação
          meuObj.validacao.reset();
          
          // Remove bindings deste modelo salvo
          meuObj.unstickit(meuObj.model);

          // Inicia novo modelo
          meuObj.model = new ModUsuario({});

          // Adiciona bindings para novo modelo
          meuObj.stickit(meuObj.model);

          Registrar('BAIXO', 'Novo usuario cadastrado com sucesso');
        }).fail(function(modelo, resposta, opcoes) {
          Registrar('ALTO', 'Erro: ['+ modelo.status + '] ('+ JSON.parse(modelo.responseText).mensagem +')');
        });

      }).fail(function() {
        Registrar('BAIXO', 'É necessário informar os dados corretos para realizar o cadastro.');
      })
    },

    aoClicarEmSubmeter: function(evento) {
      // Previnimos a submissão
      evento.preventDefault();
    },

    limparFormulario: function() {
      this.funcao_id = null;

      this.$el.find('input#jid-usuario').val('');
      this.$el.find('input#senha-usuario').val('');
      this.$el.find('input#nome-usuario').val('');
    },

    aoReusar: function() {

    }
    
  });

  VisaoDeCadastro = VisaoDeCadastro.extend(Base);

  return VisaoDeCadastro;
});