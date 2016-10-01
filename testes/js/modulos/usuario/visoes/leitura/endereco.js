/* Visão de leitura do endereço de usuários */

define([
  'aplicativo'
, 'backbone' 
, "modulos/visoes"
, 'handlebars'
, 'urls'
, 'text!modulos/usuario/templantes/leitura/endereco.html' 
], function(
  aplic
, Backbone
, Base
, hbs
, gerarUrl
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
      'input#bairro-endereco-usuario': 'bairro'
    },

    aoRecriar: function() {
      Registrar('BAIXO', 'A visão (VisaoDeEndereco) acaba de ser recriada.');
    }
    
  });
  
  return VisaoDeEndereco.extend(Base);
});