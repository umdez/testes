/* Aqui nós carregamos tudo que for necessário para este modulo. */

define([
  "aplicativo"
, "backbone"
, "i18n/indice"
, "modulos/usuario/controlador/controlador"
, "modelos/usuario/usuario"
, "modelos/usuario/endereco"
, "colecoes/usuarios/usuarios"
, "paginacoes/usuarios/usuarios"
], function (
  aplic
, Backbone
, Lingua
, Controlador
, ModeloDeUsuario
, ModeloDeEndereco
, ColecaoDeUsuario
, PaginacaoDeUsuario
) {
  'use strict';
  
  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/usuario/indice' });

  Registrar('BAIXO', Lingua.gerar('MODULO.INFO.MODULO_INICIANDO', { 'nome': 'usuários' }));

  var Usuario = aplic.modulo("Usuario");

  Usuario['ModeloDeEndereco'] = ModeloDeEndereco;
  Usuario['ModeloDeUsuario'] = ModeloDeUsuario;
  Usuario['colecaoDeUsuario'] = new ColecaoDeUsuario();
  //Usuario.['paginacaoDeUsuario'] = new PaginacaoDeUsuario({});

  // os eventos locais deste modulo
  Usuario['evts'] = _.extend({}, Backbone.Events);

  Controlador.iniciar();
 
  return Usuario;
});