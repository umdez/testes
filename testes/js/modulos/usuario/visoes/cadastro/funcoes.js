define([
  'aplicativo'
, 'backbone' 
, "modulos/baseDasVisoes"
, 'urls'
, 'handlebars'
, 'text!modulos/usuario/templantes/cadastro/funcoes.html' 
], function(
  aplic
, Backbone
, Base
, gerarUrl
, hbs
, TemplanteFuncoes
) {
  'use strict';

  var VisaoDasFuncoes = Backbone.View.extend({

    el: 'div.grupo-um div#usuario-cadastro.conteudo-grupo-um form.cadastro-usuario div#funcoes-usuario',

    templante: hbs.compile(TemplanteFuncoes),
    
    modUsuario: aplic.modulo("Usuario"),
    modFuncao: aplic.modulo("Funcao"),

    initialize: function() {
      _.bindAll(this, 'adcUmaOpcaoDeFuncao', 'aoSelecionarUmaOpcao'); 

      this.render();
    },

    render: function() {
      this.$el.html(this.templante());

      var colecaoDeFuncoes = this.modFuncao.Lista;

      colecaoDeFuncoes.on('add', this.adcUmaOpcaoDeFuncao);

      if (colecaoDeFuncoes.length > 0) {
        _.each(colecaoDeFuncoes.models, this.adcUmaOpcaoDeFuncao);
      } else {
        colecaoDeFuncoes.fetch();
      }

      this.$el.find('select').on( "change", this.aoSelecionarUmaOpcao);
    },

    adcUmaOpcaoDeFuncao: function (funcao) {
      var visaoDeUmaFuncao = new VisaoDeUmaFuncao({ model: funcao });
      this.$el.find('select').append(visaoDeUmaFuncao.render().el); 
    },

    aoSelecionarUmaOpcao: function(evento) {
      var valorDaFuncao = $(evento.currentTarget).val();
      this.modUsuario.evts.trigger('funcao-do-usuario:selecionada', valorDaFuncao);
    }
    
  });

  var VisaoDeUmaFuncao = Backbone.View.extend({
 
    tagName:'option',
    
    initialize: function() {
      _.bindAll(this, 'render', 'remover');

      this.model.on('change:nome', this.render);
      this.model.on('destroy', this.remover);
      
      this.render();
    },

    render: function() {
      this.$el.text(this.model.get('nome'));
      return this; 
    },

    remover: function() {
      console.log('Removendo eu mesmo');
      this.undelegateEvents();
      this.remove();
      this.off();
    },
 
    attributes : function () {
      return {
        'value': this.model.get('id')
      };
    }
  });

  VisaoDeUmaFuncao = VisaoDeUmaFuncao.extend(Base);
  VisaoDasFuncoes = VisaoDasFuncoes.extend(Base);

  return VisaoDasFuncoes;
});