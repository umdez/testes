
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
      var usuarios = this.usuario.Lista;
      var modelo = this.usuario.Modelo;

      // Esconde todos os conteudos do painel.
      $('#painel > #conteudo > div.conteudo-painel').hide();

      if (id && id > 0) {
        // Leitura de um item em específico
        this.verificarPermissao("LEITURA", function(sePermitido) {
          if (sePermitido) {

            var quandoCarregarUsuario = function(usuario) {
              var visaoDeLeitura = meuObj.criarVisao("VisaoDeLeituraDeUsuario", function() {
                return new VisaoDeLeitura({ 'model': usuario });
              });

              $('div#usuario-leitura.conteudo-painel').html(visaoDeLeitura.render().el);
              $('div#usuario-leitura.conteudo-painel').show();
            }
  
            var usuario = usuarios.get(id);
            if (usuario) {
              quandoCarregarUsuario(usuario);
            } else {
              usuario = new modelo({ 'id': id });
              usuario.fetch({
                reset: true
              , success: function (modelo, resposta, opcoes) {
                  usuarios.add(modelo);
                  quandoCarregarUsuario(modelo);
                }
              });
            }
            var sePossui = meuObj.verificarEscopo("ATUALIZACAO");
            console.log('wow '+ sePossui);
          } else {

          }
        });
      } else if (id && id <= 0) {
        this.verificarPermissao("CADASTRO", function(sePermitido) {
          if (sePermitido) {
            console.log('Cadastro');
            
            var visaoDeCadastro = meuObj.criarVisao("VisaoDeCadastroDeUsuario", function() {
              return new VisaoDeCadastro();
            });

            $('div#usuario-cadastro.conteudo-painel').html(visaoDeCadastro.render().el);
            $('div#usuario-cadastro.conteudo-painel').show();

            meuObj.selecionarUmItem('ul.menu-painel-topo li.item-cadastrar');
          } else {

          }
        });
      } else {
        // Listagem
        this.verificarPermissao("LEITURA", function(sePermitido) {
          if (sePermitido) {
            console.log('Listagem');

            var visaoDePaginacao = meuObj.reusarVisao("VisaoDePaginacaoDeUsuario", function() {
              return new VisaoDePaginacao();
            });
            
            $('div#usuario-pesquisa.conteudo-painel').show();

            meuObj.selecionarUmItem('ul.menu-painel-topo li.item-pesquisar');
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