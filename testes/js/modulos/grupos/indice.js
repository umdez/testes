
/* Realiza a troca de visões dos grupos do nosso painel principal.
 */

define([
  "aplicativo"
, "modulos/baseDasRotas"
], function (
  aplic
, Base
) {
  'use strict';
 
  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/grupos/indice' });

  Registrar('BAIXO', 'Iniciando o modulo de grupos.');

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

      var painel = this.visaoDoPainel = this.reusarVisao("VisaoBaseDePainel", function() { });
      var topoDoPainel = this.visaoDoTopoPainel = this.reusarVisao("VisaoBaseDeTopoPainel", function() { });
      var grupos = this.visaoDosGruposPainel = this.reusarVisao("VisaoGruposDoPainel", function() { });

      // Esconde todos os grupos do conteudo do painel
      painel.esconderTodosOsGrupos();

      // Esconde todos os conteudos de todos os grupos.
      grupos.esconderTodosOsConteudosDosGrupos();

      // não apresenta qualquer aviso anteriormente apresentada
      painel.esconderTodosAvisos();

      if (rota === 'GrupoUm') { 
        var grupoUm = this.reusarVisao("VisaoDoGrupoUm", function() { });

        grupoUm.esconderTodosAvisos();
        painel.mostrarUmGrupo('div.grupo-um');
        topoDoPainel.selecionarItemMenu('ul.menu-painel-topo li.item-grupo-um');
      } else if (rota === 'GrupoDois') {
        painel.mostrarUmGrupo('div.grupo-dois');
        topoDoPainel.selecionarItemMenu('ul.menu-painel-topo li.item-grupo-dois');
      } else if (rota === 'GrupoTres') {
        painel.mostrarUmGrupo('div.grupo-tres');
      } 
    }
  }

  var Uniao = {};
  _.extend(Uniao, Base);
  _.extend(Uniao, Rotas);

  Uniao.iniciar();
});