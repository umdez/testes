/* Aqui nós carregamos tudo o que for necessário para este modulo. */

define([
  "aplicativo"
, "backbone"
, "modulos/funcao/controlador/controlador"
, "modelos/funcao/funcao"
, "colecoes/funcoes/funcoes"
, "paginacoes/funcoes/funcoes"
], function (
  aplic
, Backbone
, Controlador
, ModeloDeFuncao 
, ColecaoDeFuncao
, PaginacaoDeFuncao
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/funcao/indice' });

  Registrar('BAIXO', 'Iniciando o modulo de funções.');

  var Funcao = aplic.modulo("Funcao");

  Funcao.Modelo = ModeloDeFuncao;

  Funcao.Lista = new ColecaoDeFuncao();
  
  // pegamos as funções 
  Funcao.Lista.fetch();

  //Funcao.Paginacao = PaginacaoDeFuncao;
 
  return Funcao;
});