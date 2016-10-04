/* Uniao das linguas */

define([ 
  'text!linguas/localidade/pt_BR/aplic.json'
, 'text!linguas/localidade/pt_BR/base.json'
, 'text!linguas/localidade/pt_BR/grupos.json'
, 'text!linguas/localidade/pt_BR/modulo.json'
, 'text!linguas/localidade/pt_BR/usuario.json'
], function(
  aplic
, base
, grupos
, modulo
, usuario
) {
  'use strict';

  var grupoDeLinguas = { };

  _.extend(grupoDeLinguas, JSON.parse(aplic));
  _.extend(grupoDeLinguas, JSON.parse(base));
  _.extend(grupoDeLinguas, JSON.parse(grupos));
  _.extend(grupoDeLinguas, JSON.parse(modulo));
  _.extend(grupoDeLinguas, JSON.parse(usuario));
  
  return grupoDeLinguas;
});