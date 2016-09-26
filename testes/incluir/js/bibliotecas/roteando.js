/* Uma extenção do backbone router. provê forma de lidar com rotas dos módulos. 
 */

define([
  'backbone'
, 'underscore'
], function(
  Backbone
, _
) {
  'use strict';

  // Salvamos a referencia para a o método da rota original que será chamada
  // apos a gente modificar o seu comportamento
  var rotaOriginal = Backbone.Router.prototype.route;

  var sop = function() { };

  // Extende a mótodo do roteador com uma função padrão para uma função
  // anterior, uma padrão e uma posterior.
  _.extend(Backbone.Router.prototype, {

    // adc nosso registrador
    registrador: sop,

    // adic. nosso filtro anterior
    anterior: sop,

    // adc nosso filtro posterior
    posterior: sop,

    // Re-escreve o método Backbone.Router.prototype.route, que é o método
    // publico utilizado para a adição de rotas na instancia do roteador, e tbm
    // o método que o backbone utiliza internamente para bind de rotas e
    // suportes para o Backbone.history no momento que isso é instanciado.
    route: function(rota, nome, cd) {
      
      // Se não existir uma função chamar denovo (cd) para esta rota, então
      // setamos isso para ser o nome que foi setado na propriedade das rotas do
      // contrutor.
      if(!cd) {
        cd = this[nome];
      };

      // Criamos uma nova função Chamar Denovo para substituir o Chamar Denovo
      // original.
      var cdEnvolvido = _.bind( function() {

        // Registramos aqui cada rota acessada e também seus argumentos.
        if (this.registrador) {
          this.registrador.apply(this, [rota, nome, _.toArray(arguments)]);
        } 

        var cdArgs = [ rota, nome, _.toArray(arguments) ];
        var anteriorCd;

        if (_.isFunction(this.anterior)) {
          // Se for apenas uma função, então chamar ela com argumentos
          anteriorCd = this.anterior;
        } else if (typeof this.anterior[rota] !== "undefined") {
          // Caso contrário, procura pelo Chamar Denovo (cd) apropriado para o
          // nome desta rota e a chama.
          anteriorCd = this.anterior[rota];
        } else {
          // Caso contrário, se a gente possui um conjunto de rotas, mas não uma
          // rota anterior para essa rota, apenas chamamos o sop
          anteriorCd = sop;
        }

        // Se der erro e retornar falso então não iremos seguir em frente.
        if (anteriorCd.apply(this, cdArgs) === false) {
          return;
        }

        // Se a função Chamar Denovo existir, então chama ela. 
        if(cd) {
          cd.apply(this, arguments);
        }

        var posteriorCd;

        if (_.isFunction(this.posterior)) {
          // Se for apenas uma função, então chamar ela com argumentos
          posteriorCd = this.posterior;
        } else if (typeof this.posterior[rota] !== "undefined") {
          // Caso contrário, procura pelo Chamar Denovo (cd) apropriado para o
          // nome desta rota e a chama.
          posteriorCd = this.posterior[rota];
        } else {
          // Caso contrário, se a gente possui um conjunto de rotas, mas não uma
          // rota anterior para essa rota, apenas chamamos o sop
          posteriorCd = sop;
        }

        // Se der erro e retornar falso então não iremos seguir em frente.
        posteriorCd.apply(this, cdArgs);

      }, this);

      // Chamamos a nossa rota original, substituindo a funcao chamar denovo
      // (cd) que era originalmente passada quando o Backbone.Router.route era
      // invocada com a nossa propria função envolvida.
      return rotaOriginal.call(this, rota, nome, cdEnvolvido);
    }

  });

});