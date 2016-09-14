
define([
  "aplicativo"
, "backbone"
, "modulos/funcao/roteador/rotas"
, "modelos/funcao/funcao"
, "colecoes/funcoes/funcoes"
, "paginacoes/funcoes/funcoes"
], function (
  aplicativo
, Backbone
, Rotas
, ModeloDeFuncao
, ColecaoDeFuncao
, PaginacaoDeFuncao
) {
  'use strict';

  // Aqui nós carregamos tudo que for necessário para este modulo.

  var Funcao = aplicativo.modulo("Funcao");

  Funcao.Modelo = new ModeloDeFuncao({});

  //Funcao.Lista = new ColecaoDeFuncao({});

  //Funcao.Paginacao = PaginacaoDeFuncao;
 
  return Funcao;
});