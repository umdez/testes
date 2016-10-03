'use strict';

module.exports = [
  {modelo: 'Usuarios', aliase: 'Contas', Fonte: require('./contas')}
, {modelo: 'Usuarios', aliase: 'Usuarios', Fonte: require('./usuarios')} 
, {modelo: 'Funcoes', aliase: 'Funcoes', Fonte: require('./funcoes')}
, {modelo: 'Escopos', aliase: 'Escopos', Fonte: require('./escopos')}
, {modelo: 'UsuarioEndereco', aliase: 'UsuarioEndereco', Fonte: require('./enderecos/usuario')}
];