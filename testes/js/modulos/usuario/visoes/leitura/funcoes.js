
define([
  'aplicativo'
, 'backbone' 
, 'handlebars'
, "modulos/visoes"
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

    opcoes: null, 

    initialize: function(opcoes) {
      _.bindAll(this, 
        'adcUmaOpcaoDeFuncao', 
        'aoSelecionarUmaOpcao', 
        'render', 
        'remUmaOpcaoDeFuncao', 
        'aoRecriar'
      ); 

      this.opcoes = opcoes;
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
      var meuObj = this;
      funcao.on('destroy', this.remUmaOpcaoDeFuncao);

      var visaoDeUmaFuncao = this.criarSubVisao({ 
        'envolucro': 'VisaoDeLeituraDeUsuario',
        'visao': 'VisaoDasFuncoes',
        'subVisao': funcao.get('id')
      }, function() {
        return new VisaoDeUmaFuncao({ 'model': funcao, 'funcao_id': meuObj.opcoes.funcao_id });
      });
      this.$el.find('select').append(visaoDeUmaFuncao.render().el); 
    },
    
    remUmaOpcaoDeFuncao: function() {
      //this.removerSubVisao({
      //  'envolucro': 'VisaoDeLeituraDeUsuario',
      //  'visao': 'VisaoDasFuncoes',
      //  'subVisao': funcao.get('id')
      //});
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
    
    opcoes: null,

    initialize: function(opcoes) {
      _.bindAll(this, 'render', 'aoRecriar');
       
      this.opcoes = opcoes;
      this.model.on('change:nome', this.render);
      this.render();
    },

    render: function() {
      // selecionamos a funcao deste usuario
      if (this.opcoes.funcao_id === this.model.get('id')){
        this.$el.prop('selected','selected');
      };
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