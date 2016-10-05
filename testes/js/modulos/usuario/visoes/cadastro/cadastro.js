/* Visão de cadastro de usuários */

define([
  'aplicativo'
, 'backbone' 
, 'i18n/indice'
, "modulos/visoes"
, 'urls/indice'
, 'handlebars'
, './endereco' 
, 'text!modulos/usuario/templantes/cadastro/cadastro.html' 
], function(
  aplic
, Backbone
, Lingua
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
 
      var endereco = new this.modUsuario['ModeloDeEndereco']({});
      this.visaoDeEndereco = this.criarVisao("VisaoDeCadastro", "VisaoDeEndereco", function() {
        return new VisaoDeEndereco({ 'model': endereco });
      });
      this.model.set({'UsuarioEndereco': endereco}); 
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
          collection: 'this.modFuncao.colecaoDeFuncao',
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
      'submit form.cadastro-usuario': 'aoSubmeter',
      'click button#cadastrar-usuario': 'aoClicarEmCadastrar',
    },
    
    aoClicarEmCadastrar: function(evento) {
      var meuObj = this;
      var colecaoDeUsuarios = this.modUsuario['colecaoDeUsuario'];
      var usuario = this.model;
      var endereco = usuario.get('UsuarioEndereco');

      this.validacao.whenValid({}).then(function() {
        
        var acoes = [ 
          meuObj.cadastrarUsuario({}, colecaoDeUsuarios, usuario, { 'sucesso': function() {
            Registrar('BAIXO', Lingua.gerar('USUARIO.INFO.CADASTRO_REALIZADO', { 
              'nome': usuario.get('nome') 
            }));
          }}),
          meuObj.cadastrarEndereco(usuario, endereco, { 'sucesso': function() {
            Registrar('BAIXO', Lingua.gerar('USUARIO.INFO.CADASTRO_ENDERECO_REALIZADO', { 
              'nome': usuario.get('nome') 
            }));
          }})
        ];

        meuObj.executarAcoes(acoes, function(){
          Registrar('BAIXO', Lingua.gerar('USUARIO.INFO.ACOES_DO_CADASTRO_REALIZADO', { 
            'nome': usuario.get('nome') 
          }));
          
          // após cadastrar tudo nós navegamos para visão de leitura
          aplic.navegar('#UsuariosLeitura', usuario.get('id'), null, true); 
        });

      }).fail(function() {
        Registrar('BAIXO', Lingua.gerar('USUARIO.INFO.DADOS_DE_CADASTRO_INCORRETOS'));
      });
    },

    cadastrarUsuario: function(dados, colecaoDeUsuarios, usuario, cd) {
      return function(proximo) { 
        usuario.url = gerarUrl('Usuarios');

        usuario.save().done(function(modelo, resposta, opcoes) {
          colecaoDeUsuarios.add(usuario);
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
          usuario.set('UsuarioEndereco', endereco, { merge: true, add: true } );
          if ('sucesso' in cd) cd.sucesso();
          proximo(dados);
        })
        .fail(this.suporteDeFalhas); 
      };
    },

    suporteDeFalhas: function(modelo, resposta, opcoes) {
      Registrar('ALTO', 'Erro: ['+ modelo.status + '] ('+ JSON.parse(modelo.responseText).mensagem +')');
    },

    aoSubmeter: function(evento) {
      // Previnimos a submissão
      evento.preventDefault();
    },

    aoRecriar: function() {
      Registrar('BAIXO', Lingua.gerar('VISAO.INFO.AO_RECRIAR', { 'nome': 'VisaoDeCadastro' }));
    },

    aoFechar: function() {
      Registrar('BAIXO', Lingua.gerar('VISAO.INFO.AO_FECHAR', { 'nome': 'VisaoDeCadastro' }));
    }
    
  });
  
  return VisaoDeCadastro.extend(Base);
});