
define([ 
  "aplicativo"
, "backbone"
], function(
  aplicativo
, Backbone
) {
  'use strict';
  
  var PERMISSAO_ACESSAR = 0x00000001;  // Ler ou Listar
  var PERMISSAO_CADASTRAR = 0x00000002;
  var PERMISSAO_REMOVER = 0x00000004;
  var PERMISSAO_ATUALIZAR = 0x00000008;
  var PERMISSAO_SUPERIOR = 0x00000040;  // Acesso completo

  var acoes = {
    "LEITURA": PERMISSAO_ACESSAR  
  , "CADASTRO": PERMISSAO_CADASTRAR
  , "REMOCAO": PERMISSAO_REMOVER
  , "ATUALIZACAO": PERMISSAO_ATUALIZAR
  };

  var Escopos = {
    
  };
 
  return {
    sePermitido: function(modelo, acao) {

      var sessao = aplicativo.sessao;

      if (sessao.get('autenticado')) {
        var escopos = sessao.conta.funcao.get('Escopos');
        console.log(escopos);
      }
      return false;

     // var permissao = PERMISSAO_SUPERIOR;
     // permissao |= acoes[acao];

     // return ;
    }
  };
});