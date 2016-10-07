define([ 
  "aplicativo"
, "nucleo/erros/frases"
], function(
  aplic
, mapaDeErrosDeEstatos
) {
  'use strict';
  
  var VisaoDeErrosDeEstatos = Backbone.View.extend({
    
    el: 'body > div#conteudo-raiz',

    initialize: function() {
      this.listenTo(aplic.evts, 'erro-de-estatos:apresentar', this.apresentar);
      this.listenTo(aplic.evts, 'erro-de-estatos:esconder', this.esconder);
    },

    formatarMsgDeErro: function(xhr, excessao, acao) {
      var mensagem;
      var estatos = xhr.status;
     
      if (estatos) {
        mensagem = mapaDeErrosDeEstatos[acao][estatos];
        
        if (mensagem == 'APRESENTAR_RESPOSTA_DO_SERVIDOR') {
          // Caso a mensagem que nos importe seja informada pelo servidor, então
          // nós a pegamos.
          mensagem = xhr.responseText ? JSON.parse(xhr.responseText).mensagem : "Não contêm mensagem de resposta";
        } else if (!mensagem) {
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
    },

    apresentar: function($envolucro, xhr, excessao, acao) {
      var $envolucroMsg = $envolucro.find('span#mensagem');

      $envolucroMsg.text(this.formatarMsgDeErro(xhr, excessao, acao));
      $envolucro.show();
    },

    esconder: function($envolucro) {
      $envolucro.hide();
    }
  });

  var visaoDeErrosDeEstatos = new VisaoDeErrosDeEstatos({});
});