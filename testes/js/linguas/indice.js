/* Registrar mensagens do nosso sistema para depuração com suporte I18n. 
 * https://github.com/umdez/Localizado/blob/master/README.md 
 */

define([ 
  'localidade'
, 'text!linguas/localidade/pt_BR.json'
], function(
  Localidade
, pt_BR
) {
  'use strict';

  var localidade = new Localidade({
    pt_BR: 'pt_BR'
  });

  localidade.carregar(localidade.pt_BR, JSON.parse(pt_BR));
  localidade.adicionarLocalidade(localidade.pt_BR);
  
  return localidade;
});