
define([ 
  "aplicativo"
, "modulos/grupos/indice"
, "modulos/usuario/indice"
, "modulos/exemplo/indice"
, "modulos/funcao/indice"
], function(
  aplic
, ModuloDosGrupos
, ModuloDeUsuario
, ModuloDeExemplo
, ModuloDeFuncao
) {
  'use strict';
 
  var Registrar = aplic.registrar.bind({ envolucro: 'modulos' });
 
  Registrar('BAIXO', 'Os modulos foram todos carregados.')

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