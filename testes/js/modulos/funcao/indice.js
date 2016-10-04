/* Aqui nós carregamos tudo o que for necessário para este modulo. */

define([
  "aplicativo"
, "backbone"
, "linguas/indice"
, "modulos/funcao/controlador/controlador"
, "modelos/funcao/funcao"
, "colecoes/funcoes/funcoes"
, "paginacoes/funcoes/funcoes"
], function (
  aplic
, Backbone
, Lingua
, Controlador
, ModeloDeFuncao 
, ColecaoDeFuncao
, PaginacaoDeFuncao
) {
  'use strict';
 
  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/funcao/indice' });

  Registrar('BAIXO', Lingua.gerar('MODULO.INFO.MODULO_INICIANDO', { 'nome': 'funções' }));

  var Funcao = aplic.modulo("Funcao");

  Funcao['ModeloDeFuncao'] = ModeloDeFuncao;
  Funcao['colecaoDeFuncao'] = new ColecaoDeFuncao();
  //Funcao['PaginacaoDeFuncao'] = PaginacaoDeFuncao;

  // pegamos as funções 
  Funcao['colecaoDeFuncao'].fetch();
 
  return Funcao;
});