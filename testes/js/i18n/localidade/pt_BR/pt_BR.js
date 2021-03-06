/* Uniao das linguas */

define([ 
  'text!i18n/localidade/pt_BR/aplic.json'
, 'text!i18n/localidade/pt_BR/base.json'
, 'text!i18n/localidade/pt_BR/grupos.json'
, 'text!i18n/localidade/pt_BR/modulo.json'
, 'text!i18n/localidade/pt_BR/modulos/usuario.json'
, 'text!i18n/localidade/pt_BR/nucleo.json'
, 'text!i18n/localidade/pt_BR/erros/erros.json'
], function(
  aplic
, base
, grupos
, modulo
, moduloUsuario
, nucleo
, erros
) {
  'use strict';

  var grupoDeLinguas = { };

  _.extend(grupoDeLinguas, JSON.parse(aplic));
  _.extend(grupoDeLinguas, JSON.parse(base));
  _.extend(grupoDeLinguas, JSON.parse(grupos));
  _.extend(grupoDeLinguas, JSON.parse(modulo));
  _.extend(grupoDeLinguas, JSON.parse(moduloUsuario));
  _.extend(grupoDeLinguas, JSON.parse(nucleo));
  _.extend(grupoDeLinguas, JSON.parse(erros));

  return grupoDeLinguas;
});