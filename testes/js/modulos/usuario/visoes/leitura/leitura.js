
define([
  'aplicativo'
, 'backbone' 
, 'i18n/indice'
, 'modulos/visoes'
, 'urls/indice'
, 'handlebars'
, './endereco'
, 'text!modulos/usuario/templantes/leitura/leitura.html'
], function(
  aplic
, Backbone
, Lingua
, Base
, gerarUrl
, hbs
, VisaoDeEndereco
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

    visaoDeEndereco: null,

    initialize: function() {
      _.bindAll(this, 
        'aoRecriar'
      , 'carregarFuncao'
      , 'salvarUsuario'
      , 'salvarEndereco'
      );
    },

    render: function() {
      this.$el.html(this.templante(this.model.toJSON()));
      this.stickit();

      this.sePodeAtualizarUsuario = this.verificarEscopo('Usuarios', "ATUALIZACAO");
      //this.sePodeRemoverUsuario = this.verificarEscopo('Usuarios', "REMOCAO");

      if (this.sePodeAtualizarUsuario) {
        this.$el.find('button#salvar-usuario').prop("disabled", false); 
      }

      var endereco = this.model.get('UsuarioEndereco');      
      this.visaoDeEndereco = this.criarVisao("VisaoDeCadastro", "VisaoDeEndereco", function() {
        return new VisaoDeEndereco({ 'model': endereco });
      });
      this.$el.find('div#acondicionar-endereco-usuario').html(this.visaoDeEndereco.render().el);

      // depois de preencher toda a visão dai nós vamos iniciar a validação
      this.validacao = this.$el.find('form.leitura-usuario').parsley();

      return this;
    },

    bindings: {
      'input#jid-usuario': 'jid',
      'input#nome-usuario': 'nome',
      'input#sobrenome-usuario': 'sobrenome',
      'select#funcao-usuario': {
        observe: 'funcao_id',
        selectOptions: {
          collection: 'this.modFuncao.colecaoDeFuncao',
          labelPath: 'nome',
          valuePath: 'id'
        }
      }
    },

    events: {
      'submit form.leitura-usuario': 'aoSubmeter',
      'click button#salvar-usuario': 'aoClicarEmSalvar',
      'click button#remover-usuario': 'aoClicarEmRemover',
    },

    aoClicarEmSalvar: function(evento) {
      if(!this.sePodeAtualizarUsuario) {
        Registrar('BAIXO', Lingua.gerar('VISAO.INFO.NAO_POSSUI_A_PERMISSAO_NECESSARIA'));
        return;
      }

      var meuObj = this;
      var colecaoDeUsuarios = this.modUsuario['colecaoDeUsuario'];
      var usuario = this.model;
      var endereco = usuario.get('UsuarioEndereco');
      var ModeloDeFuncao = this.modFuncao['ModeloDeFuncao'];
      var funcao = ModeloDeFuncao.findOrCreate({'id': usuario.get("funcao_id")});

      this.validacao.whenValid({}).then(function() {
        
        var acoes = [ 
          meuObj.carregarFuncao({}, usuario, funcao, { 'sucesso': function() {
            Registrar('BAIXO', Lingua.gerar('USUARIO.INFO.CARREGAMENTO_FUNCAO_REALIZADA'));
          }}),
          meuObj.salvarUsuario(usuario, colecaoDeUsuarios, { 'sucesso': function() {
            Registrar('BAIXO', Lingua.gerar('USUARIO.INFO.SALVAMENTO_REALIZADO'));
          }}),
          meuObj.salvarEndereco(usuario, endereco, { 'sucesso': function() {
            Registrar('BAIXO', Lingua.gerar('USUARIO.INFO.SALVAMENTO_ENDERECO_REALIZADO'));
          }})
        ];

        meuObj.executarAcoes(acoes, function() {
          Registrar('BAIXO', Lingua.gerar('USUARIO.INFO.ACOES_DE_SALVAMENTO_REALIZADAS'));

          // Inicia novamente a validação
          meuObj.validacao.reset();
        });

      }).fail(function() {
        Registrar('BAIXO', Lingua.gerar('USUARIO.INFO.DADOS_DE_SALVAMENTO_INCORRETOS'));
      });

    },

    // Precisamos requisitar a nossa função
    carregarFuncao: function(dados, usuario, funcao, cd) {
      return function(proximo) { 
        funcao.url = gerarUrl('Funcao', usuario.get("funcao_id"));
        funcao.fetch().done(function(modelo, resposta, opcoes) {
          usuario.set({'Funcoes': funcao });
          if ('sucesso' in cd) cd.sucesso();
          proximo(dados);
        })
        .fail(this.suporteDeFalhas);
      };
    },

    // Salvamos este usuário
    salvarUsuario: function(usuario, colecaoDeUsuarios, cd) {
      return function(proximo, dados) { 
        usuario.url = gerarUrl('Usuario', usuario.get('id'));
        usuario.save().done(function(modelo, resposta, opcoes) {
          colecaoDeUsuarios.add(usuario, {merge: true});
          if ('sucesso' in cd) cd.sucesso();
          proximo(dados);
        })
        .fail(this.suporteDeFalhas);
      };
    },

    // Salvamos o endereço deste usuário.
    salvarEndereco: function(usuario, endereco, cd) {
      return function(proximo, dados) {
        endereco.url = gerarUrl('UsuarioEndereco', endereco.get('id'));
        endereco.save().done(function(modelo, resposta, opcoes) {
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
    
    aoClicarEmRemover: function(evento) {
      //if (!this.sePodeRemoverUsuario) {
      //  Registrar('BAIXO', Lingua.gerar('VISAO.INFO.NAO_POSSUI_A_PERMISSAO_NECESSARIA'));
      //  return;
      //}
    },

    aoRecriar: function() {
      Registrar('BAIXO', Lingua.gerar('VISAO.INFO.AO_RECRIAR', { 'nome': 'VisaoDeLeitura' }));
    },

    aoFechar: function() {
      Registrar('BAIXO', Lingua.gerar('VISAO.INFO.AO_FECHAR', { 'nome': 'VisaoDeLeitura' }));
    }

  });

  return VisaoDeLeitura.extend(Base);
});