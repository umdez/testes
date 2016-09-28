
/* Realiza a troca de visões dos grupos do nosso painel principal.
 */

define([
  "aplicativo"
, "modulos/grupos/controlador/controlador"
], function (
  aplic
, Controlador
) {
  'use strict';
 
  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/grupos/indice' });

  Registrar('BAIXO', 'Iniciando o modulo de grupos.');

  Controlador.iniciar();
});