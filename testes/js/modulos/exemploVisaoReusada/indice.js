/* Aqui nós carregamos tudo que for necessário para este modulo. */

define([
  "aplicativo"
, "backbone"
, "modulos/exemploVisaoReusada/controlador/controlador"
], function (
  aplic
, Backbone
, Controlador
) {
  'use strict';
  
  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/exemploVisaoReusada/indice' });

  Registrar('BAIXO', 'Iniciando o modulo de exemploVisaoReusada.');

  Controlador.iniciar();
});