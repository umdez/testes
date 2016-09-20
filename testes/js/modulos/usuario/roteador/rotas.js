
define([
  "aplicativo"
, 'registrador'
, "modulos/baseDasRotas"
, "modulos/usuario/visoes/cadastro"
, "modulos/usuario/visoes/leitura"
, "modulos/usuario/visoes/paginacao"
], function (
  aplicativo
, Regis
, Base
, VisaoDeCadastro
, VisaoDeLeitura
, VisaoDePaginacao
) {
  'use strict';

  var Registro = Regis.reg.bind({ envolucro: 'modulos/usuario/roteador/rotas' });

  var Rotas = {

    nome: 'Usuarios',  // Usado para nome da tabela e das rotas

    visaoDoPainel: null,
    visaoDoTopoPainel: null,
    visaoDosGruposPainel: null,
    visaoDoGrupoUm: null,

    visaoDeLeitura: null,
    visaoDeCadastro: null,
    visaoDePaginacao: null,

    modUsuario: aplicativo.modulo("Usuario"),

    iniciar: function() {
      Registro(Regis.BAIXO, 'Adicionando rotas de usuarios.');

      aplicativo.adcRota(this.nome, this.suporte.bind(this));
      aplicativo.adcRota('UsuariosLeitura', this.suporte.bind(this));
      aplicativo.adcRota('UsuariosListagem', this.suporte.bind(this));
      aplicativo.adcRota('UsuariosCadastro', this.suporte.bind(this));
    },

    suporte: function(rota, id) {
      var meuObj = this;

      Registro(Regis.BAIXO, 'Acessando suporte da rota '+ rota);

      var painel = this.visaoDoPainel = this.reusarVisao("VisaoBaseDePainel", function() { });
      var topoDoPainel = this.visaoDoTopoPainel = this.reusarVisao("VisaoBaseDeTopoPainel", function() { });
      var grupos = this.visaoDosGruposPainel = this.reusarVisao("VisaoGruposDoPainel", function() { });
      var grupoUm = this.visaoDoGrupoUm = this.reusarVisao("VisaoDoGrupoUm", function() { });

      // Esconde todos os grupos do conteudo do painel
      painel.esconderTodosOsGrupos();

      // Esconde todos os conteudos de todos os grupos.
      grupos.esconderTodosOsConteudosDosGrupos();

      // Esconde qualquer aviso anteriormente apresentado.
      grupoUm.esconderTodosAvisos();

      // não apresenta qualquer aviso anteriormente apresentada
      painel.esconderTodosAvisos();

      if (id && id > 0) {
        // Leitura de um item em específico
        this.verificarPermissao("LEITURA", function(sePermitido) {
          if (sePermitido) {
            Registro(Regis.BAIXO, 'Leitura de usuario.');

            meuObj.procurarUsuario(id, function(usuario) {
              if (usuario) {
                meuObj.visaoDeLeitura = meuObj.criarVisao("VisaoDeLeituraDeUsuario", function() {
                  return new VisaoDeLeitura({ 'model': usuario });
                });
                $('div.grupo-um div#usuario-leitura.conteudo-grupo-um').html(meuObj.visaoDeLeitura.render().el);
                grupos.mostrarConteudoDeUmGrupo('div.grupo-um div#usuario-leitura.conteudo-grupo-um');
              } else {
                grupoUm.apresentarAvisoDeErro('Os dados de cadastro deste usuário não foram encontrados.');
              }
            });
          } else {
            grupoUm.apresentarAvisoDeErro('Você não possui permissão de leitura aos usuários');
          }
        });
      } else if ((id && id <= 0) || (rota == 'UsuariosCadastro')) {
        this.verificarPermissao("CADASTRO", function(sePermitido) {
          if (sePermitido) {
            Registro(Regis.BAIXO, 'Cadastro de usuario.');

            meuObj.visaoDeCadastro = meuObj.reusarVisao("VisaoDeCadastroDeUsuario", function() {
              return new VisaoDeCadastro();
            });
            grupos.mostrarConteudoDeUmGrupo('div.grupo-um div#usuario-cadastro.conteudo-grupo-um');
          } else {
            grupoUm.apresentarAvisoDeErro('Você não possui permissão de cadastro de usuários');
          }
        });
      } else {
        // Listagem
        this.verificarPermissao("LEITURA", function(sePermitido) {
          if (sePermitido) {
            Registro(Regis.BAIXO, 'Listagem de usuario.');

            meuObj.visaoDePaginacao = meuObj.reusarVisao("VisaoDePaginacaoDeUsuario", function() {
              return new VisaoDePaginacao();
            });
            grupos.mostrarConteudoDeUmGrupo('div.grupo-um div#usuario-pesquisa.conteudo-grupo-um');
          } else {
            grupoUm.apresentarAvisoDeErro('Você não possui permissão de listagem de usuários');
          }
        });
      }

      // pertencemos ao grupo um
      painel.mostrarUmGrupo('div.grupo-um');
      topoDoPainel.selecionarItemMenu('ul.menu-painel-topo li.item-grupo-um');
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
          Registro(Regis.BAIXO, 'Não foi possível requisitar dados deste usuário.');
          cd(null);
        }
      });
    }

  };
 
  var Uniao = {};
  _.extend(Uniao, Base);
  _.extend(Uniao, Rotas);

  return Uniao;
});