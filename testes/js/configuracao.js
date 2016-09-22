'use strict';

/* Arquivo de configuração da biblioteca require.js.
 */

/* O require.js nos habilita a realizar uma configuração dos atalhos dos
 * modulos. Também é responsável pelo carregamento ordenado dos módulos
 * utilizando dependencias.
 *
 * @Diretiva {baseUrl} (Obrigatório) O caminho base onde os scripts serão
 * requisitados.
 * 
 * @Diretiva {waitSeconds} (Opcional mas Recomendado) Limite em segundos do
 * total de segundos que serão esperados para o carregamento total de
 * determinado script.
 * 
 * @Diretiva {paths} (Opcional) O caminho onde determinado módulo se encontra.
 * 
 * @Diretiva {shim} (Opcional) Realizamos o carregamento de scripts e suas
 * dependencias que não são compativeis com o padrão AMD.
 */
require.config({
  
  // Base de onde os scripts serão requisitados.
  baseUrl: "/js",
  
  // Quantidade de segundos para desistir de carregar um módulo.
  waitSeconds: 7,
  
  // Os caminhos de cada um dos nossos modulos.
  paths: {
    'text': '/bibliotecas/text'                              // Para carregamento de arquivos. por exemplo, os arquivos .html
  , 'underscore': '/bibliotecas/underscore.min'
  , 'backbone': '/bibliotecas/backbone.min'                  // Backbone
  , 'backbone.paginator': '/bibliotecas/backbone.paginator'  // Adicionar paginação ao BackBone. @veja https://github.com/backbone-paginator/backbone.paginator
  , 'jquery': '/bibliotecas/jquery.min'
  , 'domready': '/bibliotecas/domready'
  , 'strophe': '/bibliotecas/strophe.min'
  , 'parsley': '/bibliotecas/parsley/parsley.min'
  , 'parsley.ptbr': '/bibliotecas/parsley/pt-br'
  , 'handlebars': '/bibliotecas/handlebars'
  , 'bootstrap': '/bibliotecas/bootstrap.min'
  , 'jasny': '/bibliotecas/jasny-bootstrap.min'
  },
  
  // Lembre-se: Somente usar o shim para aqueles scripts que não são AMD. Ele
  // não vai funcionar corretamente se informado um script AMD.
  shim: {
    
    'bootstrap': {
      deps: [ 'jquery' ]
    },
    'underscore': {
      exports: '_'  
    },
    'parsley.ptbr': {
      deps: [ 'parsley']
    },
    'jasny': {  
      deps: [ 'bootstrap' ]
    }
  }

});

require([
  'principal' 
, 'aplicativo'
, 'domready'    
], function(Principal, aplicativo, quandoCarregado) {

  console.log('(configuracao) Pontapé inicial.')

  quandoCarregado(function() {  
    console.log('(configuracao) DOM carregado e pronto.');
    Principal.inicializar();
  });
});