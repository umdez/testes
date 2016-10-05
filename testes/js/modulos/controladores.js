/* Contêm métodos utilizados por vários controladores de vários módulos. */

define([
  "aplicativo"
, "utilitarios/gdv"
], function (
  aplic
, GDV
) {
  'use strict';

  var BaseDosControladores = {

    verificarPermissao: function(acao, cd) {
      var escopos = aplic.escopos;

      escopos.verificarPermissao(this.nome, acao, function(sePermitido) {
        cd(sePermitido);
      });
    },
 
    verificarUmaPermissaoDeAcesso: function (acao, cd, msg) {
      this.verificarPermissao(acao, function(sePermitido) {
        if (sePermitido) {
          if ('prosseguir' in cd) cd.prosseguir();
        } else {
          if ('impedir' in cd) cd.impedir(msg);
        }
      });
    },

    Rotas: aplic.adcRotas(),

    executarAcoes: function(acoes, cd) {
      _(acoes).reduceRight(_.wrap, cd)();
    },

    procurarUmModelo: function(dados, colecao, modelo, cd) {
      return function(proximo) { 
        modelo.fetch({
          success: function (modeloRequisitado, resposta, opcoes) {
            if (colecao) {
              colecao.add(modelo, {merge: true});
            }
            if ('sucesso' in cd) cd.sucesso(modelo);
            proximo(dados)
          }
        , error: function (modeloRequisitado, resposta, opcoes) {
            if ('erro' in cd) cd.erro(null);
          }
        });
      }
    },

    sePropriedadeExiste: function(modelo, propriedade, cd) {
      return function(proximo, dados) { 
        var prop = modelo.get(propriedade);

        if (!prop) {
          if ('erro' in cd) cd.erro(null);
        } else {
          if ('sucesso' in cd) cd.sucesso(prop);
          proximo(dados);
        }
      }
    }

  };
 
  var Uniao = {};
  _.extend(Uniao, GDV);
  _.extend(Uniao, BaseDosControladores);

  return Uniao;
});