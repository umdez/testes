
define([
  'aplicativo'
, 'backbone' 
, 'urls'
, 'text!modulos/usuario/templantes/cadastro.html'
], function(
  aplicativo
, Backbone
, URLs
, Templante
) {
  'use strict';

  var VisaoDeCadastro = Backbone.View.extend({

    tagName: "div",

    jid: null,  
    
    senha: null, 

    nome: null,

    templante: _.template(Templante),
    
    usuario: aplicativo.modulo("Usuario"),

    attributes: {
      
    },
    
    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.templante());
      return this;
    },

    events: {
      'submit form.cadastro-usuario': 'aoClicarEmCadastrar',
      'change input#jid-usuario': 'aoEscreverAtualizarJid',
      'change input#senha-usuario': 'aoEscreverAtualizarSenha',
      'change input#nome-usuario': 'aoEscreverAtualizarNome'
    },

    aoEscreverAtualizarJid: function(evento) {
      this.jid = $('input#jid-usuario').val();
    },

    aoEscreverAtualizarSenha: function(evento) {
      this.senha = $('input#senha-usuario').val();
    },

    aoEscreverAtualizarNome: function(evento) {
      this.nome = $('input#nome-usuario').val();
    },

    aoClicarEmCadastrar: function(evento) {
      evento.preventDefault();
      var usuarios = this.usuario.Lista;
      var modelo = this.usuario.Modelo;
      var usuario = new modelo({
        'jid': this.jid, 
        'nome': this.nome, 
        'senha': this.senha 
      });
      usuario.url = URLs.gerarUrl('Usuarios');

      usuario.save().done(function(modelo, resposta, opcoes) {
        usuarios.add(modelo);
        console.log('Novo usuario salvo com sucesso');
      }).fail(function(modelo, resposta, opcoes){
        console.log('Erro ao tentar salvar novo usuário.');
      });
    },
 
    onClose: function() {
      
    }
    
  });

  return VisaoDeCadastro;
});