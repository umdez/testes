
define([
  'aplicativo'
, 'backbone' 
, 'modulos/visoes'
, 'urls/indice'
, 'handlebars'
, './endereco'
, 'text!modulos/usuario/templantes/leitura/leitura.html'
], function(
  aplic
, Backbone
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
        Registrar('BAIXO', 'Você não possui a permissão necessária para salvar os dados de usuários.');
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
          meuObj.carregarFuncao({}, usuario, funcao, { 'sucesso': function() {} }),
          meuObj.salvarUsuario(usuario, colecaoDeUsuarios, { 'sucesso': function() {} }),
          meuObj.salvarEndereco(usuario, endereco, { 'sucesso': function() {} })
        ];

        Registrar('BAIXO', 'Salvando dos dados do usuário ('+ usuario.get('nome') +').');

        meuObj.executarAcoes(acoes, function() {
          Registrar('BAIXO', 'Todas as etapas de salvamento foram bem sucedidas.');
          
          // Inicia novamente a validação
          meuObj.validacao.reset();
        });

      }).fail(function() {
        Registrar('BAIXO', 'É necessário informar os dados corretos para salvar.');
      });

    },

    carregarFuncao: function(dados, usuario, funcao, cd) {
      return function(proximo) { 
        // Inicialmente requisitaremos a nossa função
        funcao.url = gerarUrl('Funcao', usuario.get("funcao_id"));
        funcao.fetch().done(function(modelo, resposta, opcoes) {
          usuario.set({'Funcoes': funcao });
          Registrar('BAIXO', 'Dados da função do usuario foram carregados com sucesso');
          if ('sucesso' in cd) cd.sucesso();
          proximo(dados);
        })
        .fail(this.suporteDeFalhas);
      };
    },

    salvarUsuario: function(usuario, colecaoDeUsuarios, cd) {
      return function(proximo, dados) { 
        usuario.url = gerarUrl('Usuario', usuario.get('id'));
        // Salvamos este usuário
        usuario.save().done(function(modelo, resposta, opcoes) {
          colecaoDeUsuarios.add(usuario, {merge: true});
          Registrar('BAIXO', 'Dados do usuario foram salvos com sucesso');
          if ('sucesso' in cd) cd.sucesso();
          proximo(dados);
        })
        .fail(this.suporteDeFalhas);
      };
    },

    salvarEndereco: function(usuario, endereco, cd) {
      return function(proximo, dados) {
        // Salvamos o endereço deste usuário.
        endereco.url = gerarUrl('UsuarioEndereco', endereco.get('id'));
        endereco.save().done(function(modelo, resposta, opcoes) {
          Registrar('BAIXO', 'Dados do endereço do usuario foram salvos com sucesso');
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