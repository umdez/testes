define([
  "aplicativo"
, "i18n/indice"
, "modulos/controladores"
], function (
  aplic
, Lingua
, Base
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/grupos/controlador/controlador' });

  var Controlador = _.extend({

    nome: 'Grupos',  // Usado para nome das rotas

    iniciar: function() {
      _.bindAll(this, 
        'suporteAnterior',
        'suporteDoGrupoZero',
        'suporteDoGrupoUm',
        'suporteDoGrupoDois',
        'suporteDoGrupoTres'
      );

      Registrar('BAIXO', Lingua.gerar('CONTROLADOR_MODULO.INFO.ADICIONANDO_ROTAS', { 
        'nome': this.nome 
      }));

      var Rotas = this.Rotas;

      // Rotas chamadas primeiro
      Rotas.adcAnterior('GrupoZero', this.suporteAnterior);
      Rotas.adcAnterior('GrupoUm', this.suporteAnterior);
      Rotas.adcAnterior('GrupoDois', this.suporteAnterior);
      Rotas.adcAnterior('GrupoTres', this.suporteAnterior);

      Rotas.adcRota('GrupoZero', this.nome, this.suporteDoGrupoZero);
      Rotas.adcRota('GrupoUm', this.nome, this.suporteDoGrupoUm);
      Rotas.adcRota('GrupoDois', this.nome, this.suporteDoGrupoDois);
      Rotas.adcRota('GrupoTres', this.nome, this.suporteDoGrupoTres);
    },

    suporteAnterior: function() {
      Registrar('BAIXO', Lingua.gerar('CONTROLADOR_MODULO.INFO.ACESSANDO_SUPORTE_ANTERIOR', { 
        'nome': this.nome 
      }));

      // apresenta barra de carregando 
      aplic.evts.trigger('carregando:apresentar');

      // Esconde todos os conteudos de todos os grupos.
      aplic.evts.trigger('grupos-conteudos:esconder');
      // Esconde todos os grupos do conteudo do painel
      aplic.evts.trigger('painel-grupos:esconder');
      // não apresenta qualquer aviso anteriormente apresentada no painel.
      aplic.evts.trigger('painel-avisos:esconder');

      return true;
    },

    suporteDoGrupoZero: function() {
      // mostra o grupo zero do painel.
      aplic.evts.trigger('painel-grupo:mostrar', 'div.grupo-zero');
      // remove seleção dos items do menu do topo do painel
      aplic.evts.trigger('item-navegacao-topo:deselecionar');
    },

    suporteDoGrupoUm: function() {
      // esconde avisos do grupo um
      aplic.evts.trigger('grupo-um-avisos:esconder');
      // mostra o grupo um do painel.
      aplic.evts.trigger('painel-grupo:mostrar', 'div.grupo-um');
      // selecionamos um item do menu de navegação do topo.
      aplic.evts.trigger('item-navegacao-topo:selecionar', 'ul.menu-painel-topo li.item-grupo-um');
    },

    suporteDoGrupoDois: function() {
      // mostra o grupo dois do painel.
      aplic.evts.trigger('painel-grupo:mostrar', 'div.grupo-dois');
      // selecionamos um item do menu de navegação do topo.
      aplic.evts.trigger('item-navegacao-topo:selecionar', 'ul.menu-painel-topo li.item-grupo-dois');
    },

    suporteDoGrupoTres: function() {
      // mostra o grupo três do painel.
      aplic.evts.trigger('painel-grupo:mostrar', 'div.grupo-tres');
    }
  });
  
  var Uniao = {};
  _.extend(Uniao, Base);
  _.extend(Uniao, Controlador);

  return Uniao;
});