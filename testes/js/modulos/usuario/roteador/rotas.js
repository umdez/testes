
define([
  "aplicativo"
, "backbone"
, "modulos/baseDasRotas"
, "modulos/usuario/visoes/cadastro"
, "modulos/usuario/visoes/leitura"
, "modulos/usuario/visoes/paginacao"
], function (
  aplic
, Backbone
, Base
, VisaoDeCadastro
, VisaoDeLeitura
, VisaoDePaginacao
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/usuario/roteador/rotas' });

  var Rotas = {

    nome: 'Usuarios',  // Usado para nome da tabela e das rotas

    visaoDeLeitura: null,
    visaoDeCadastro: null,
    visaoDePaginacao: null,

    modUsuario: aplic.modulo("Usuario"),

    iniciar: function() {
      _.bindAll(this, 'suporte');

      Registrar('BAIXO', 'Adicionando as rotas do modulo de usuarios.');

      aplic.adcRota(this.nome, this.suporte);
      aplic.adcRota('UsuariosLeitura', this.suporte);
      aplic.adcRota('UsuariosListagem', this.suporte);
      aplic.adcRota('UsuariosCadastro', this.suporte);
    },

    suporte: function(rota, id) {
      var meuObj = this;

      Registrar('BAIXO', 'Acessando o suporte da rota '+ rota)

      // NOTA: Podemos precisar acessar uma visão diretamente. Um exemplo:
      // var topoDoPainel = this.reusarVisao("VisaoBaseDeTopoPainel", function() { });

      // Esconde todos os conteudos de todos os grupos.
      aplic.evts.trigger('grupos-conteudos:esconder');

      // Esconde qualquer aviso anteriormente apresentado neste grupo.
      aplic.evts.trigger('grupo-um-avisos:esconder');

      // não apresenta qualquer aviso anteriormente apresentada
      aplic.evts.trigger('painel-avisos:esconder');

      // Esconde todos os grupos do conteudo do painel
      aplic.evts.trigger('painel-grupos:esconder');

      if (id && id > 0) {

        // Leitura de um usuário em específico
        this.verificarUmaPermissaoDeAcesso('LEITURA', {
          prosseguir: function() { meuObj.leituraDeUsuario(id); },
          proibir: function(msg) { meuObj.apresentarAvisoDeErro(msg); }
        }, 'Você não possui permissão de leitura aos usuários');

      } else if ((id && id <= 0) || (rota == 'UsuariosCadastro')) {
        
        // cadastro de usuário
        this.verificarUmaPermissaoDeAcesso('CADASTRO', {
          prosseguir: function() { meuObj.cadastroDeUsuario(); },
          proibir: function(msg) { meuObj.apresentarAvisoDeErro(msg); }
        }, 'Você não possui permissão de cadastro de usuários');

      } else {
        // Paginação de usuários
        this.verificarUmaPermissaoDeAcesso('LEITURA', {
          prosseguir: function() { meuObj.paginacaoDeUsuario(); },
          proibir: function(msg) { meuObj.apresentarAvisoDeErro(msg); }
        }, 'Você não possui permissão de listagem de usuários');
      }

      // pertencemos ao grupo um então mostramos ele.
      aplic.evts.trigger('painel-grupo:mostrar', 'div.grupo-um'); 

      // selecionamos um item do menu de navegação do topo.
      aplic.evts.trigger('item-navegacao-topo:selecionar', 'ul.menu-painel-topo li.item-grupo-um'); 
    },

    leituraDeUsuario: function(id) {
      var meuObj = this;

      Registrar('BAIXO', 'Leitura de usuario.');

      this.procurarUsuario(id, function(usuario) {
        if (usuario) {
          meuObj.visaoDeLeitura = meuObj.criarVisao("VisaoDeLeituraDeUsuario", function() {
            return new VisaoDeLeitura({ 'model': usuario });
          });
          $('div.grupo-um div#usuario-leitura.conteudo-grupo-um').html(meuObj.visaoDeLeitura.render().el);
          
          // Mostrar esse conteudo
          meuObj.apresentarConteudo('div#usuario-leitura');
        } else {
          meuObj.apresentarAvisoDeErro('Os dados de cadastro deste usuário não foram encontrados.')
        }
      });
    },

    cadastroDeUsuario: function () {
      Registrar('BAIXO', 'Cadastro de usuario.');

      this.visaoDeCadastro = this.reusarVisao("VisaoDeCadastroDeUsuario", function() {
        return new VisaoDeCadastro();
      });
      this.apresentarConteudo('div#usuario-cadastro');
    },

    paginacaoDeUsuario: function() {
      Registrar('BAIXO', 'Paginação de usuarios.');

      this.visaoDePaginacao = this.reusarVisao("VisaoDePaginacaoDeUsuario", function() {
        return new VisaoDePaginacao();
      });
      this.apresentarConteudo('div#usuario-pesquisa');   
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
          Registrar('BAIXO', 'Não foi possível requisitar dados deste usuário.');
          cd(null);
        }
      });
    },

    apresentarAvisoDeErro: function(msg) {
      aplic.evts.trigger('grupo-um-aviso-erro:mostrar', msg);
    },

    apresentarConteudo: function(item) {
      aplic.evts.trigger('grupos-conteudo:mostrar', 'div.grupo-um '+ item +'.conteudo-grupo-um'); 
    }

  };
 
  var Uniao = {};
  _.extend(Uniao, Base);
  _.extend(Uniao, Rotas);

  return Uniao;
});