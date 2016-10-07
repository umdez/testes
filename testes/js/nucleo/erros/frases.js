/* frases dos erros esperados e aqueles estáticos. 
 * fonte: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes 
 */

define([ 
  "i18n/indice"
], function(
  Lingua
) {
  'use strict';

  var mapaDeErrosDeEstatos = [];

  // Erros estáticos
  mapaDeErrosDeEstatos['estaticos'] = {
    'ANALISE': Lingua.gerar('ERROS_DE_REQUISICAO.ANALISE'),
    'TEMPO_ESGOTADO': Lingua.gerar('ERROS_DE_REQUISICAO.TEMPO_ESGOTADO'),
    'ABORTAR': Lingua.gerar('ERROS_DE_REQUISICAO.ABORTAR'),
    'DESCONHECIDO': Lingua.gerar('ERROS_DE_REQUISICAO.DESCONHECIDO')
  };
  
  // erros que serão extendidos
  var errosDeBase = {
    '400' : Lingua.gerar('ERROS_BASE_DE_REQUISICAO.400'),
    '401' : Lingua.gerar('ERROS_BASE_DE_REQUISICAO.401'),
    '403' : Lingua.gerar('ERROS_BASE_DE_REQUISICAO.403'),
    '404' : Lingua.gerar('ERROS_BASE_DE_REQUISICAO.404'),
    '500' : Lingua.gerar('ERROS_BASE_DE_REQUISICAO.500'),
    '503' : Lingua.gerar('ERROS_BASE_DE_REQUISICAO.503')
  };
 
  // Erros relacionados a entrada no painel do sistema.
  mapaDeErrosDeEstatos['entrarNoPainel'] = _.extend({}, errosDeBase, {
    '400' : Lingua.gerar('ERROS_AO_REALIZAR_ENTRADA.400'),
    '401' : 'APRESENTAR_RESPOSTA_DO_SERVIDOR',
    '429' : Lingua.gerar('ERROS_AO_REALIZAR_ENTRADA.429')
  });

  // Erros relacionados ao cadastro de usuários.
  mapaDeErrosDeEstatos['cadastrarUsuario'] = _.extend({}, errosDeBase, {
    '400' : 'APRESENTAR_RESPOSTA_DO_SERVIDOR',
    '429' : Lingua.gerar('ERROS_AO_CADASTRAR_USUARIO.429')
  });

  // Erros relacionados a leitura dos dados de usuário.
  mapaDeErrosDeEstatos['salvarUsuario'] =  _.extend({}, errosDeBase, {
    '400' : 'APRESENTAR_RESPOSTA_DO_SERVIDOR',
    '429' : Lingua.gerar('ERROS_AO_SALVAR_USUARIO.429')
  });

  return mapaDeErrosDeEstatos;
});