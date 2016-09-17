
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

  var Rotas = {

    nome: "Usuarios",  // Usado para nome da tabela e da rota

    modUsuario: aplicativo.modulo("Usuario"),

    iniciar: function() {
      aplicativo.adcRota(this.nome, this.suporte.bind(this));
    },

    suporte: function(id) {
      var meuObj = this;

      // Esconde todos os conteudos do painel.
      $('#painel > #conteudo > div.conteudo-painel').hide();

      if (id && id > 0) {
        // Leitura de um item em específico
        this.verificarPermissao("LEITURA", function(sePermitido) {
          if (sePermitido) {
           
            meuObj.procurarUsuario(id, function(usuario) {
              var visaoDeLeitura = meuObj.criarVisao("VisaoDeLeituraDeUsuario", function() {
                return new VisaoDeLeitura({ 'model': usuario });
              });
              
              $('div#usuario-leitura.conteudo-painel').html(visaoDeLeitura.render().el);
              meuObj.mostrarConteudo('div#usuario-leitura.conteudo-painel');
            });

            // remove seleção de todos os items do menu
            $('ul.menu-painel-topo li').removeClass('active');
          } else {

          }
        });
      } else if (id && id <= 0) {
        this.verificarPermissao("CADASTRO", function(sePermitido) {
          if (sePermitido) {
            console.log('Cadastro');
            
            var visaoDeCadastro = meuObj.reusarVisao("VisaoDeCadastroDeUsuario", function() {
              return new VisaoDeCadastro();
            });

            meuObj.mostrarConteudo('div#usuario-cadastro.conteudo-painel');
            meuObj.selecionarItem('ul.menu-painel-topo li.item-cadastrar');
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
            
            meuObj.mostrarConteudo('div#usuario-pesquisa.conteudo-painel');
            meuObj.selecionarItem('ul.menu-painel-topo li.item-pesquisar');
          } else {
            // Provavelmente mostrar uma visão informando que não possui acesso
          }
        });
      }
    },

    procurarUsuario: function(id, cd) {
      var usuarios = this.modUsuario.Lista;
      var Modelo = this.modUsuario.Modelo;

      var usuario = usuarios.get(id);
      if (usuario) {
        cd(usuario);
      } else {
        usuario = new Modelo({ 'id': id });
        usuario.fetch({
          reset: true
        , success: function (modelo, resposta, opcoes) {
            usuarios.add(modelo);
            cd(modelo);
          }
        });
      }
    },

    mostrarConteudo: function(item) {
      $(item).show();
    },

    selecionarItem: function(item) {
      $('ul.menu-painel-topo li').removeClass('active');
      $(item).addClass('active');
    }
  };
 
  var Uniao = {};
  _.extend(Uniao, Base);
  _.extend(Uniao, Rotas);

  return Uniao;
});