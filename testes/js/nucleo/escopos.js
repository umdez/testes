
define([ 
  "underscore"
], function (
  _
) {
  'use strict';

  console.log('(escopos) Iniciando verificador de escopos.');

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

  var Escopos = function(aplic) {
    this.aplic = aplic;
    this.Registrar = _.bind(aplic.registrar, { envolucro: 'escopos' });
    this.sessao = aplic.sessao;
  };
 
  Escopos.prototype.verificarSessao = function(cd) {
    var meuObj = this;
    this.sessao.seAutenticado({
      'sucesso': function(modelo, resposta, opcoes) {
        cd(true);
      },
      'erro': function(xhr, err, opcoes) {
        meuObj.Registrar('ALTO', 'Um erro ocorreu ao tentar verificar a sessão.'); 
        cd(false);
      }
    }); 
  };

  Escopos.prototype.verificarEscopo = function(modelo, acao) {
    var sePossui = 0;
    var permissao = PERMISSAO_SUPERIOR;
    var conta = this.sessao.conta;
    var escopos = conta.get('Funcoes').get('Escopos');

    permissao |= acoes[acao.toUpperCase()];

    escopos.each(function(escopo, indice, contexto) {
      if (sePossui !== 0) {
        return;
      }
      if (escopo && escopo.get('nome') === modelo) {
        var bandeira = escopo.get('bandeira');
        sePossui = (bandeira & permissao);
      }
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