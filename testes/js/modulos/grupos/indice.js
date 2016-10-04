
/* Realiza a troca de visões dos grupos do nosso painel principal.
 */

define([
  "aplicativo"
, "linguas/indice"
, "modulos/grupos/controlador/controlador"
], function (
  aplic
, Lingua
, Controlador
) {
  'use strict';
 
  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/grupos/indice' });

  Registrar('BAIXO', Lingua.gerar('MODULO.INFO.MODULO_INICIANDO', { 'nome': 'grupos' }));

  Controlador.iniciar();
});