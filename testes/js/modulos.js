
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
 
  var modulos = {
    principal: [
      { 'id': 'usuario-cadastro'},
      { 'id': 'usuario-pesquisa'},
      { 'id': 'usuario-leitura'}
    ],
    grupoUm: [
      { 'id': 'usuario-cadastro'},
      { 'id': 'usuario-pesquisa'},
      { 'id': 'usuario-leitura'}
    ],
    grupoDois: [

    ],
    grupoTres: [

    ]
  };

  return {
    'modulos': modulos.principal,
    'grupoUm': modulos.grupoUm,
    'grupoDois': modulos.grupoDois,
    'grupoTres': modulos.grupoTres
  }
});