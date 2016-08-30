define([
  "backbone"
, "modelos/conta/conta"
], function(
  Backbone
, ModeloDeConta
) {
  'use strict';

  var ModeloDeSessao = Backbone.Model.extend({
    
    urlRoot: '/Contas',

    idAttribute: 'id',

    initialize: function(){

      this.conta = new ModeloDeConta({});
    },

    defaults: {
      'id': null
    , 'autenticado': false
    },

    entrar: function(credenciais, cd) {
      
      var meuObjt = this;
      var conta = this.conta;
      var funcao = this.conta.funcao;
      var escopos = this.conta.escopos;

      var suporteDeFalhas = function(modelo, resposta, opcoes) {
        
        meuObjt.set({ 'autenticado' : false });

        if('erro' in cd) cd.erro(modelo, resposta, opcoes);
      };

      var mediador = function(modelo) {
        
        funcao.set({'id': conta.get('funcao_id')});

        meuObjt.set({'id': modelo.id });

        // Pegamos a funcao deste usuário.
        funcao.fetch().done(function(modelo, resposta, opcoes) {

          escopos.url = '/Funcoes/' + funcao.get('id') + '/Escopos';

          // Pegamos os escopos de acesso do usuario.
          escopos.fetch().done(function(){

            //console.log(meuObjt.conta.funcao)
            //console.log(meuObjt.conta.funcao.get('Escopos')[1])
            //console.log(meuObjt.conta.funcao.get('Usuarios')[0])
            //console.log(meuObjt.conta.toJSON())
            //console.log(meuObjt.conta.escopos.toJSON())

            meuObjt.set({ 'autenticado': true });

            if('sucesso' in cd) cd.sucesso(modelo, resposta, opcoes); 
          })
          .fail(suporteDeFalhas);

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
         meuObjt.unset('id');
         meuObjt.set({ 'autenticado' : false });
         if('sucesso' in cd) cd.sucesso(modelo, resposta); 
      })
      .fail(function() {
        if('erro' in cd) cd.erro(); 
      });     
    },

    seAutenticado: function(cd) {
      this.entrar(false, cd);
    }

  });

  return ModeloDeSessao;
});