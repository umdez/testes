
define([ 
  "aplicativo"
], function(
  aplic
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulosConfig' });
 
  Registrar('BAIXO', 'As configurações dos modulos foram todos carregadas.');

  var modulosConfig = {
    
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
    'grupoUm': modulosConfig.grupoUm,
    'grupoDois': modulosConfig.grupoDois,
    'grupoTres': modulosConfig.grupoTres
  }
});