
define([
  'aplicativo'
, 'backbone' 
, "modulos/baseDasVisoes"
, 'urls'
, 'parsley'
, 'text!modulos/usuario/templantes/cadastro.html'
], function(
  aplicativo
, Backbone
, Base
, URLs
, parsley
, Templante
) {
  'use strict';

  var VisaoDeCadastro = Backbone.View.extend({

    el: 'div#usuario-cadastro.conteudo-painel',

    jid: null,  
    senha: null, 
    nome: null,

    templante: _.template(Templante),
    
    modUsuario: aplicativo.modulo("Usuario"),
    
    validacao: null,

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.templante());
      this.validacao = this.$el.find('form.cadastro-usuario').parsley('validate');
    },

    events: {
      'submit form.cadastro-usuario': 'aoClicarEmSubmeter',
      'click button#cadastrar-usuario': 'aoClicarEmCadastrar',
      'change input#jid-usuario': 'aoEscreverAtualizarJid',
      'change input#senha-usuario': 'aoEscreverAtualizarSenha',
      'change input#nome-usuario': 'aoEscreverAtualizarNome'
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
          'senha': meuObj.senha 
        });
        usuario.url = URLs.gerarUrl('Usuarios');

        usuario.save().done(function(modelo, resposta, opcoes) {
          usuarios.add(modelo);

          meuObj.limparFormulario();

          // Navega para visão de leitura
          aplicativo.roteador.navigate(URLs.gerarUrl('#Usuario', modelo.id), true);
          
          // Inicia novamente a validação
          meuObj.validacao.reset();
          
          console.log('Novo usuario salvo com sucesso');
        }).fail(function(modelo, resposta, opcoes) {
          console.log('Erro: ['+ modelo.status + '] ('+ JSON.parse(modelo.responseText).mensagem +')');
        });

      }).fail(function(){
        console.log('É necessário informar os dados corretos para realizar o cadastro.');
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