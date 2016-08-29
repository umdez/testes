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
  baseUrl: "/autenticacao/js",
  
  // Quantidade de segundos para desistir de carregar um módulo.
  waitSeconds: 7,
  
  // Os caminhos de cada um dos nossos modulos.
  paths: {
    'text': '/bibliotecas/text'                              // Para carregamento de arquivos em texto. por exemplo, arquivos .html
  , 'underscore': '/bibliotecas/underscore.min'
  , 'backbone': '/bibliotecas/backbone.min'                  // Backbone
  , 'backbone.paginator': '/bibliotecas/backbone.paginator'  // Adicionar paginação ao BackBone. @veja https://github.com/backbone-paginator/backbone.paginator
  , 'jquery': '/bibliotecas/jquery.min'
  , 'domready': '/bibliotecas/domready'
  },
  
  // Lembre-se: Somente usar o shim para aqueles scripts que não são AMD. Ele
  // não vai funcionar corretamente se informado um script AMD.
  shim: {
    
    'backbone': {
      deps: ['underscore', 'jquery'], // As dependencias do backbone
      exports: 'Backbone'             // Ao ser carregado, use a variavel global 'Backbone' como valor do modulo.
    },
    'underscore': {
      exports: '_'  
    }
  }

});

require([
  'principal'  
, 'domready'    // Vamos esperar o DOM estiver apresentado e carregado.
], function(Principal, quandoCarregado) {
  
  quandoCarregado(function() {  

    Principal.inicializar();
  });
});