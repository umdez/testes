
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

  Funcao.Modelo = ModeloDeFuncao;

  Funcao.Lista = ColecaoDeFuncao;

  Funcao.Paginacao = PaginacaoDeFuncao;

  aplicativo.adcRota("Funcao", function(id){
   
  });
 
  return Funcao;
});