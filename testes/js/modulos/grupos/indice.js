
/* Realiza a troca de visões dos grupos do nosso painel principal.
 */

define([
  "aplicativo"
, "registrador"
, "modulos/baseDasRotas"
], function (
  aplicativo
, Regis
, Base
) {
  'use strict';

  var Registro = Regis.reg.bind({ envolucro: 'indice' });

  var Rotas = {

    visaoDoPainel: null,
    visaoDoTopoPainel: null,
    visaoDosGruposPainel: null,

    visaoDoGrupoUm: null,

    iniciar: function() {
      aplicativo.adcRota('GrupoUm', this.suporte.bind(this));
      aplicativo.adcRota('GrupoDois', this.suporte.bind(this));
      aplicativo.adcRota('GrupoTres', this.suporte.bind(this));
    },

    suporte: function(rota, id) {

      var painel = this.visaoDoPainel = this.reusarVisao("VisaoBaseDePainel", function() { });
      var topoDoPainel = this.visaoDoTopoPainel = this.reusarVisao("VisaoBaseDeTopoPainel", function() { });
      var grupos = this.visaoDosGruposPainel = this.reusarVisao("VisaoGruposDoPainel", function() { });
      
      var grupoUm = this.visaoDoGrupoUm = this.reusarVisao("VisaoDoGrupoUm", function() { });

      // Esconde todos os grupos do conteudo do painel
      painel.esconderTodosOsGrupos();

      // Esconde todos os conteudos de todos os grupos.
      grupos.esconderTodosOsConteudosDosGrupos();

      // não apresenta qualquer aviso anteriormente apresentada
      painel.esconderTodosAvisos();

      if (rota === 'GrupoUm') { 
        grupoUm.esconderTodosAvisos();
        painel.mostrarUmGrupo('div.grupo-um');
        topoDoPainel.selecionarItemMenu('ul.menu-painel-topo li.item-grupo-um');
        Registro(Regis.BAIXO, 'Acesso ao grupo um.');
      } else if (rota === 'GrupoDois') {
        painel.mostrarUmGrupo('div.grupo-dois');
        topoDoPainel.selecionarItemMenu('ul.menu-painel-topo li.item-grupo-dois');
        Registro(Regis.BAIXO, 'Acesso ao grupo dois.');
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