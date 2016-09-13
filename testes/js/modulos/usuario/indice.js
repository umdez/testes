
define([
  "aplicativo"
, "backbone"
, "modulos/usuario/roteador/rotas"
, "modelos/usuario/usuario"
, "colecoes/usuarios/usuarios"
, "paginacoes/usuarios/usuarios"
, "modulos/exemplo/indice"  
], function (
  aplicativo
, Backbone
, Rotas
, ModeloDeUsuario
, ColecaoDeUsuario
, PaginacaoDeUsuario
, Dependencia01
) {
  'use strict';

  // Aqui nós carregamos tudo que for necessário para este modulo.

  var Usuario = aplicativo.modulo("Usuario");

  Usuario.Modelo = ModeloDeUsuario;

  Usuario.Lista = ColecaoDeUsuario;

  Usuario.Paginacao = PaginacaoDeUsuario;

  aplicativo.adcRota("Usuario", function(id){
   
  });
 
  return Usuario;
});