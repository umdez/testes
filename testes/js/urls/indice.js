/* Agrupa todas as URLs das rotas dos modelos e também do roteador. */

define([ 
  'underscore'
, './configuracao'
, './funcoes'
, './grupos'
, './escopos'
, './usuarios'
, './contas'
, './exemplos'
], function(
  _
, configuracao
, funcoes
, grupos
, escopos
, usuarios
, contas
, exemplos
) {
  'use strict';

  var grupoDeUrls = { };
 
  _.extend(grupoDeUrls, funcoes);
  _.extend(grupoDeUrls, grupos);
  _.extend(grupoDeUrls, escopos);
  _.extend(grupoDeUrls, usuarios);
  _.extend(grupoDeUrls, contas);
  _.extend(grupoDeUrls, exemplos);

  console.log('(urls) URLs foram todas carregadas.');

  var gerarUrl = function(tipo) {
    return grupoDeUrls[tipo] ? grupoDeUrls[tipo].apply(this, [].slice.call(arguments, 1)) : undefined;
  };

  return gerarUrl;
});