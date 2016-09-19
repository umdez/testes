/* Um gerente de visões para o BackBone.
 * @Veja https://github.com/umdez/backbone-utilitarios/tree/master/GDV#readme 
 */

define([

], function (

) {
  'use strict';

  var GDV = {

    /* Possui todas as referencias às visões existentes. 
     */
    visoes: {},
  
    /* Fecha uma visão existente. 
     */
    fecharVisao: function(nome) {
      if (typeof this.visoes[nome] !== 'undefined') {
        // Limpa a visão
        // Remove todos os eventos delegados a visão.
        this.visoes[nome].undelegateEvents();
        // Remove a visão do DOM.
        this.visoes[nome].remove();
        // Remove todas as funções CDs (callbacks)
        this.visoes[nome].off();
        
        // Se a visão possuir uma função para chamarmos depois da limpeza.
        if (typeof this.visoes[nome].aoFechar === 'function') {
          this.visoes[nome].aoFechar();
        }
      }
    },
    
    /* Sempre limpa uma visão existente antes de criar uma nova visão. 
     */
    criarVisao: function(nome, cd) {
      this.fecharVisao(nome);
      this.visoes[nome] = cd();
      return this.visoes[nome];
    },

    /* Sempre retorna uma visão existente ou chamará cd() para criar uma nova.
    */
    reusarVisao: function(nome, cd) {
      
      if (typeof this.visoes[nome] !== 'undefined') {
        return this.visoes[nome];
      }
      // Executa cd() para retornar nova visão.
      this.visoes[nome] = cd();
      return this.visoes[nome];
    }
 
  };

  return GDV;
});