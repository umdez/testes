
define([
  'aplicativo'
, 'backbone' 
, 'handlebars'
, "modulos/baseDasVisoes"
, 'text!modulos/usuario/templantes/leitura/funcoes.html' 
], function(
  aplic
, Backbone
, hbs
, Base
, TemplanteFuncoes
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/usuario/visoes/leitura/funcoes' });

  var VisaoDasFuncoes = Backbone.View.extend({

    tagName: 'div',

    templante: hbs.compile(TemplanteFuncoes),
    
    modUsuario: aplic.modulo("Usuario"),
    modFuncao: aplic.modulo("Funcao"),

    initialize: function() {
      _.bindAll(this, 'adcUmaOpcaoDeFuncao', 'aoSelecionarUmaOpcao', 'remUmaOpcaoDeFuncao'); 

      this.render();
    },

    render: function() {
      this.$el.html(this.templante());

      var funcoes = this.modFuncao.Lista;
      funcoes.on('add', this.adcUmaOpcaoDeFuncao);

      if (funcoes.length > 0) {
        _.each(funcoes.models, this.adcUmaOpcaoDeFuncao);
      } 
      funcoes.fetch();

      this.$el.find('select').on( "change", this.aoSelecionarUmaOpcao);

      return this;
    },

    adcUmaOpcaoDeFuncao: function (funcao) {
      funcao.on('destroy', this.remUmaOpcaoDeFuncao);

      var visaoDeUmaFuncao = this.criarSubVisao({ 
        'envolucro': 'VisaoDeLeituraDeUsuario',
        'visao': 'VisaoDasFuncoes',
        'subVisao': funcao.get('id')
      }, function() {
        return new VisaoDeUmaFuncao({ 'model': funcao });
      });
      this.$el.find('select').append(visaoDeUmaFuncao.render().el); 
    },
    
    remUmaOpcaoDeFuncao: function() {
      // usar gerente de visoes para remover esta visão filha????
    },

    aoSelecionarUmaOpcao: function(evento) {
      var valorDaFuncao = $(evento.currentTarget).val();
      this.modUsuario.evts.trigger('funcao-do-usuario-leitura:selecionada', valorDaFuncao);
    },

    aoRecriar: function() {
      Registrar('BAIXO', 'A visão (VisaoDasFuncoes) acaba de ser recriada.');
    }
    
  });

  var VisaoDeUmaFuncao = Backbone.View.extend({
 
    tagName:'option',
    
    initialize: function() {
      _.bindAll(this, 'render', 'aoRecriar');

      this.model.on('change:nome', this.render);
      
      this.render();
    },

    render: function() {
      this.$el.text(this.model.get('nome'));
      return this; 
    },

    attributes : function () {
      return {
        'value': this.model.get('id')
      };
    },

    aoRecriar: function() {
      Registrar('BAIXO', 'A visão (VisaoDeUmaFuncao)['+ this.model.get('id') +'] acaba de ser recriada.');
    }
  });

  VisaoDeUmaFuncao = VisaoDeUmaFuncao.extend(Base);
  VisaoDasFuncoes = VisaoDasFuncoes.extend(Base);

  return VisaoDasFuncoes;
});