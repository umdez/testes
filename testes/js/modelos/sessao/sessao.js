define([
  "backbone"
, "urls/indice"
, "modelos/conta/conta" 
, "modelos/funcao/funcao"
, "colecoes/escopos/escopos"
], function(
  Backbone
, gerarUrl
, ModeloDeConta
, ModeloDeFuncao
, ColecaoDeEscopo
) {
  'use strict';

  var ModeloDeSessao = Backbone.RelationalModel.extend({

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

      this.set('Conta', new ModeloDeConta({}));
    },

    relations: [{
      type: Backbone.HasOne,
      key: 'Conta',
      relatedModel: ModeloDeConta,
      reverseRelation: {
        key: 'Sessao',
        type: Backbone.HasOne,
        includeInJSON: true
      }
    }],

    entrar: function(credenciais, cd) {
      var meuObj = this;
      var conta = this.get('Conta');
      var funcao = null;
      var escopos = null;

      var suporteDeFalhas = function(modelo, resposta, opcoes) {
        
        meuObj.get('Conta').url = gerarUrl('Contas');
        meuObj.get('Conta').unset('id');
        meuObj.unset('id');
        meuObj.set({ 'autenticado': false });

        console.log('(modelos/sessao/sessao) Alguma falha ocorreu ao tentarmos realizar a entrada/autorização.');
        if('erro' in cd) cd.erro(modelo, resposta, opcoes);
      };

      var mediador = function(conta) {
        meuObj.set({'Conta': conta})
        meuObj.set({'id': conta.id });

        funcao = ModeloDeFuncao.findOrCreate({'id': conta.get('funcao_id')});
        funcao.url = gerarUrl('Funcao', conta.get('funcao_id'));
        funcao.fetch().done(function(modelo, resposta, opcoes) {
          conta.set('Funcoes', funcao);

          console.log('(modelos/sessao/sessao) Dados da sua função foram carregados com sucesso.');

          escopos = funcao.get('Escopos');
          escopos.url = gerarUrl('Escopos', funcao.get('id'));
          escopos.fetch({'reset': true}).done(function() {
            
            //funcao.get('Escopos').at(1).get('Funcao').get('nome');
            conta.get('Sessao').set({ 'autenticado': true });

            console.log('(modelos/sessao/sessao) Dados dos seus escopos foram carregados com sucesso.');
            if('sucesso' in cd) cd.sucesso(modelo, resposta, opcoes);
          }).fail(suporteDeFalhas);

        })
        .fail(suporteDeFalhas);

      };

      if (credenciais) {
        conta.url = gerarUrl('Contas');

        // Realiza a entrada do usuário na conta.
        conta.save(credenciais).done(function(modelo, resposta, opcoes) {
          console.log('(modelos/sessao/sessao) Entrada realizada com sucesso.');
          mediador(conta);
        })
        .fail(suporteDeFalhas); 
      } else {
        conta = ModeloDeConta.findOrCreate({'id': this.get('id')});

        // Retorna a situação da sessão atual.
        conta.fetch().done(function(modelo, resposta, opcoes) {
          console.log('(modelos/sessao/sessao) Requisição de autorização foi aceita com sucesso.');
          mediador(conta);
        }).fail(suporteDeFalhas);
      }
    },

    sair: function(cd) {
      var meuObj = this;
      var conta = this.get('Conta');
      
      console.log('(modelos/sessao/sessao) Realizando a saida.');

      // Adc. url da nossa conta a ser destruida
      conta.url = gerarUrl('Conta', this.id);
    
      // Realiza a saida do usuario de sua conta.
      conta.destroy().done(function(modelo, resposta) {

         //Backbone.Relational.store.reset();

         meuObj.set('Conta', new ModeloDeConta({}));
         
         // volta a url original
         meuObj.get('Conta').url = gerarUrl('Contas');
         meuObj.unset('id');
         meuObj.set({ 'autenticado': false });

         console.log('(modelos/sessao/sessao) Saida realizada com sucesso.');
         if('sucesso' in cd) cd.sucesso(modelo, resposta); 
      })
      .fail(function(modelo, resposta) {
        
        //Backbone.Relational.store.reset();

        meuObj.set('Conta', new ModeloDeConta({}));
        meuObj.get('Conta').url = gerarUrl('Contas');

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