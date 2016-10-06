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
  
  // Erros relacionados a entrada no painel do sistema.
  mapaDeErrosDeEstatos['entrada'] = {
    '102' : Lingua.gerar('ERROS_DE_ENTRADA.102'),
    '400' : Lingua.gerar('ERROS_DE_ENTRADA.400'),
    '401' : Lingua.gerar('ERROS_DE_ENTRADA.401'),
    '403' : Lingua.gerar('ERROS_DE_ENTRADA.403'),
    '500' : Lingua.gerar('ERROS_DE_ENTRADA.500'),
    '503' : Lingua.gerar('ERROS_DE_ENTRADA.503')
  };

  return mapaDeErrosDeEstatos;
});