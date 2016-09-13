
define([
  "aplicativo"
, "backbone"
, "modulos/usuario/roteador/rotas"
, "modelos/usuario/usuario"
, "colecoes/usuarios/usuarios"
, "paginacoes/usuarios/usuarios"
, "modulos/exemplo/indice" 
, "modulos/funcao/indice" 
], function (
  aplicativo
, Backbone
, Rotas
, ModeloDeUsuario
, ColecaoDeUsuario
, PaginacaoDeUsuario
, Dependencia01
, Dependencia02
) {
  'use strict';

  // Aqui nós carregamos tudo que for necessário para este modulo.

  var Usuario = aplicativo.modulo("Usuario");

  Usuario.Modelo = new ModeloDeUsuario({});

  Usuario.Lista = new ColecaoDeUsuario({});

  //Usuario.Paginacao = new PaginacaoDeUsuario({});

  Rotas.iniciar();
 
  return Usuario;
});