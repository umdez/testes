
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
    visaoDoTopoPainel: null,

    visaoDeLeitura: null,
    visaoDeCadastro: null,
    visaoDePaginacao: null,

    modUsuario: aplicativo.modulo("Usuario"),

    iniciar: function() {
      aplicativo.adcRota(this.nome, this.suporte.bind(this));
    },

    suporte: function(id) {
      var meuObj = this;

      var painel = this.visaoDoPainel = this.reusarVisao("VisaoBaseDePainel", function() { });
      var topoDoPainel = this.visaoDoTopoPainel = this.reusarVisao("VisaoBaseDeTopoPainel", function() { });
 
      // Esconder todos os conteudos do painel.
      painel.escoderTodosOsConteudos();

      // não apresenta qualquer aviso anteriormente apresentado
      painel.esconderAviso();

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

                painel.mostrarUmConteudo('div#usuario-leitura.conteudo-painel');
              } else {
                painel.apresentarAviso('Os dados de cadastro deste usuário não foram encontrados.');
              }
            });

            // remove seleção de todos os items do menu
            topoDoPainel.deselecionarItemsMenu();
          } else {
            painel.apresentarAviso('Você não possui permissão de leitura aos usuários');
          }
        });
      } else if (id && id <= 0) {
        this.verificarPermissao("CADASTRO", function(sePermitido) {
          if (sePermitido) {
            console.log('Cadastro');
            
            meuObj.visaoDeCadastro = meuObj.reusarVisao("VisaoDeCadastroDeUsuario", function() {
              return new VisaoDeCadastro();
            });

            painel.mostrarUmConteudo('div#usuario-cadastro.conteudo-painel');
            topoDoPainel.selecionarItemMenu('ul.menu-painel-topo li.item-cadastrar');
          } else {
             painel.apresentarAviso('Você não possui permissão de cadastro de usuários');
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
            
            painel.mostrarUmConteudo('div#usuario-pesquisa.conteudo-painel');
            topoDoPainel.selecionarItemMenu('ul.menu-painel-topo li.item-pesquisar');
          } else {
            painel.apresentarAviso('Você não possui permissão de listagem de usuários');
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
          cd(null);
          console.log('Não foi possível requisitar dados deste usuário.')
        }
      });
    }

  };
 
  var Uniao = {};
  _.extend(Uniao, Base);
  _.extend(Uniao, Rotas);

  return Uniao;
});