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
  
    verificarEnvolucro: function(envolucro) {
      return (typeof this.visoes[envolucro] !== 'undefined');
    },

    verificarVisao: function(envolucro, nome) {
      if (this.verificarEnvolucro(envolucro)) {
        return (typeof this.visoes[envolucro][nome] !== 'undefined');
      }
      return false;
    },

    verificarSubVisao: function(envolucro, nomeVisao, nomeSubVisao) {
      if (this.verificarVisao(envolucro, nomeVisao)) {
        return (typeof this.visoes[envolucro][nomeVisao].subVisoes[nomeSubVisao] !== 'undefined');
      }
      return false;
    },

    buscarEnvolucro: function(envolucro) {
      if (this.verificarEnvolucro(envolucro)) {
        return this.visoes[envolucro];
      } 
      console.log('(gdv) O envolucro '+ envolucro + 'não foi encontrado');
      return null;
    },

    buscarVisao: function(envolucro, nome) {
      if (this.verificarVisao(envolucro, nome)) {
        return this.visoes[envolucro][nome];
      } 
      console.log('(gdv) A visão '+ nome + 'não foi encontrado');
      return null;
    },

    buscarSubVisao: function(envolucro, nomeVisao, nomeSubVisao) {
      if (this.verificarSubVisao(envolucro, nomeVisao, nomeSubVisao)) {
        return this.visoes[envolucro][nome].subVisoes[nomeSubVisao];
      }
      console.log('(gdv) A sub visão '+ nomeSubVisao + 'não foi encontrada.');
      return null;
    },

    /* Fecha uma visão existente. 
     */
    fecharVisao: function(visao) {
      if (typeof visao !== 'undefined') {
        // Limpa a visão removendo todos os eventos delegados a visão.
        visao.undelegateEvents();
        // Remove a visão do DOM.
        visao.remove();
        // Remove todas as funções CDs (callbacks)
        visao.off();
      
        // Se a visão possuir uma função para chamarmos depois da limpeza.
        if (typeof visao.aoFechar === 'function') {
          visao.aoFechar();
        }
      }
    },
    
    /* Sempre limpa uma visão existente antes de criar uma nova visão. 
     */
    criarVisao: function(envolucro, nome, cd) {
      console.log('(GDV) Criando a visão '+ nome +' do envolucro '+ envolucro);
      
      var seEnvolucroJaExiste = this.verificarEnvolucro(envolucro);
      var seVisaoJaExiste = this.verificarVisao(envolucro, nome);
      var seEnvolucroNaoExiste = !seEnvolucroJaExiste;
      var seVisaoNaoExiste = !seVisaoJaExiste;

      if (seEnvolucroJaExiste && seVisaoJaExiste) {
        // envolucro e visão já iniciados
        this.fecharVisao(this.visoes[envolucro][nome].visao);
        this.visoes[envolucro][nome].visao = cd();
      } else if (seEnvolucroJaExiste && seVisaoNaoExiste) {
        // apenas a visao ainda não existe
        this.visoes[envolucro][nome] = {
          visao: null,
          subVisoes: [ ]
        };
        this.visoes[envolucro][nome].visao = cd();
      } else if (seEnvolucroNaoExiste) {
        // envolucro e visão tem que ser iniciados
        this.visoes[envolucro] = [];
        this.visoes[envolucro][nome] = {
          visao: null,
          subVisoes: [ ]
        };
        this.visoes[envolucro][nome].visao = cd();
      }
      
      // Chamada sempre que a visão for ser recriada
      if (typeof this.visoes[envolucro][nome].visao.aoRecriar === 'function') {
        this.visoes[envolucro][nome].visao.aoRecriar();
      }

      return this.visoes[envolucro][nome].visao;
    },

    /* Sempre retorna uma visão existente ou chamará cd() para criar uma nova.
     */
    reusarVisao: function(envolucro, nome, cd) {
      console.log('(GDV) Reusando a visão '+ nome +' do envolucro '+ envolucro);

      var seEnvolucroJaExiste = this.verificarEnvolucro(envolucro);
      var seVisaoJaExiste = this.verificarVisao(envolucro, nome);
      var seEnvolucroNaoExiste = !seEnvolucroJaExiste;
      var seVisaoNaoExiste = !seVisaoJaExiste;

      if (seEnvolucroJaExiste && seVisaoNaoExiste) {
        // Cria mais uma visão para o envolucro já iniciado
        this.visoes[envolucro][nome] = {
          visao: null,
          subVisoes: [ ]
        };
        this.visoes[envolucro][nome].visao = cd();
      } else if (seEnvolucroNaoExiste) {
        // inicia envolucro e também uma visão
        this.visoes[envolucro] = [];
        this.visoes[envolucro][nome] = {
          visao: null,
          subVisoes: [ ]
        };
        // Executa cd() para retornar nova visão.
        this.visoes[envolucro][nome].visao = cd();
      }

      // Chamada sempre que a visão for ser reusada
      if (typeof this.visoes[envolucro][nome].visao.aoReusar === 'function') {
        this.visoes[envolucro][nome].visao.aoReusar();
      }

      return this.visoes[envolucro][nome].visao;
    },

    removerVisao: function() {

    },

    /* recria uma subvisão para determinada visão 
     */
    criarSubVisao: function(opcoes, cd) {
      var envolucro = opcoes.envolucro;
      var nomeVisao = opcoes.visao;
      var nomeSubVisao = opcoes.subVisao;

      var seVisaoExiste = this.verificarVisao(envolucro, nomeVisao);
      var seSubVisaoExiste = this.verificarSubVisao(envolucro, nomeVisao, nomeSubVisao);
      var visao = this.buscarVisao(envolucro, nomeVisao);
      
      if (seVisaoExiste) {
        if (seSubVisaoExiste) {
          this.fecharVisao(visao.subVisoes[nomeSubVisao]); 
        } 
        visao.subVisoes[nomeSubVisao] = cd();

        // Chamada sempre que a sub visão for ser recriada
        if ((typeof visao.subVisoes[nomeSubVisao].aoRecriar) === 'function') {
          visao.subVisoes[nomeSubVisao].aoRecriar();
        }
        return visao.subVisoes[nomeSubVisao];
      } else {
        console.log('(GDV) Tentando recriar sub visão de uma visão('+ nomeVisao +') que não pode ser encontrada.');
      }
      return null;
    },

    /* Reusa uma sub visao para determinada visão
     */
    reusarSubVisao: function(opcoes, cd) {
      var envolucro = opcoes.envolucro;
      var nomeVisao = opcoes.visao;
      var nomeSubVisao = opcoes.subVisao;

      var seVisaoExiste = this.verificarVisao(envolucro, nomeVisao);
      var seSubVisaoNaoExiste = !this.verificarSubVisao(envolucro, nomeVisao, nomeSubVisao);
      var visao = this.buscarVisao(envolucro, nomeVisao);

      if (seVisaoExiste) {
        if (seSubVisaoNaoExiste) {
          visao.subVisoes[nomeSubVisao] = cd();
        } 

        // Chamada sempre que a sub visão for ser reusada
        if ((typeof visao.subVisoes[nomeSubVisao].aoReusar) === 'function') {
          visao.subVisoes[nomeSubVisao].aoReusar();
        }
        return visao.subVisoes[nomeSubVisao];
      } else {
        console.log('(GDV) Tentando reusar sub visão de uma visão ('+ nomeVisao +') que não pode ser encontrada.');
      }
      return null;
    },

    /* Remove uma ou todas as sub visões
     */
    removerSubVisao: function(opcoes) {
      var envolucro = opcoes.envolucro;
      var nomeVisao = opcoes.nome;
      var nomeSubVisao = opcoes.subVisao;

      var seVisaoExiste = this.verificarVisao(envolucro, nomeVisao);

      if (seVisaoExiste) {
        var visao = this.buscarVisao(envolucro, nomeVisao);

        if (nomeSubVisao === false) {
          // removemos todas as sub visões
          var meuObj = this;
          _.each(visao.subVisoes, function(subVisao){
            meuObj.fecharVisao(subVisao)
          });
          visao.subVisoes = [];
        } else {
          // removemos apenas uma visão
          if (visao.subVisoes[nomeSubVisao]) {
            this.fecharVisao(visao.subVisoes[nomeSubVisao]);
            delete visao.subVisoes[nomeSubVisao];
          }
        }
      }
    }
  
  };

  console.log('(gdv) Gerente de visões foi carregado com sucesso.');

  return GDV;
});