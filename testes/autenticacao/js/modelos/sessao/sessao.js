define([
  "aplicativo"
, "backbone"
, "modelos/conta/conta"
], function(
  aplicativo
, Backbone
, ModeloDeConta
) {
  'use strict';

  var ModeloDeSessao = Backbone.Model.extend({
    
    urlRoot: '/contas',

    idAttribute: "_id",

    initialize: function(){

      this.conta = new ModeloDeConta({});
    },

    defaults: {
      'autenticado': false
    },

    entrar: function(credenciais, cd) {
      
      var meuObjt = this;

      // POST: Realiza a entrada do usuário na conta.
      this.save(credenciais, {
        success: function (modelo, resposta, opcoes) {

          meuObjt.conta.set(_.pick(modelo.attributes, _.keys(meuObjt.conta.defaults)));

          meuObjt.set({ 'autenticado': true });

          cd(false);
        },
        error: function (modelo, resposta, opcoes) {
          cd(true);
        }
      });

    },

    sair: function(cd) {
      
      var meuObjt = this;

      // DELETE: Realiza a saida do usuario de sua conta.
      this.destroy({
        success: function (modelo, resposta) {

          meuObjt.set({ 'autenticado' : false });

          cd(false);
        },
        error: function () {
          cd(true);
        }
      });     
    },

    seAutenticado: function(cd) {
      
      var meuObjt = this;

      // GET: Retorna a situação da sessão atual.
      this.fetch({
        success: function(modelo, resposta, opcoes) {

          meuObjt.set({ 'autenticado' : true });

          cd(false);
        },
        error: function(modelo, resposta, opcoes) {

          meuObjt.set({ 'autenticado' : false });

          cd(true);
        }
      });

    }

  });

  return ModeloDeSessao;
});