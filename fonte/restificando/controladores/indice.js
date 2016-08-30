'use strict';

module.exports = [
  {modelo: 'Usuarios', aliase: 'Usuarios', Controlador: require('./Usuarios/Ler')}
, {modelo: 'Usuarios', aliase: 'Usuarios', Controlador: require('./Usuarios/Listar')}

, {modelo: 'Funcoes', aliase: 'Funcoes', Controlador: require('./Funcoes/Ler')}
];