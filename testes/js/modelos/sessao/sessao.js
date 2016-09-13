define([
  "backbone"
, "urls"
, "modelos/conta/conta"
], function(
  Backbone
, Urls
, ModeloDeConta
) {
  'use strict';

  var ModeloDeSessao = Backbone.Model.extend({

    url: function() {
      return Urls.gerarUrl('Contas');
    },

    idAttribute: 'id',

    defaults: {
      'id': null
    , 'autenticado': false
    },

    initialize: function(){

      this.conta = new ModeloDeConta({});
    },

    entrar: function(credenciais, cd) {
      var meuObjt = this;
      var conta = this.conta;
      var funcao = this.conta.funcao;

      var suporteDeFalhas = function(modelo, resposta, opcoes) {
        meuObjt.conta.funcao.clear();
        meuObjt.conta.clear();
        meuObjt.unset('id');
        meuObjt.set({ 'autenticado': false });
        if('erro' in cd) cd.erro(modelo, resposta, opcoes);
      };

      var mediador = function(modelo) {
        funcao.url = Urls.gerarUrl('Funcao', conta.get('funcao_id'));
        //funcao.set({'id': conta.get('funcao_id')});
        meuObjt.set({'id': modelo.id });

        funcao.fetch().done(function(modelo, resposta, opcoes) {
          meuObjt.set({ 'autenticado': true });
          if('sucesso' in cd) cd.sucesso(modelo, resposta, opcoes); 
        })
        .fail(suporteDeFalhas);
      };

      if (credenciais) {
        // Realiza a entrada do usuário na conta.
        conta.save(credenciais).done(function(modelo, resposta, opcoes) {
          mediador(modelo);
        })
        .fail(suporteDeFalhas); 
      } else {
        // Retorna a situação da sessão atual.
        conta.fetch().done(function(modelo, resposta, opcoes) {
          mediador(modelo);
        }).fail(suporteDeFalhas);
      }
    },

    sair: function(cd) {
      var meuObjt = this;

      // Realiza a saida do usuario de sua conta.
      this.conta.destroy()
      .done(function(modelo, resposta) {
         meuObjt.conta.funcao.clear();
         meuObjt.conta.clear();
         meuObjt.unset('id');
         meuObjt.set({ 'autenticado': false });
         if('sucesso' in cd) cd.sucesso(modelo, resposta); 
      })
      .fail(function() {
        if('erro' in cd) cd.erro(); 
      });     
    },

    seAutenticado: function(cd) {
      // Retorna a situação da sessão atual.
      this.entrar(false, cd);
    }

  });

  return ModeloDeSessao;
});