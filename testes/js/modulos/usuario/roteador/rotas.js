
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
      var nome = 'Usuarios';  // Mesmo nome da tabela.
      var sePermitido = 0;

      if (id && id > 0) {
        // Leitura de um item em específico
        aplicativo.escopos.verificarPermissao(nome, "LEITURA", function(sePermitido) {
          if (sePermitido) {
            modelo.set({'id': id});
            modelo.fetch();
            console.log(modelo.get('nome'));

            var sePossui = aplicativo.escopos.verificarEscopo(nome, "ATUALIZACAO");
            //console.log('wow '+ sePossui);
          }
        });
      } else if (id && id === -1) {
        aplicativo.escopos.verificarPermissao(nome, "CADASTRO", function(sePermitido) {
          if (sePermitido) {
          
          }
        });
      } else {
        // Listagem
        aplicativo.escopos.verificarPermissao(nome, "LEITURA", function(sePermitido) {
          if (sePermitido) {
          
          }
        });
      }
    }

  };
 
  return Rotas;
});