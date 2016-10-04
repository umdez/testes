/* Aqui nós carregamos tudo que for necessário para este modulo. */

define([
  "aplicativo"
, "backbone"
, "modulos/usuario/controlador/controlador"
, "modelos/usuario/usuario"
, "modelos/usuario/endereco"
, "colecoes/usuarios/usuarios"
, "paginacoes/usuarios/usuarios"
], function (
  aplic
, Backbone
, Controlador
, ModeloDeUsuario
, ModeloDeEndereco
, ColecaoDeUsuario
, PaginacaoDeUsuario
) {
  'use strict';
  
  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/usuario/indice' });

  Registrar('BAIXO', 'Iniciando o modulo de usuários.');

  var Usuario = aplic.modulo("Usuario");

  Usuario.ModeloDeEndereco = ModeloDeEndereco;

  Usuario.Modelo = ModeloDeUsuario;

  Usuario.Lista = new ColecaoDeUsuario();

  //Usuario.Paginacao = new PaginacaoDeUsuario({});

  // eventos locais deste modulo
  Usuario.evts = _.extend({}, Backbone.Events);

  Controlador.iniciar();
 
  return Usuario;
});