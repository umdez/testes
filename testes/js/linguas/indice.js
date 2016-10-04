/* Registrar mensagens do nosso sistema para depuração com suporte I18n. 
 * https://github.com/umdez/Localizado/blob/master/README.md 
 */

define([ 
  'localidade'
, 'text!linguas/localidade/pt_br.json'
], function(
  Localidade
, ptbrJson
) {
  'use strict';

  var localidade = new Localidade({
    pt_BR: 'pt_BR'
  });

  localidade.carregar(localidade.pt_BR, JSON.parse(ptbrJson));
  localidade.adicionarLocalidade(localidade.pt_BR);
  
  return localidade;
});