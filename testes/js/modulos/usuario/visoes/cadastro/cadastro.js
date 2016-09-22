
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

    jid: null,  
    senha: null, 
    nome: null,
    funcao_id: null, 

    templante: hbs.compile(TemplanteCadastro), 
    
    modUsuario: aplic.modulo("Usuario"),

    validacao: null,

    initialize: function() {
      _.bindAll(this, 'aoSelecionarUmaFuncaoDeUsuario');

      this.listenTo(this.modUsuario.evts, 'funcao-do-usuario:selecionada', this.aoSelecionarUmaFuncaoDeUsuario);
      this.render();
    },

    render: function() {
      this.$el.html(this.templante({}));
      this.validacao = this.$el.find('form.cadastro-usuario').parsley();

      this.visaoDasFuncoes = this.reusarVisao("VisaoDeFuncaoDoCadastroDeUsuarios", function() {
        return new VisaoDasFuncoes({});
      });
    },

    events: {
      'submit form.cadastro-usuario': 'aoClicarEmSubmeter',
      'click button#cadastrar-usuario': 'aoClicarEmCadastrar',
      'change input#jid-usuario': 'aoEscreverAtualizarJid',
      'change input#senha-usuario': 'aoEscreverAtualizarSenha',
      'change input#nome-usuario': 'aoEscreverAtualizarNome'
    },

    aoSelecionarUmaFuncaoDeUsuario: function(valorDaFuncao) {
      this.funcao_id = valorDaFuncao;
    },

    aoEscreverAtualizarJid: function(evento) {
      this.jid = this.$el.find('input#jid-usuario').val();
    },

    aoEscreverAtualizarSenha: function(evento) {
      this.senha = this.$el.find('input#senha-usuario').val();
    },

    aoEscreverAtualizarNome: function(evento) {
      this.nome = this.$el.find('input#nome-usuario').val();
    },

    aoClicarEmCadastrar: function(evento) {
      
      var meuObj = this;
      var usuarios = this.modUsuario.Lista;
      var Modelo = this.modUsuario.Modelo;

      this.validacao.whenValid({}).then(function() {

        var usuario = new Modelo({
          'jid': meuObj.jid, 
          'nome': meuObj.nome, 
          'senha': meuObj.senha,
          'funcao_id': meuObj.funcao_id
        });
        usuario.url = gerarUrl('Usuarios');

        usuario.save().done(function(modelo, resposta, opcoes) {
          usuarios.add(modelo);

          meuObj.limparFormulario();

          // Navega para visão de leitura
          aplic.roteador.navigate(gerarUrl('#Usuario', modelo.id), true);
          
          // Inicia novamente a validação
          meuObj.validacao.reset();
          
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
      this.jid = this.senha = this.nome = null;
    
      this.$el.find('input#jid-usuario').val('');
      this.$el.find('input#senha-usuario').val('');
      this.$el.find('input#nome-usuario').val('');
    }
    
  });

  VisaoDeCadastro = VisaoDeCadastro.extend(Base);

  return VisaoDeCadastro;
});