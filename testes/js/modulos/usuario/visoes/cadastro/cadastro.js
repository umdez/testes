/* Visão de cadastro de usuários */

define([
  'aplicativo'
, 'backbone' 
, "modulos/visoes"
, 'urls/indice'
, 'handlebars'
, 'modulos/usuario/visoes/cadastro/endereco' 
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
       _.bindAll(this, 'aoRecriar');
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
          valuePath: 'id'
        }
      }
    },

    events: {
      'submit form.cadastro-usuario': 'aoClicarEmSubmeter',
      'click button#cadastrar-usuario': 'aoClicarEmCadastrar',
    },

    aoClicarEmCadastrar: function(evento) {
      var meuObj = this;
      var usuarios = this.modUsuario.Lista;
      var usuario = meuObj.model;
      var endereco = usuario.get('UsuarioEndereco');

      this.validacao.whenValid({}).then(function() {
        usuario.url = gerarUrl('Usuarios');

        usuario.save().done(function(modelo, resposta, opcoes) {
          usuarios.add(usuario);

          endereco.set({'usuario_id': usuario.get('id')});
          endereco.url = gerarUrl('UsuarioEnderecos');

          endereco.save().done(function(modelo, resposta, opcoes) {
            
            // Navega para visão de leitura
            aplic.navegar('#UsuariosLeitura', usuario.get('id'), true); 

            Registrar('BAIXO', 'Novo endereco cadastrado com sucesso');
          })
          .fail(function(modelo, resposta, opcoes) {
            Registrar('ALTO', 'Erro: ['+ modelo.status + '] ('+ JSON.parse(modelo.responseText).mensagem +')');
          });
          
          Registrar('BAIXO', 'Novo usuario cadastrado com sucesso');
        })
        .fail(function(modelo, resposta, opcoes) {
          Registrar('ALTO', 'Erro: ['+ modelo.status + '] ('+ JSON.parse(modelo.responseText).mensagem +')');
        }); 
      }).fail(function() {
        Registrar('BAIXO', 'É necessário informar os dados corretos para realizar o cadastro.');
      });
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