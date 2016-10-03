'use strict';

module.exports = [
  {modelo: 'Usuarios', aliase: 'Usuarios', Controlador: require('./Usuarios/Ler')}
, {modelo: 'Usuarios', aliase: 'Usuarios', Controlador: require('./Usuarios/Listar')}

, {modelo: 'UsuarioEndereco', aliase: 'UsuarioEndereco', Controlador: require('./Enderecos/usuarios/Ler')}

, {modelo: 'Funcoes', aliase: 'Funcoes', Controlador: require('./Funcoes/Ler')}
];