/* Visão de cadastro de usuários */

define([
  'aplicativo'
, 'backbone' 
, "modulos/visoes"
, 'urls/indice'
, 'handlebars'
, './endereco' 
, 'text!modulos/usuario/templantes/cadastro/cadastro.html' 
], function(
  aplic
, Backbone
, Base
, gerarUrl
, hbs
, VisaoDeEndereco
, TemplanteCadastro
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/usuario/visoes/cadastro/cadastro' });

  var VisaoDeCadastro = Backbone.View.extend({
    tagName: "div",

    templante: hbs.compile(TemplanteCadastro), 
    
    modUsuario: aplic.modulo("Usuario"),
    modFuncao: aplic.modulo("Funcao"),

    validacao: null,

    visaoDeEndereco: null,

    initialize: function() {
       _.bindAll(
         this
      , 'aoRecriar'
      , 'cadastrarUsuario'
      , 'cadastrarEndereco'
      , 'aoClicarEmCadastrar');
    },

    render: function() { 
      this.$el.html(this.templante({}));
      this.stickit();
 
      var modeloDeEndereco = new this.modUsuario.ModeloDeEndereco({});
      this.visaoDeEndereco = this.criarVisao("VisaoDeCadastro", "VisaoDeEndereco", function() {
        return new VisaoDeEndereco({ 'model': modeloDeEndereco });
      });
      this.model.set({'UsuarioEndereco': modeloDeEndereco});
      this.$el.find('div#acondicionar-endereco-usuario').html(this.visaoDeEndereco.render().el);

      // depois de preencher toda a visão dai nós vamos iniciar a validação
      this.validacao = this.$el.find('form.cadastro-usuario').parsley();

      return this;
    },

    bindings: {
      'input#jid-usuario': 'jid',
      'input#nome-usuario': 'nome',
      'input#sobrenome-usuario': 'sobrenome',
      'input#senha-usuario': 'senha',
      'select#funcao-usuario': {
        observe: 'funcao_id',
        selectOptions: {
          collection: 'this.modFuncao.Lista',
          labelPath: 'nome',
          valuePath: 'id',
          defaultOption: {
            label: 'Escolha uma...',
            value: null
          }
        }
      }
    },

    events: {
      'submit form.cadastro-usuario': 'aoClicarEmSubmeter',
      'click button#cadastrar-usuario': 'aoClicarEmCadastrar',
    },
    
    aoClicarEmCadastrar: function(evento) {
      var meuObj = this;
      var colecaoDeUsuarios = this.modUsuario.Lista;
      var usuario = this.model;
      var endereco = usuario.get('UsuarioEndereco');

      this.validacao.whenValid({}).then(function() {
        
        var acoes = [ 
          meuObj.cadastrarUsuario({}, colecaoDeUsuarios, usuario, { 'sucesso': function() {} }),
          meuObj.cadastrarEndereco(usuario, endereco, { 'sucesso': function() {} })
        ];

        Registrar('BAIXO', 'Cadastrando o usuário ('+ usuario.get('nome') +').');

        meuObj.executarAcoes(acoes, function(){
          Registrar('BAIXO', 'Etapas do Cadastro do usuário ('+ usuario.get('nome') +') realizadas.');
          
          // após cadastrar tudo nós navegamos para visão de leitura
          aplic.navegar('#UsuariosLeitura', usuario.get('id'), true); 
        });

      }).fail(function() {
        Registrar('BAIXO', 'É necessário informar os dados corretos para realizar o cadastro.');
      });
    },

    cadastrarUsuario: function(dados, colecaoDeUsuarios, usuario, cd) {
      return function(proximo) { 
        usuario.url = gerarUrl('Usuarios');

        usuario.save().done(function(modelo, resposta, opcoes) {
          colecaoDeUsuarios.add(usuario);
          Registrar('BAIXO', 'Novo usuario ('+ usuario.get('nome') +') foi cadastrado com sucesso');
          if ('sucesso' in cd) cd.sucesso();
          proximo(dados);
        })
        .fail(this.suporteDeFalhas); 
      };
    },

    cadastrarEndereco: function(usuario, endereco, cd) {
      return function(proximo, dados) { 
        endereco.set({'usuario_id': usuario.get('id')});
        endereco.url = gerarUrl('UsuarioEnderecos');

        endereco.save().done(function(modelo, resposta, opcoes) {
          Registrar('BAIXO', 'Novo endereco do usuário ('+ usuario.get('nome') +') cadastrado com sucesso');
          if ('sucesso' in cd) cd.sucesso();
          proximo(dados);
        })
        .fail(this.suporteDeFalhas); 
      };
    },

    suporteDeFalhas: function(modelo, resposta, opcoes) {
      Registrar('ALTO', 'Erro: ['+ modelo.status + '] ('+ JSON.parse(modelo.responseText).mensagem +')');
    },

    aoClicarEmSubmeter: function(evento) {
      // Previnimos a submissão
      evento.preventDefault();
    },

    aoRecriar: function() {
      Registrar('BAIXO', 'A visão (VisaoDeCadastro) acaba de ser recriada.');
    }
    
  });
  
  return VisaoDeCadastro.extend(Base);
});