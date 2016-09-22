
define([
  "aplicativo"
, "backbone"
, "modulos/funcao/roteador/rotas"
, "modelos/funcao/funcao"
, "colecoes/funcoes/funcoes"
, "paginacoes/funcoes/funcoes"
], function (
  aplic
, Backbone
, Rotas
, ModeloDeFuncao
, ColecaoDeFuncao
, PaginacaoDeFuncao
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/funcao/indice' });

  // Aqui nós carregamos tudo que for necessário para este modulo.

  Registrar('BAIXO', 'Iniciando o modulo de funções.');

  var Funcao = aplic.modulo("Funcao");

  Funcao.Modelo = ModeloDeFuncao;

  Funcao.Lista = new ColecaoDeFuncao();

  //Funcao.Paginacao = PaginacaoDeFuncao;
 
  return Funcao;
});