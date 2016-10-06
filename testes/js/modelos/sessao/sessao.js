/* Responsavel pela sessão do usuário */

define([
  "backbone"
, "urls/indice"
, "modelos/conta/conta" 
, "modelos/funcao/funcao"
], function(
  Backbone
, gerarUrl
, ModeloDeConta
, ModeloDeFuncao
) {
  'use strict';

  var ModeloDeSessao = Backbone.Model.extend({

    url: function() {
      return gerarUrl('Contas');
    },

    idAttribute: 'id',

    defaults: {
      'id': null
    , 'autenticado': false
    },

    conta: null,

    initialize: function(){
      this.conta = new ModeloDeConta({});
    },

    entrar: function(credenciais, cd) {
      var meuObj = this;
      var conta = this.conta; 
      var funcao = null;

      var suporteDeFalhas = function(modelo, resposta, opcoes) {
        
        conta.url = gerarUrl('Contas');
        conta.unset('id');
        meuObj.unset('id');
        meuObj.set({ 'autenticado': false });

        console.log('(modelos/sessao/sessao) Alguma falha ocorreu ao tentarmos realizar a entrada/autorização.');
        if('erro' in cd) cd.erro(modelo, resposta, opcoes);
      };

      var mediador = function() {
        meuObj.conta = conta;
        meuObj.set({'id': conta.id });

        funcao = ModeloDeFuncao.findOrCreate({'id': conta.get('funcao_id')});
        funcao.url = gerarUrl('Funcao', conta.get('funcao_id'));
        funcao.fetch().done(function(modelo, resposta, opcoes) {
          conta.set('Funcoes', funcao);

          console.log('(modelos/sessao/sessao) Dados da sua função foram carregados com sucesso.');

          meuObj.set({ 'autenticado': true });

          console.log('(modelos/sessao/sessao) Dados dos seus escopos foram carregados com sucesso.');
          if('sucesso' in cd) cd.sucesso(modelo, resposta, opcoes);
        })
        .fail(suporteDeFalhas);

      };

      if (credenciais) {
        conta.url = gerarUrl('Contas');

        // Realiza a entrada do usuário na conta.
        conta.save(credenciais).done(function(modelo, resposta, opcoes) {
          console.log('(modelos/sessao/sessao) Entrada realizada com sucesso.');
          mediador();
        })
        .fail(suporteDeFalhas); 
      } else {
        conta = ModeloDeConta.findOrCreate({'id': this.get('id')});

        // Retorna a situação da sessão atual.
        conta.fetch().done(function(modelo, resposta, opcoes) {
          console.log('(modelos/sessao/sessao) Requisição de autorização foi aceita com sucesso.');
          mediador();
        }).fail(suporteDeFalhas);
      }
    },

    sair: function(cd) {
      var meuObj = this;
      var conta = this.conta;
      
      console.log('(modelos/sessao/sessao) Realizando a saida.');

      // Adc. url da nossa conta a ser destruida
      conta.url = gerarUrl('Conta', this.id);
    
      // Realiza a saida do usuario de sua conta.
      conta.destroy().done(function(modelo, resposta) {

         meuObj.conta = new ModeloDeConta({});

         // volta a url original
         meuObj.conta.url = gerarUrl('Contas');
         meuObj.unset('id');
         meuObj.set({ 'autenticado': false });

         console.log('(modelos/sessao/sessao) Saida realizada com sucesso.');
         if('sucesso' in cd) cd.sucesso(modelo, resposta); 
      })
      .fail(function(modelo, resposta) {

        meuObj.conta = new ModeloDeConta({});
        meuObj.conta.url = gerarUrl('Contas');

        meuObj.unset('id');
        meuObj.set({ 'autenticado': false });

        console.log('(modelos/sessao/sessao) Erro ao tentar realizar a saida.');
        if('erro' in cd) cd.erro(modelo, resposta); 
      });     
    },

    seAutenticado: function(cd) {
      // Retorna a situação da sessão atual.
      this.entrar(false, cd);
    }

  });

  return ModeloDeSessao;
});