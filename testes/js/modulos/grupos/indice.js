
/* Realiza a troca de visões dos grupos do nosso painel principal.
 */

define([
  "aplicativo"
, "modulos/baseDasRotas"
, "modulos/grupos/roteador/rotas"
], function (
  aplic
, Base
, Rotas
) {
  'use strict';
 
  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/grupos/indice' });

  Registrar('BAIXO', 'Iniciando o modulo de grupos.');

  Rotas.iniciar();
});