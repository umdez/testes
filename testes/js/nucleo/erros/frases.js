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
  
  mapaDeErrosDeEstatos['verificarSessao'] = {
    '102' : Lingua.gerar('ERROS_DE_ENTRADA.102'),
    '400' : Lingua.gerar('ERROS_DE_ENTRADA.400'),
    '401' : Lingua.gerar('ERROS_DE_ENTRADA.401'),
    '403' : Lingua.gerar('ERROS_DE_ENTRADA.403'),
    '500' : Lingua.gerar('ERROS_DE_ENTRADA.500'),
    '503' : Lingua.gerar('ERROS_DE_ENTRADA.503')
  };

  // Erros relacionados a entrada no painel do sistema.
  mapaDeErrosDeEstatos['entrarNoPainel'] = {
    '102' : Lingua.gerar('ERROS_DE_ENTRADA.102'),
    '400' : Lingua.gerar('ERROS_DE_ENTRADA.400'),
    '401' : Lingua.gerar('ERROS_DE_ENTRADA.401'),
    '403' : Lingua.gerar('ERROS_DE_ENTRADA.403'),
    '500' : Lingua.gerar('ERROS_DE_ENTRADA.500'),
    '503' : Lingua.gerar('ERROS_DE_ENTRADA.503')
  };

  // Erros relacionados ao cadastro de usuários.
  mapaDeErrosDeEstatos['cadastrarUsuario'] = {
    '102' : Lingua.gerar('ERROS_DO_CADASTRO_DE_USUARIO.102'),
    '400' : Lingua.gerar('ERROS_DO_CADASTRO_DE_USUARIO.400'),
    '401' : Lingua.gerar('ERROS_DO_CADASTRO_DE_USUARIO.401'),
    '403' : Lingua.gerar('ERROS_DO_CADASTRO_DE_USUARIO.403'),
    '500' : Lingua.gerar('ERROS_DO_CADASTRO_DE_USUARIO.500'),
    '503' : Lingua.gerar('ERROS_DO_CADASTRO_DE_USUARIO.503')
  };

  // Erros relacionados a leitura dos dados de usuário.
  mapaDeErrosDeEstatos['lerUsuario'] = {
    '102' : Lingua.gerar('ERROS_DA_LEITURA_DE_USUARIO.102'),
    '400' : Lingua.gerar('ERROS_DA_LEITURA_DE_USUARIO.400'),
    '401' : Lingua.gerar('ERROS_DA_LEITURA_DE_USUARIO.401'),
    '403' : Lingua.gerar('ERROS_DA_LEITURA_DE_USUARIO.403'),
    '500' : Lingua.gerar('ERROS_DA_LEITURA_DE_USUARIO.500'),
    '503' : Lingua.gerar('ERROS_DA_LEITURA_DE_USUARIO.503')
  };

  return mapaDeErrosDeEstatos;
});