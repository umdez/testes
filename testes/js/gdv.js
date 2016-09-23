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
    visoes: [],
  
    /* Fecha uma visão existente. 
     */
    fecharVisao: function(envolucro, nome) {
      if (typeof this.visoes[envolucro][nome] !== 'undefined') {
        // Limpa a visão removendo todos os eventos delegados a visão.
        this.visoes[envolucro][nome].undelegateEvents();
        // Remove a visão do DOM.
        this.visoes[envolucro][nome].remove();
        // Remove todas as funções CDs (callbacks)
        this.visoes[envolucro][nome].off();
        
        // Se a visão possuir uma função para chamarmos depois da limpeza.
        if (typeof this.visoes[envolucro][nome].aoFechar === 'function') {
          this.visoes[envolucro][nome].aoFechar();
        }
      }
    },
    
    /* Sempre limpa uma visão existente antes de criar uma nova visão. 
     */
    criarVisao: function(envolucro, nome, cd) {
      console.log('(GDV) Criando a visão '+ nome +' do envolucro '+ envolucro);
      if (typeof this.visoes[envolucro] !== 'undefined') {
        this.fecharVisao(envolucro, nome);
        this.visoes[envolucro][nome] = cd();
      } else {
        this.visoes[envolucro] = [];
        this.visoes[envolucro][nome] = cd();
      }
      
      // Chamada sempre que a visão for ser recriada
      if (typeof this.visoes[envolucro][nome].aoRecriar === 'function') {
        this.visoes[envolucro][nome].aoRecriar();
      }

      return this.visoes[envolucro][nome];
    },

    /* Sempre retorna uma visão existente ou chamará cd() para criar uma nova.
     */
    reusarVisao: function(envolucro, nome, cd) {
      console.log('(GDV) Reusando a visão '+ nome +' do envolucro '+ envolucro);
      if ((typeof this.visoes[envolucro] !== 'undefined') ) {
        if (typeof this.visoes[envolucro][nome] === 'undefined') {
           this.visoes[envolucro][nome] = cd();
        } 
      } else {
        this.visoes[envolucro] = [];
        // Executa cd() para retornar nova visão.
        this.visoes[envolucro][nome] = cd();
      }

      // Chamada sempre que a visão for ser reusada
      if (typeof this.visoes[envolucro][nome].aoReusar === 'function') {
        this.visoes[envolucro][nome].aoReusar();
      }

      return this.visoes[envolucro][nome];
    }
 
  };

  console.log('(gdv) Gerente de visões foi carregado com sucesso.');

  return GDV;
});