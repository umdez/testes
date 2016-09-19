
/* Realiza a troca de visões dos grupos do nosso painel principal.
 */

define([
  "aplicativo"
, "modulos/baseDasRotas"
], function (
  aplicativo
, Base
) {
  'use strict';

  var Rotas = {

    visaoDoPainel: null,
    visaoDoTopoPainel: null,
    visaoDosGruposPainel: null,

    iniciar: function() {
      aplicativo.adcRota('GrupoUm', this.suporte.bind(this));
      aplicativo.adcRota('GrupoDois', this.suporte.bind(this));
      aplicativo.adcRota('GrupoTres', this.suporte.bind(this));
    },

    suporte: function(rota, id) {

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