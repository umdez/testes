
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
  aplic
, Backbone
, Rotas
, ModeloDeUsuario
, ColecaoDeUsuario
, PaginacaoDeUsuario
, Dependencia01
, Dependencia02
) {
  'use strict';
  
  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/usuario/indice' });

  // Aqui nós carregamos tudo que for necessário para este modulo.

  Registrar('BAIXO', 'Iniciando o modulo de usuários.');

  var Usuario = aplic.modulo("Usuario");

  Usuario.Modelo = ModeloDeUsuario;

  Usuario.Lista = new ColecaoDeUsuario();

  //Usuario.Paginacao = new PaginacaoDeUsuario({});

  // eventos locais deste modulo
  Usuario.evts = _.extend({}, Backbone.Events);

  Rotas.iniciar();
 
  return Usuario;
});