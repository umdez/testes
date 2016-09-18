
define([ 
  "modulos/usuario/indice"
, "modulos/exemplo/indice"
, "modulos/funcao/indice"
], function(
  ModuloDeUsuario
, ModuloDeExemplo
, ModuloDeFuncao
) {
  'use strict';
 
  var modulos = [
    { 'id': 'usuario-cadastro'},
    { 'id': 'usuario-pesquisa'},
    { 'id': 'usuario-leitura'}
  ];

  return modulos;
});