
define([ 
  "registrador"
, "modulos/grupos/indice"
, "modulos/usuario/indice"
, "modulos/exemplo/indice"
, "modulos/funcao/indice"
], function(
  Regis
, ModuloDosGrupos
, ModuloDeUsuario
, ModuloDeExemplo
, ModuloDeFuncao
) {
  'use strict';
 
  var Registro = Regis.reg.bind({ envolucro: 'modulos' });

  Registro(Regis.BAIXO, 'Os modulos foram todos carregados.');

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