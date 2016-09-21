define([
  "aplicativo"
, "modulos/baseDasRotas"
], function (
  aplic
, Base
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/grupos/roteador/rotas' });

  var Rotas = {

    visaoDoPainel: null,
    visaoDoTopoPainel: null,
    visaoDosGruposPainel: null,

    iniciar: function() {
      _.bindAll(this, 'suporte');

      Registrar('BAIXO', 'Adicionando rotas dos grupos.');

      aplic.adcRota('GrupoUm', this.suporte);
      aplic.adcRota('GrupoDois', this.suporte);
      aplic.adcRota('GrupoTres', this.suporte);
    },

    suporte: function(rota, id) {

      Registrar('BAIXO', 'Acessando suporte da rota '+ rota);

      // Esconde todos os conteudos de todos os grupos.
      aplic.evts.trigger('grupos-conteudos:esconder');

      // Esconde todos os grupos do conteudo do painel
      aplic.evts.trigger('painel-grupos:esconder');

      // não apresenta qualquer aviso anteriormente apresentada no painel.
      aplic.evts.trigger('painel-avisos:esconder');

      if (rota === 'GrupoUm') { 

        // esconde avisos do grupo um
        aplic.evts.trigger('grupo-um-avisos:esconder');

        // mostra o grupo um do painel.
        aplic.evts.trigger('painel-grupo:mostrar', 'div.grupo-um');
        
        // selecionamos um item do menu de navegação do topo.
        aplic.evts.trigger('item-navegacao-topo:selecionar', 'ul.menu-painel-topo li.item-grupo-um'); 
      } else if (rota === 'GrupoDois') {

        // mostra o grupo dois do painel.
        aplic.evts.trigger('painel-grupo:mostrar', 'div.grupo-dois');

        // selecionamos um item do menu de navegação do topo.
        aplic.evts.trigger('item-navegacao-topo:selecionar', 'ul.menu-painel-topo li.item-grupo-dois');
      } else if (rota === 'GrupoTres') {

        // mostra o grupo três do painel.
        aplic.evts.trigger('painel-grupo:mostrar', 'div.grupo-tres');
      } 
    }
  }

  var Uniao = {};
  _.extend(Uniao, Base);
  _.extend(Uniao, Rotas);

  return Uniao;
});