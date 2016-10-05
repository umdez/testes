/* Uniao das linguas */

define([ 
  'text!i18n/localidade/pt_BR/aplic.json'
, 'text!i18n/localidade/pt_BR/base.json'
, 'text!i18n/localidade/pt_BR/grupos.json'
, 'text!i18n/localidade/pt_BR/modulo.json'
, 'text!i18n/localidade/pt_BR/usuario.json'
, 'text!i18n/localidade/pt_BR/controlador.json'
], function(
  aplic
, base
, grupos
, modulo
, usuario
, controlador
) {
  'use strict';

  var grupoDeLinguas = { };

  _.extend(grupoDeLinguas, JSON.parse(aplic));
  _.extend(grupoDeLinguas, JSON.parse(base));
  _.extend(grupoDeLinguas, JSON.parse(grupos));
  _.extend(grupoDeLinguas, JSON.parse(modulo));
  _.extend(grupoDeLinguas, JSON.parse(usuario));
  _.extend(grupoDeLinguas, JSON.parse(controlador));
  
  return grupoDeLinguas;
});