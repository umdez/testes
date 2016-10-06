/* Visão de leitura do endereço de usuários */

define([
  'aplicativo'
, 'backbone' 
, 'i18n/indice'
, "modulos/visoes"
, 'handlebars'
, 'text!modulos/usuario/templantes/leitura/endereco.html' 
], function(
  aplic
, Backbone
, Lingua
, Base
, hbs
, TemplanteEndereco
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/usuario/visoes/leitura/endereco' });

  var VisaoDeEndereco = Backbone.View.extend({
    tagName: "div",

    templante: hbs.compile(TemplanteEndereco), 

    initialize: function() {
       _.bindAll(this, 'aoRecriar');
    },

    render: function() { 
      this.$el.html(this.templante({}));
      this.stickit();
      return this;
    },

    bindings: {
      'input#logradouro-endereco-usuario': 'logradouro',
      'input#bairro-endereco-usuario': 'bairro',
      'input#complemento-endereco-usuario': 'complemento',
      'input#numero-endereco-usuario': 'numero',
      'input#cidade-endereco-usuario': 'cidade'
    },

    aoRecriar: function() {
      Registrar('BAIXO', Lingua.gerar('VISAO_MODULO.INFO.AO_RECRIAR', { 'nome': 'VisaoDeEndereco' }));
    },

    aoFechar: function() {
      Registrar('BAIXO', Lingua.gerar('VISAO_MODULO.INFO.AO_FECHAR', { 'nome': 'VisaoDeEndereco' }));
    }
    
  });
  
  return VisaoDeEndereco.extend(Base);
});