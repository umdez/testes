/* Controlador deste modulo */

define([
  "aplicativo"
, "backbone"
, "modulos/controladores"
, "modulos/usuario/visoes/cadastro/cadastro"
, "modulos/usuario/visoes/leitura/leitura"
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

  var Controlador = _.extend(Base, {

    nome: 'Usuarios',  // Usado para nome da tabela e das rotas

    visaoDeLeitura: null,
    visaoDeCadastro: null,
    visaoDePaginacao: null,

    modUsuario: aplic.modulo("Usuario"),

    iniciar: function() {
      _.bindAll(this, 
        'suporte', 
        'suporteAnterior', 
        'suportePosterior',
        'suporteDeCadastro', 
        'suporteDeListagem', 
        'suporteDeLeitura'
      );

      Registrar('BAIXO', 'Adicionando as rotas do modulo de '+ this.nome);

      // Rotas chamadas primeiro
      aplic.adcRotaAnterior('UsuariosLeitura/:idUsuario', this.suporteAnterior);
      aplic.adcRotaAnterior('UsuariosLeitura/:idUsuario/aba/:nome', this.suporteAnterior);
      aplic.adcRotaAnterior('UsuariosListagem', this.suporteAnterior);
      aplic.adcRotaAnterior('UsuariosCadastro', this.suporteAnterior);

      aplic.adcRota('UsuariosLeitura/:idUsuario', this.nome, this.suporteDeLeitura);
      aplic.adcRota('UsuariosLeitura/:idUsuario/aba/:nome', this.nome, this.suporteDeLeitura);
      aplic.adcRota('UsuariosListagem', this.nome, this.suporteDeListagem);
      aplic.adcRota('UsuariosCadastro', this.nome, this.suporteDeCadastro);

      // Rotas chamadas por fim
      aplic.adcRotaPosterior('UsuariosLeitura/:idUsuario', this.suportePosterior);
      aplic.adcRotaPosterior('UsuariosLeitura/:idUsuario/aba/:nome', this.suportePosterior);
      aplic.adcRotaPosterior('UsuariosListagem', this.suportePosterior);
      aplic.adcRotaPosterior('UsuariosCadastro', this.suportePosterior);

    },

    // cadastro de usuário
    suporteDeCadastro: function() {
      var meuObj = this;

      this.verificarUmaPermissaoDeAcesso('CADASTRO', {
        prosseguir: function() { meuObj.cadastroDeUsuario(); },
        impedir: function(msg) { meuObj.apresentarAvisoDeErro(msg); }
      }, 'Você não possui permissão de cadastro de usuários');
    },

    // Paginação de usuários
    suporteDeListagem: function() {
      var meuObj = this;
    
      this.verificarUmaPermissaoDeAcesso('LEITURA', {
        prosseguir: function() { meuObj.paginacaoDeUsuario(); },
        impedir: function(msg) { meuObj.apresentarAvisoDeErro(msg); }
      }, 'Você não possui permissão de listagem de usuários');
    },

    // Leitura de um usuário em específico
    suporteDeLeitura: function(idUsuario, aba) {
      var meuObj = this;

      this.verificarUmaPermissaoDeAcesso('LEITURA', {
        prosseguir: function() { meuObj.leituraDeUsuario(idUsuario, aba); },
        impedir: function(msg) { meuObj.apresentarAvisoDeErro(msg); }
      }, 'Você não possui permissão de leitura aos usuários');
    },

    suporteAnterior: function() {
      Registrar('BAIXO', 'Acessando o suporte anterior das rotas de '+ this.nome)

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
      return true;
    },

    suportePosterior: function() {
      Registrar('BAIXO', 'Acessando o suporte posterior das rotas dos '+ this.nome);

      // pertencemos ao grupo um então mostramos ele.
      aplic.evts.trigger('painel-grupo:mostrar', 'div.grupo-um'); 
      // selecionamos um item do menu de navegação do topo.
      aplic.evts.trigger('item-navegacao-topo:selecionar', 'ul.menu-painel-topo li.item-grupo-um'); 
    },

    leituraDeUsuario: function(id, aba) {
      var meuObj = this;

      Registrar('BAIXO', 'Leitura de usuario.');

      this.procurarUsuario(id, function(usuario) {
        if (usuario) {
          meuObj.visaoDeLeitura = meuObj.criarVisao("ModuloUsuario", "VisaoDeLeitura", function() {
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
      var ModUsuario = this.modUsuario.Modelo;

      Registrar('BAIXO', 'Cadastro de usuario.');

      this.visaoDeCadastro = this.reusarVisao("ModuloUsuario", "VisaoDeCadastro", function() {
        return new VisaoDeCadastro({ 'model': new ModUsuario({}) });
      });
      this.apresentarConteudo('div#usuario-cadastro');
    },

    paginacaoDeUsuario: function() {
      Registrar('BAIXO', 'Paginação de usuarios.');

      this.visaoDePaginacao = this.reusarVisao("ModuloUsuario", "VisaoDePaginacao", function() {
        return new VisaoDePaginacao();
      });
      this.apresentarConteudo('div#usuario-pesquisa');   
    },

    procurarUsuario: function(id, cd) {
      var usuarios = this.modUsuario.Lista;
      var ModUsuario = this.modUsuario.Modelo;
      var usuario = usuarios.get(id);
      
      if (!usuario) {
        usuario = new ModUsuario({ 'id': id });
      } 

      usuario.fetch({
        success: function (usuario, resposta, opcoes) {
          usuarios.add(usuario, {merge: true});
          cd(usuario);
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

  });

  return Controlador;
});