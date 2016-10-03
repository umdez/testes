/* Controlador deste modulo */

define([
  "aplicativo"
, "backbone"
, "modulos/controladores"
, "modulos/exemploVisaoReusada/visoes/exemplo"
], function (
  aplic
, Backbone
, Base
, VisaoDeExemploReusada
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/exemploVisaoReusada/controlador/controlador' });

  var Controlador = _.extend({

    nome: 'ExemploVisaoReusada',  // Usado para nome das rotas

    visaoDeExemploReusada: null,

    iniciar: function() {
      _.bindAll(this,  
        'suporteAnterior', 
        'suportePosterior',
        'suporteDeVisaoExemplo'
      );

      Registrar('BAIXO', 'Adicionando as rotas do modulo de '+ this.nome);

      var Rotas = this.Rotas;

      // Rotas chamadas primeiro
      Rotas.adcAnterior('ExemploDeReuso', this.suporteAnterior);

      Rotas.adcRota('ExemploDeReuso', this.nome, this.suporteDeVisaoExemplo);

      // Rotas chamadas por fim
      Rotas.adcPosterior('ExemploDeReuso', this.suportePosterior);

    },

    // Apenas um exemplo de visão reusada
    suporteDeVisaoExemplo: function() {
      Registrar('BAIXO', 'Visão de exemplo de reuso.');

      this.visaoDeExemploReusada = this.reusarVisao("ModuloExemploVisaoReusada", "VisaoDeExemploReusada", function() {
        return new VisaoDeExemploReusada();
      });
      this.apresentarConteudo('div#visao-reusada-exemplo');
    },

    suporteAnterior: function() {
      Registrar('BAIXO', 'Acessando o suporte anterior das rotas de '+ this.nome)

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

    apresentarConteudo: function(item) {
      aplic.evts.trigger('grupos-conteudo:mostrar', 'div.grupo-um '+ item +'.conteudo-grupo-um'); 
    }

  });

  var Uniao = {};
  _.extend(Uniao, Base);
  _.extend(Uniao, Controlador);

  return Uniao;
});