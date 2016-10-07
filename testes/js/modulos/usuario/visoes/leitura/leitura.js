
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
        Registrar('BAIXO', Lingua.gerar('VISAO.ALERTA.NAO_POSSUI_A_PERMISSAO_NECESSARIA'));
        return;
      }

      var meuObj = this;
      var colecaoDeUsuarios = this.modUsuario['colecaoDeUsuario'];
      var usuario = this.model;
      var endereco = usuario.get('UsuarioEndereco'); 
      var ModeloDeFuncao = this.modFuncao['ModeloDeFuncao'];
      var funcao = ModeloDeFuncao.findOrCreate({'id': usuario.get("funcao_id")});

      this.validacao.whenValid({}).then(function() {

        // esconde qualquer mensagem de erro de estatos
        aplic.evts.trigger('erro-de-estatos:esconder', meuObj.$el.find('div#aviso-erro.formulario-leitura-de-usuario'));

        // faz botão apresentar mensagem de salvando.
        meuObj.$el.find('button#salvar-usuario').button('loading');

        // NOTA: O backbone-relational parece que sempre serializa o resultado. Por causa disso, temos que
        // salvar os dados seguindo a ordem abaixo (funcao -> endereco -> usuario).
        var acoes = [ 
          meuObj.carregarFuncao({}, usuario, funcao, { 'sucesso': function() {
            Registrar('BAIXO', Lingua.gerar('USUARIO.INFO.CARREGAMENTO_FUNCAO_REALIZADA'));
          }}),
          meuObj.salvarEndereco(usuario, endereco, { 'sucesso': function() {
            Registrar('BAIXO', Lingua.gerar('USUARIO.INFO.SALVAMENTO_ENDERECO_REALIZADO'));
          }}),
          meuObj.salvarUsuario(usuario, colecaoDeUsuarios, { 'sucesso': function() {
            Registrar('BAIXO', Lingua.gerar('USUARIO.INFO.SALVAMENTO_REALIZADO'));
          }})
        ];

        meuObj.executarAcoes(acoes, function() {
          // Inicia novamente a validação
          meuObj.validacao.reset();
         
          Registrar('BAIXO', Lingua.gerar('USUARIO.INFO.ACOES_DE_SALVAMENTO_REALIZADAS'));

          meuObj.$el.find('button#salvar-usuario').button('reset');
        });

      }).fail(function() {
        Registrar('BAIXO', Lingua.gerar('VISAO_MODULO.INFO.DADOS_DO_FORMULARIO_INCORRETOS'));
      });

    },

    // Precisamos requisitar a nossa função
    carregarFuncao: function(dados, usuario, funcao, cd) {
      var meuObj = this;
      return function(proximo) { 
        funcao.url = gerarUrl('Funcao', usuario.get("funcao_id"));
        funcao.fetch().done(function(modelo, resposta, opcoes) {
          usuario.set('Funcoes', funcao, { merge: true, add: true } ); 
          if ('sucesso' in cd) cd.sucesso();
          proximo(dados);
        })
        .fail(function(xhr, err, opcoes){
          meuObj.suporteDeFalhas(xhr, err, opcoes);
        });
      };
    },

    // Salvamos este usuário
    salvarUsuario: function(usuario, colecaoDeUsuarios, cd) {
      var meuObj = this;
      return function(proximo, dados) { 
        usuario.url = gerarUrl('Usuario', usuario.get('id'));
        usuario.save().done(function(modelo, resposta, opcoes) {
          colecaoDeUsuarios.add(usuario, { merge: true });
          if ('sucesso' in cd) cd.sucesso();
          proximo(dados);
        })
        .fail(function(xhr, err, opcoes){
          meuObj.suporteDeFalhas(xhr, err, opcoes);
        });
      };
    },

    // Salvamos o endereço deste usuário.
    salvarEndereco: function(usuario, endereco, cd) {
      var meuObj = this;
      return function(proximo, dados) {
        endereco.url = gerarUrl('UsuarioEndereco', endereco.get('id'));
        endereco.save().done(function(modelo, resposta, opcoes) {
          usuario.set('UsuarioEndereco', endereco, { merge: true, add: true } );
          if ('sucesso' in cd) cd.sucesso();
          proximo(dados);
        })
        .fail(function(xhr, err, opcoes){
          meuObj.suporteDeFalhas(xhr, err, opcoes);
        });
      };
    },

    suporteDeFalhas: function(xhr, err, opcoes) {
            
      // apresenta erro dessa falha de estatos
      this.apresentarAvisoDeErro(xhr, err, 'salvarUsuario');
      
      // Inicia novamente a validação
      this.validacao.reset();

      // remove mensagem de carregando do botão
      this.$el.find('button#salvar-usuario').button('reset');

      Registrar('ALTO', 'Erro ao tentar realizar o salvamento dos dados do usuário.');
    },
 
    apresentarAvisoDeErro: function(xhr, err, acao) {
      var envolucro = 'div#aviso-erro.formulario-leitura-de-usuario';

      aplic.evts.trigger('erro-de-estatos:apresentar', this.$el.find(envolucro), xhr, err, acao);
    },

    aoSubmeter: function(evento) {
      // Previnimos a submissão
      evento.preventDefault();
    },
    
    aoClicarEmRemover: function(evento) {
      //if (!this.sePodeRemoverUsuario) {
      //  Registrar('BAIXO', Lingua.gerar('VISAO.ALERTA.NAO_POSSUI_A_PERMISSAO_NECESSARIA'));
      //  return;
      //}
    },

    aoRecriar: function() {
      Registrar('BAIXO', Lingua.gerar('VISAO_MODULO.INFO.AO_RECRIAR', { 'nome': 'VisaoDeLeitura' }));
    },

    aoFechar: function() {
      Registrar('BAIXO', Lingua.gerar('VISAO_MODULO.INFO.AO_FECHAR', { 'nome': 'VisaoDeLeitura' }));
    }

  });

  return VisaoDeLeitura.extend(Base);
});