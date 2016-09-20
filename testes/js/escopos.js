
define([ 
  "underscore"
, "registrador"
], function (
  _
, Regis
) {
  'use strict';
  
  var Registro = Regis.reg.bind({ envolucro: 'escopos' });

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

  var Escopos = function(sessao) {
    this.sessao = sessao;
  };
 
  Escopos.prototype.verificarSessao = function(cd) {
    this.sessao.seAutenticado({
      'sucesso': function(modelo, resposta, opcoes) {
        cd(true);
      },
      'erro': function(modelo, resposta, opcoes) {
        Registro(Regis.ALTO, 'Erro: ['+ modelo.status + '] ('+ JSON.parse(modelo.responseText).mensagem +')');
        cd(false);
      }
    });
  };

  Escopos.prototype.verificarEscopo = function(modelo, acao) {
    var sePossui = 0;
    var permissao = PERMISSAO_SUPERIOR;
    var conta = this.sessao.conta;
    var escopos = conta.funcao.get('Escopos');

    permissao |= acoes[acao.toUpperCase()];

    _.find(escopos, function(escopo){ 
      if (escopo && escopo.nome === modelo) {
        var bandeira = escopo.bandeira;
        sePossui = (bandeira & permissao);
      }
      return (sePossui != 0);
    });
    return (sePossui != 0);
  };

  Escopos.prototype.verificarPermissao = function(modelo, acao, cd) {
    var meuObj = this;

    this.verificarSessao(function(seAceito) {
      var sePermitido = 0;

      if (seAceito) {
        sePermitido = meuObj.verificarEscopo(modelo, acao);
      } 
      cd((sePermitido != 0));
    });
  };

  return Escopos;
});