
define([ 
  "aplicativo"
], function(
  aplic
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'visoes/grupos/configuracao' });
 
  Registrar('BAIXO', 'As configurações dos grupos foram todos carregadas.');

  var configuracao = {
    
    'painel': {
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
    },

    'entrada': {
      grupoZero: [
      
      ],
      grupoUm: [
        
      ]
    }
    
  };

  return {
    'painel': {
      'grupoZero': configuracao.painel.grupoZero,
      'grupoUm': configuracao.painel.grupoUm,
      'grupoDois': configuracao.painel.grupoDois,
      'grupoTres': configuracao.painel.grupoTres
    },
    'entrada': {
      'grupoZero': configuracao.entrada.grupoZero,
      'grupoUm': configuracao.entrada.grupoUm
    }
  }
});