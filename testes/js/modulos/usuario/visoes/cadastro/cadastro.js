/* Visão de cadastro de usuários */

define([
  'aplicativo'
, 'backbone' 
, "modulos/visoes"
, 'urls'
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

      var meuObj = this;
      this.visaoDeEndereco = this.criarVisao("VisaoDeCadastro", "VisaoDeEndereco", function() {
        return new VisaoDeEndereco({ 'model': meuObj.model.endereco });
      });
      this.$el.find('div#capsula-endereco-usuario').html(this.visaoDeEndereco.render().el);

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

      this.validacao.whenValid({}).then(function() {
        meuObj.model.url = gerarUrl('Usuarios');

        meuObj.model.save().done(function(usuario, resposta, opcoes) {
          usuarios.add(usuario);

          //meuObj.model.endereco.url = gerarUrl('UsuarioEndereco', null, this.id);

          // Navega para visão de leitura
          aplic.navegar('#UsuariosLeitura', usuario.id, true); 

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