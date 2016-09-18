
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

    visaoDoPainel: null,

    visaoDeLeitura: null,
    visaoDeCadastro: null,
    visaoDePaginacao: null,

    modUsuario: aplicativo.modulo("Usuario"),

    iniciar: function() {
      aplicativo.adcRota(this.nome, this.suporte.bind(this));
    },

    suporte: function(id) {
      var meuObj = this;

      this.visaoDoPainel = this.reusarVisao("VisaoBaseDePainel", function() { });
 
      // Esconder todos os conteudos do painel.
      this.visaoDoPainel.escoderTodosOsConteudos();

      if (id && id > 0) {
        // Leitura de um item em específico
        this.verificarPermissao("LEITURA", function(sePermitido) {
          if (sePermitido) {
           
            meuObj.procurarUsuario(id, function(usuario) {
              if (usuario) {
                meuObj.visaoDeLeitura = meuObj.criarVisao("VisaoDeLeituraDeUsuario", function() {
                  return new VisaoDeLeitura({ 'model': usuario });
                });
                $('div#usuario-leitura.conteudo-painel').html(meuObj.visaoDeLeitura.render().el);

                meuObj.visaoDoPainel.mostrarUmConteudo('div#usuario-leitura.conteudo-painel');
              } else {
                console.log('O usuário não foi encontrado.');
              }
            });

            // remove seleção de todos os items do menu
            meuObj.visaoDoPainel.deselecionarItemsTopoMenu();
          } else {
            console.log('Você não possui permissão de leitura aos usuários');
          }
        });
      } else if (id && id <= 0) {
        this.verificarPermissao("CADASTRO", function(sePermitido) {
          if (sePermitido) {
            console.log('Cadastro');
            
            meuObj.visaoDeCadastro = meuObj.reusarVisao("VisaoDeCadastroDeUsuario", function() {
              return new VisaoDeCadastro();
            });

            meuObj.visaoDoPainel.mostrarUmConteudo('div#usuario-cadastro.conteudo-painel');
            meuObj.visaoDoPainel.selecionarItemTopoMenu('ul.menu-painel-topo li.item-cadastrar');
          } else {
            console.log('Você não possui permissão de cadastro de usuários');
          }
        });
      } else {
        // Listagem
        this.verificarPermissao("LEITURA", function(sePermitido) {
          if (sePermitido) {
            console.log('Listagem');

            meuObj.visaoDePaginacao = meuObj.reusarVisao("VisaoDePaginacaoDeUsuario", function() {
              return new VisaoDePaginacao();
            });
            
            meuObj.visaoDoPainel.mostrarUmConteudo('div#usuario-pesquisa.conteudo-painel');
            meuObj.visaoDoPainel.selecionarItemTopoMenu('ul.menu-painel-topo li.item-pesquisar');
          } else {
            // AFAZER: Provavelmente mostrar uma visão informando que não possui acesso.
            console.log('Você não possui permissão de listagem de usuários');
          }
        });
      }
    },

    procurarUsuario: function(id, cd) {
      var usuarios = this.modUsuario.Lista;
      var Modelo = this.modUsuario.Modelo;
      var usuario = usuarios.get(id);
      
      if (!usuario) {
        usuario = new Modelo({ 'id': id });
      } 

      usuario.fetch({
        reset: true
      , success: function (modelo, resposta, opcoes) {
          usuarios.add(modelo, {merge: true});
          cd(modelo);
        }
      , error: function (modelo, resposta, opcoes) {
          console.log('Erro: ['+ modelo.status + '] ('+ JSON.parse(modelo.responseText).mensagem +')');
        }
      });
    }

  };
 
  var Uniao = {};
  _.extend(Uniao, Base);
  _.extend(Uniao, Rotas);

  return Uniao;
});