
define([
  "aplicativo"
, "registrador"
, "backbone"
, "modulos/usuario/roteador/rotas"
, "modelos/usuario/usuario"
, "colecoes/usuarios/usuarios"
, "paginacoes/usuarios/usuarios"
, "modulos/exemplo/indice" 
, "modulos/funcao/indice" 
], function (
  aplicativo
, Regis
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

  Regis.reg(Regis.BAIXO, 'Iniciando o modulo de usuários.');

  var Usuario = aplicativo.modulo("Usuario");

  Usuario.Modelo = ModeloDeUsuario;

  Usuario.Lista = new ColecaoDeUsuario({});

  //Usuario.Paginacao = new PaginacaoDeUsuario({});

  Usuario.eventos = _.extend({}, Backbone.Events);

  Rotas.iniciar();
 
  return Usuario;
});