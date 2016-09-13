
define([
  "aplicativo"
], function (
  aplicativo
) {
  'use strict';

  //var $container = $('.some-container');

  var Rotas = {

    usuario: null,

    iniciar: function() {
      this.usuario = aplicativo.modulo("Usuario");

      aplicativo.adcRota("Usuarios", this.suporte.bind(this));
    },

    suporte: function(id) {
      var modelo = this.usuario.Modelo;
    
      if (id) {
        modelo.set({'id': id});
        modelo.fetch();
        console.log(modelo.get('nome'));
      } else {
        
      }
    }

  };
 
  return Rotas;
});