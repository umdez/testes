
/* Aqui vamos adicionar as caracteristicas de trabalhar com as rotas, Carregar
 * os arquivos de visão etc.  
 */
  
define([
  "aplicativo"
, "backbone"
, "registrador"
, "gdv"
, "visoes/base/base"
], function(
  aplicativo
, Backbone
, Regis
, GDV
, VisaoDeBase
) {
  'use strict';
  
  var Registro = Regis.reg.bind({ envolucro: 'roteador' });

  var SitioRoteador = Backbone.Router.extend({
    
    routes: {
      '':            'inicio'
    , ':modulo':     'asRotasDeUmNivel'
    , ':modulo/:id': 'asRotasDeDoisNiveis'
    },
    
    initialize: function () {
      this.visaoDeBase = GDV.reusarVisao("VisaoDeBase", function() {
        return new VisaoDeBase();
      });
    },
    
    inicio: function() {
      Registro(Regis.BAIXO, 'Acessando rota de inicio.');
    },
    
    asRotasDeUmNivel: function(modulo) {
      Registro(Regis.BAIXO, 'Acessando rota de um nivel.');
      aplicativo.buscarRota(modulo, null);
    },

    asRotasDeDoisNiveis: function(modulo, id) {
      Registro(Regis.BAIXO, 'Acessando rota de dois niveis.');
      aplicativo.buscarRota(modulo, id);
    }
    
  });
  
  var inicializar = function() {
    
    var roteamento = function() {
      aplicativo.roteador = new SitioRoteador();
      Backbone.history.start(); 
      Registro(Regis.BAIXO, 'Roteador e historio de rotas iniciados com sucesso.');
    }
    
    aplicativo.sessao.seAutenticado({
      'sucesso': function(modelo, resposta, opcoes) {
        Registro(Regis.BAIXO, 'Usuario autenticado com sucesso.');
        roteamento();
      },
      'erro': function(modelo, resposta, opcoes) {
        Registro(Regis.ALTO, 'Erro: ['+ modelo.status + '] ('+ JSON.parse(modelo.responseText).mensagem +')');
        roteamento();
      }
    });
  };

  return { 
    inicializar: inicializar
  };
});