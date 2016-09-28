define([
  "aplicativo"
, "modulos/controladores"
], function (
  aplic
, Base
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/grupos/roteador/rotas' });

  var Controlador = _.extend(Base, {

    nome: 'Grupos',  // Usado para nome das rotas

    iniciar: function() {
      _.bindAll(this, 
        'suporteAnterior',
        'suporteDoGrupoUm',
        'suporteDoGrupoDois',
        'suporteDoGrupoTres'
      );

      Registrar('BAIXO', 'Adicionando rotas dos '+ this.nome);

      // Rotas chamadas primeiro
      aplic.adcRotaAnterior('GrupoUm', this.suporteAnterior);
      aplic.adcRotaAnterior('GrupoDois', this.suporteAnterior);
      aplic.adcRotaAnterior('GrupoTres', this.suporteAnterior);

      aplic.adcRota('GrupoUm', this.nome, this.suporteDoGrupoUm);
      aplic.adcRota('GrupoDois', this.nome, this.suporteDoGrupoDois);
      aplic.adcRota('GrupoTres', this.nome, this.suporteDoGrupoTres);
    },

    suporteAnterior: function() {
      Registrar('BAIXO', 'Acessando suporte das rotas dos '+ this.nome);

      // Esconde todos os conteudos de todos os grupos.
      aplic.evts.trigger('grupos-conteudos:esconder');
      // Esconde todos os grupos do conteudo do painel
      aplic.evts.trigger('painel-grupos:esconder');
      // não apresenta qualquer aviso anteriormente apresentada no painel.
      aplic.evts.trigger('painel-avisos:esconder');

      return true;
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

  return Controlador;
});