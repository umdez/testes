
define([
  "aplicativo"
, "modulos/baseDasRotas"
, "modulos/usuario/visoes/cadastro"
, "modulos/usuario/visoes/leitura"
, "modulos/usuario/visoes/paginacao"
], function (
  aplicativo
, Base
, VisaoDeCadastro
, VisaoDeLeitura
, VisaoDePaginacao
) {
  'use strict';

  //var $container = $('.some-container');

  // Será possivel utilizar um gerente de visões aqui?

  var Rotas = {

    nome: "Usuarios",  // Usado para nome da tabela e da rota

    usuario: aplicativo.modulo("Usuario"),

    iniciar: function() {
      aplicativo.adcRota(this.nome, this.suporte.bind(this));
    },

    suporte: function(id) {
      var meuObj = this;
      var modelo = this.usuario.Modelo;

      if (id && id > 0) {
        // Leitura de um item em específico
        this.verificarPermissao("LEITURA", function(sePermitido) {
          if (sePermitido) {
            modelo.set({'id': id});
            modelo.fetch({
              reset: true
            , success: function (mod, resposta, opcoes) {
                console.log('Leitura'+ modelo.get('nome') +'id '+ id);
              }
            });

            var sePossui = meuObj.verificarEscopo("ATUALIZACAO");
            console.log('wow '+ sePossui);
          } else {

          }
        });
      } else if (id && id <= 0) {
        this.verificarPermissao("CADASTRO", function(sePermitido) {
          if (sePermitido) {
            console.log('Cadastro');
          } else {

          }
        });
      } else {
        // Listagem
        this.verificarPermissao("LEITURA", function(sePermitido) {
          if (sePermitido) {
            console.log('Listagem');
          } else {
            // Provavelmente mostrar uma visão informando que não possui acesso
          }
        });
      }
    }

  };
 
  var Uniao = {};
  _.extend(Uniao, Base);
  _.extend(Uniao, Rotas);

  return Uniao;
});