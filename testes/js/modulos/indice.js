define([ 
  "aplicativo"
, 'jasny'
, "parsley.ptbr"
, 'stickit'
, "i18n/indice"
, "modulos/grupos/indice"
, "modulos/usuario/indice"
, "modulos/exemplo/indice"
, "modulos/funcao/indice"
, "modulos/exemploVisaoReusada/indice"
], function(
  aplic
, Jasny
, parsleyPtBr
, stickit
, Lingua
, ModuloDosGrupos
, ModuloDeUsuario
, ModuloDeExemplo
, ModuloDeFuncao
, ModuloExemploVisaoReusada
) {
  'use strict';

  var Registrar = _.bind(aplic.registrar, { envolucro: 'modulos/indice' });
 
  Registrar('BAIXO', Lingua.gerar('MODULO.INFO.MODULOS_CARREGADOS'));

  return {
    'grupos': ModuloDosGrupos,
    'usuario': ModuloDeUsuario,
    'exemplo': ModuloDeExemplo,
    'funcao': ModuloDeFuncao
  };
});