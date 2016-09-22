define([ 
  "aplicativo"
, 'jasny'
, "parsley.ptbr"
, "modulos/grupos/indice"
, "modulos/usuario/indice"
, "modulos/exemplo/indice"
, "modulos/funcao/indice"
], function(
  aplic
, Jasny
, parsleyPtBr
, ModuloDosGrupos
, ModuloDeUsuario
, ModuloDeExemplo
, ModuloDeFuncao
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/indice' });
 
  Registrar('BAIXO', 'Os modulos foram todos carregados.');

  return {
    'grupos': ModuloDosGrupos,
    'usuario': ModuloDeUsuario,
    'exemplo': ModuloDeExemplo,
    'funcao': ModuloDeFuncao
  }
});