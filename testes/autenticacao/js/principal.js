define([ 
  "aplicativo"
, "roteador"
], function(
  aplicativo
, Roteador
) {
  'use strict';

  aplicativo.roteador = new Roteador();

  aplicativo.sessao.entrar({'jid': 'fulana@localhost', 'senha': 'montes'}, {
    'sucesso': function(modelo, resposta, opcoes) {

        aplicativo.sessao.seAutenticado({

          'sucesso': function(modelo, resposta, opcoes) {
              var conta = aplicativo.sessao.conta;
              var escopos = conta.funcao.get('Escopos');
              var seAutenticado = aplicativo.sessao.get('autenticado');

              _.each(escopos, function(escopo, indice, escopos){
                
                if (escopo && escopo.nome === 'Projetos') {
                  console.log(seAutenticado + '  ' + escopo.bandeira)
                }
              }, this);
              
              aplicativo.sessao.sair({
                'sucesso': function(modulo, resposta) {
                
                },
                'erro': function(erro){
                    
                }
              });
            
          },
          'erro': function(modelo, resposta, opcoes) {
            
          }
      });
    },
    'erro': function(modelo, resposta, opcoes) {
      console.log(modelo.status + ' '+ JSON.parse(modelo.responseText).mensagem);
    }
  });

  aplicativo.sessao.seAutenticado({
    'sucesso': function(modelo, resposta, opcoes) {
      
    },
    'erro': function(modelo, resposta, opcoes) {
      
    }
  });

  aplicativo.sessao.on("change:autenticado", function(){
    var seAutenticado = aplicativo.sessao.get('autenticado');
    console.log('autenticado?? ' + seAutenticado);
    console.log('nome?? ' + aplicativo.sessao.conta.get('nome'));
    console.log('Escopos?? ' + aplicativo.sessao.conta.funcao.get('Escopos'))
  }, this);

  var inicializar = function() {

  };

  return {
    inicializar: inicializar
  };

});