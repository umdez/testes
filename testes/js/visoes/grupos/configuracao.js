
define([ 
  "aplicativo"
], function(
  aplic
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'visoes/grupos/configuracao' });
 
  Registrar('BAIXO', 'As configurações dos grupos foram todos carregadas.');

  var configuracao = {
    
    grupoZero: [
      
    ],
    grupoUm: [
      { 'id': 'usuario-cadastro'},
      { 'id': 'usuario-pesquisa'},
      { 'id': 'usuario-leitura'},
      { 'id': 'visao-reusada-exemplo'}
    ],
    grupoDois: [

    ],
    grupoTres: [

    ]
  };

  return {
    'grupoZero': configuracao.grupoZero,
    'grupoUm': configuracao.grupoUm,
    'grupoDois': configuracao.grupoDois,
    'grupoTres': configuracao.grupoTres
  }
});