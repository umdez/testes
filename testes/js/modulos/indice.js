define([ 
  "aplicativo"
, 'jasny'
, "parsley.ptbr"
, 'stickit'
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
, ModuloDosGrupos
, ModuloDeUsuario
, ModuloDeExemplo
, ModuloDeFuncao
, ModuloExemploVisaoReusada
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