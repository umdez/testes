/* Controlador deste modulo */

define([
  "aplicativo"
, "backbone"
, "i18n/indice"
, "modulos/controladores"
, "modulos/usuario/visoes/cadastro/cadastro"
, "modulos/usuario/visoes/leitura/leitura"
, "modulos/usuario/visoes/paginacao"
], function (
  aplic
, Backbone
, Lingua
, Base
, VisaoDeCadastro
, VisaoDeLeitura
, VisaoDePaginacao
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/usuario/controlador/controlador' });

  var Controlador = _.extend({

    nome: 'Usuarios',  // Usado para nome da tabela e das rotas

    visaoDeLeitura: null,
    visaoDeCadastro: null,
    visaoDePaginacao: null,

    modUsuario: aplic.modulo("Usuario"),

    iniciar: function() {
      _.bindAll(this,  
        'suporteAnterior', 
        'suportePosterior',
        'suporteDeCadastro', 
        'suporteDeListagem', 
        'suporteDeLeitura'
      );

      Registrar('BAIXO', Lingua.gerar('CONTROLADOR_MODULO.INFO.ADICIONANDO_ROTAS', { 
        'nome': this.nome 
      }));

      var Rotas = this.Rotas;

      // Rotas chamadas primeiro
      Rotas.adcAnterior('UsuariosLeitura/:idUsuario', this.suporteAnterior);
      Rotas.adcAnterior('UsuariosLeitura/:idUsuario/aba/:nome', this.suporteAnterior);
      Rotas.adcAnterior('UsuariosListagem', this.suporteAnterior);
      Rotas.adcAnterior('UsuariosCadastro', this.suporteAnterior);

      Rotas.adcRota('UsuariosLeitura/:idUsuario', this.nome, this.suporteDeLeitura);
      Rotas.adcRota('UsuariosLeitura/:idUsuario/aba/:nome', this.nome, this.suporteDeLeitura);
      Rotas.adcRota('UsuariosListagem', this.nome, this.suporteDeListagem);
      Rotas.adcRota('UsuariosCadastro', this.nome, this.suporteDeCadastro);

      // Rotas chamadas por fim
      Rotas.adcPosterior('UsuariosLeitura/:idUsuario', this.suportePosterior);
      Rotas.adcPosterior('UsuariosLeitura/:idUsuario/aba/:nome', this.suportePosterior);
      Rotas.adcPosterior('UsuariosListagem', this.suportePosterior);
      Rotas.adcPosterior('UsuariosCadastro', this.suportePosterior);

    },

    // cadastro de usuário
    suporteDeCadastro: function() {
      var meuObj = this;

      this.verificarUmaPermissaoDeAcesso('CADASTRO', {
        prosseguir: function() { meuObj.cadastroDeUsuario(); },
        impedir: function(msg) { meuObj.apresentarAvisoDeErro(msg); }
      }, Lingua.gerar('CONTROLADOR_MODULO.ALERTA.PERMISSAO_NEGADA', { 'acao': 'cadastro', 'nome': this.nome }));
    },

    // Paginação de usuários
    suporteDeListagem: function() {
      var meuObj = this;
    
      this.verificarUmaPermissaoDeAcesso('LEITURA', {
        prosseguir: function() { meuObj.paginacaoDeUsuario(); },
        impedir: function(msg) { meuObj.apresentarAvisoDeErro(msg); }
      }, Lingua.gerar('CONTROLADOR_MODULO.ALERTA.PERMISSAO_NEGADA', { 'acao': 'listagem', 'nome': this.nome }));
    },

    // Leitura de um usuário em específico
    suporteDeLeitura: function(idUsuario, aba) {
      var meuObj = this;

      this.verificarUmaPermissaoDeAcesso('LEITURA', {
        prosseguir: function() { meuObj.leituraDeUsuario(idUsuario, aba); },
        impedir: function(msg) { meuObj.apresentarAvisoDeErro(msg); }
      }, Lingua.gerar('CONTROLADOR_MODULO.ALERTA.PERMISSAO_NEGADA', { 'acao': 'leitura', 'nome': this.nome }));
    },

    suporteAnterior: function() {
      Registrar('BAIXO', Lingua.gerar('CONTROLADOR_MODULO.INFO.ACESSANDO_SUPORTE_ANTERIOR', { 
        'nome': this.nome 
      }));

      // NOTA: Podemos precisar acessar uma visão diretamente. Um exemplo:
      // var topoDoPainel = this.reusarVisao("VisaoBaseDeTopoPainel", function() { });

      // apresenta barra de carregando 
      aplic.evts.trigger('carregando:apresentar');

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
      Registrar('BAIXO', Lingua.gerar('CONTROLADOR_MODULO.INFO.ACESSANDO_SUPORTE_POSTERIOR', { 
        'nome': this.nome 
      }));

      // pertencemos ao grupo um então mostramos ele.
      aplic.evts.trigger('painel-grupo:mostrar', 'div.grupo-um'); 
      // selecionamos um item do menu de navegação do topo.
      aplic.evts.trigger('item-navegacao-topo:selecionar', 'ul.menu-painel-topo li.item-grupo-um'); 
    },

    leituraDeUsuario: function(idUsuario, aba) {
      var meuObj = this;

      Registrar('BAIXO', Lingua.gerar('CONTROLADOR_MODULO.INFO.DE_PERCURSO', {
        'acao': 'leitura', 'nome': this.nome
      }));

      // aqui limpamos essa visão
      $('div.grupo-um div#usuario-leitura.conteudo-grupo-um').html('<span></span>');

      var colecaoDeUsuario = this.modUsuario['colecaoDeUsuario'];
      var ModeloDeUsuario = this.modUsuario['ModeloDeUsuario'];
      var usuario = ModeloDeUsuario.findOrCreate({'id': idUsuario});

      var acoes = [ 
        meuObj.procurarUmModelo({}, colecaoDeUsuario, usuario, { 
          'erro': function(){
            meuObj.apresentarAvisoDeErro(Lingua.gerar('USUARIO.ERRO.CADASTRO_NAO_ENCONTRADO'));
          }
        }),
        meuObj.sePropriedadeExiste(usuario, 'UsuarioEndereco', { 
          'erro': function() {
            meuObj.apresentarAvisoDeErro(Lingua.gerar('USUARIO.ERRO.ENDERECO_NAO_ENCONTRADO'));
          } 
        })
      ];

      meuObj.executarAcoes(acoes, function(){
        // se tudo deu certo, vamos então criar a nossa visão de leitura
        meuObj.visaoDeLeitura = meuObj.criarVisao("ModuloUsuario", "VisaoDeLeitura", function() {
          return new VisaoDeLeitura({ 'model': usuario });
        });
        $('div.grupo-um div#usuario-leitura.conteudo-grupo-um').html(meuObj.visaoDeLeitura.render().el);
      });
    
      meuObj.apresentarConteudo('div#usuario-leitura');     
    },

    cadastroDeUsuario: function () {
      Registrar('BAIXO', Lingua.gerar('CONTROLADOR_MODULO.INFO.DE_PERCURSO', {
        'acao': 'cadastro', 'nome': this.nome
      }));
      
      var ModeloDeUsuario = this.modUsuario['ModeloDeUsuario'];

      // aqui limpamos essa visão
      $('div.grupo-um div#usuario-cadastro.conteudo-grupo-um').html('<span></span>');

      this.visaoDeCadastro = this.criarVisao("ModuloUsuario", "VisaoDeCadastro", function() {
        return new VisaoDeCadastro({ 'model': new ModeloDeUsuario({}) });
      });
      $('div.grupo-um div#usuario-cadastro.conteudo-grupo-um').html(this.visaoDeCadastro.render().el);
      this.apresentarConteudo('div#usuario-cadastro');
    },

    paginacaoDeUsuario: function() {
      Registrar('BAIXO', Lingua.gerar('CONTROLADOR_MODULO.INFO.DE_PERCURSO', {
        'acao': 'paginação', 'nome': this.nome
      }));

      this.visaoDePaginacao = this.reusarVisao("ModuloUsuario", "VisaoDePaginacao", function() {
        return new VisaoDePaginacao();
      });
      this.apresentarConteudo('div#usuario-pesquisa');   
    },

    apresentarAvisoDeErro: function(msg) {
      aplic.evts.trigger('grupo-um-aviso-erro:mostrar', msg);
    },

    apresentarConteudo: function(item) {
      aplic.evts.trigger('grupos-conteudo:mostrar', 'div.grupo-um '+ item +'.conteudo-grupo-um'); 
    }

  });

  var Uniao = {};
  _.extend(Uniao, Base);
  _.extend(Uniao, Controlador);

  return Uniao;
});