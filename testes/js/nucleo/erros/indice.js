define([ 
  "aplicativo"
, "nucleo/erros/frases"
], function(
  aplic
, mapaDeErrosDeEstatos
) {
  'use strict';
  
  var ErrosDeRequisicao = {

    formatarMsgDeErro: function(xhr, excessao, acao) {
        
      var mensagem;
      
      if (xhr.status) {
        mensagem = mapaDeErrosDeEstatos[acao][xhr.status];
        if(!mensagem) {
          mensagem = mapaDeErrosDeEstatos['estaticos']['DESCONHECIDO'];
        }
      } else if(excessao == 'parsererror'){
        mensagem = mapaDeErrosDeEstatos['estaticos']['ANALISE'];
      } else if(excessao == 'timeout'){
        mensagem = mapaDeErrosDeEstatos['estaticos']['TEMPO_ESGOTADO'];
      } else if(excessao == 'abort'){
        mensagem = mapaDeErrosDeEstatos['estaticos']['ABORTAR'];
      } else {
        mensagem = mapaDeErrosDeEstatos['estaticos']['DESCONHECIDO'];
      }
      return mensagem;
    }

  };

  var VisaoDeErrosDeEstatos = Backbone.View.extend({
    
    el: 'body > div#conteudo-raiz',

    initialize: function() {
      this.listenTo(aplic.evts, 'erro-de-estatos:apresentar', this.apresentar);
      this.listenTo(aplic.evts, 'erro-de-estatos:esconder', this.esconder);
    },

    apresentar: function(envolucro, envolucroMsg, xhr, excessao, acao) {
      var $envolucro = this.$el.find(envolucro);
      var $envolucroMsg = $envolucro.find(envolucroMsg);
     
      var msg = ErrosDeRequisicao.formatarMsgDeErro(xhr, excessao, acao);

      $envolucroMsg.text(msg);
      $envolucro.show();
    },

    esconder: function(envolucro, envolucroMsg) {
      var $envolucro = this.$el.find(envolucro);
      var $envolucroMsg = $envolucro.find(envolucroMsg);
      
      $envolucroMsg.text("");
      $envolucro.hide();
    }
  });

  var visaoDeErrosDeEstatos = new VisaoDeErrosDeEstatos({});
});