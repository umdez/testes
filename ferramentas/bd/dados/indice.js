'use strict';

var pasta = require('path');  

module.exports = [
  {modelo: 'Usuarios', arquivo: pasta.join(__dirname, 'Usuarios.js') }
, {modelo: 'Funcoes', arquivo: pasta.join(__dirname, 'Funcoes.js') }
, {modelo: 'Escopos', arquivo: pasta.join(__dirname, 'Escopos.js') }
, {modelo: 'Projetos', arquivo: pasta.join(__dirname, 'Projetos.js') }
];