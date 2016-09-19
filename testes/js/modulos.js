
define([ 
  "modulos/grupos/indice"
, "modulos/usuario/indice"
, "modulos/exemplo/indice"
, "modulos/funcao/indice"
], function(
  ModuloDosGrupos
, ModuloDeUsuario
, ModuloDeExemplo
, ModuloDeFuncao
) {
  'use strict';
 
  var modulos = {
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
    'grupoUm': modulos.grupoUm,
    'grupoDois': modulos.grupoDois,
    'grupoTres': modulos.grupoTres
  }
});