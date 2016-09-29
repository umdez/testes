/* Visão de cadastro do endereço de usuários */

define([
  'aplicativo'
, 'backbone' 
, "modulos/visoes"
, 'urls'
], function(
  aplic
, Backbone
, Base
, gerarUrl
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/usuario/visoes/cadastro/endereco' });

  var VisaoDeEndereco = Backbone.View.extend({
    el: 'div.grupo-um div#usuario-cadastro.conteudo-grupo-um',

    initialize: function() {
       _.bindAll(this, 'aoRecriar');
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