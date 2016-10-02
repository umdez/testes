/* Agrupa todas as URLs das rotas dos modelos e também do roteador. */

define([ 
  'underscore'
, 'urls/configuracao'
, 'urls/funcoes'
, 'urls/grupos'
, 'urls/escopos'
, 'urls/usuarios'
, 'urls/contas'
], function(
  _
, configuracao
, funcoes
, grupos
, escopos
, usuarios
, contas
) {
  'use strict';

  var grupoDeUrls = { };
 
  _.extend(grupoDeUrls, funcoes);
  _.extend(grupoDeUrls, grupos);
  _.extend(grupoDeUrls, escopos);
  _.extend(grupoDeUrls, usuarios);
  _.extend(grupoDeUrls, contas);

  console.log('(urls) URLs foram todas carregadas.');

  var gerarUrl = function(tipo) {
    return grupoDeUrls[tipo] ? grupoDeUrls[tipo].apply(this, [].slice.call(arguments, 1)) : undefined;
  };

  return gerarUrl;
});