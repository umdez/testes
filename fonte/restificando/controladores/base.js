var jwt = require('../../nucleo/jwt');
var Promessa = require('bluebird');
var _ = require('lodash');

var PERMISSAO_ACESSAR = 0x00000001;  // Ler ou Listar
var PERMISSAO_CADASTRAR = 0x00000002;
var PERMISSAO_REMOVER = 0x00000004;
var PERMISSAO_ATUALIZAR = 0x00000008;
var PERMISSAO_SUPERIOR = 0x00000040;  // Acesso completo

var Controlador = function(argumentos) {
  this.inicializar(argumentos);
};

Controlador.prototype.inicializar = function(opcoes) {
  this.fonte = opcoes.fonte;
  this.modelo = this.fonte ? this.fonte.modelo : null;
  this.jwt = new jwt(opcoes);
  this.fichario = this.jwt.fichario;
  this.limitadorDeUso = require('limitador');
  this.limitar = [];
};

Controlador.prototype.criarUmLimite = function(opcoes) {
  this.limitar[opcoes.nome] = new this.limitadorDeUso(opcoes);
  this.limitar[opcoes.nome].dados = opcoes;
  this.limitar[opcoes.nome].afunilarServico = this.afunilarServico.bind({dados: this.limitar[opcoes.nome]});
  this.limitar[opcoes.nome].zerarUmLimite = this.zerarUmLimite.bind({dados: this.limitar[opcoes.nome]});
  return this.limitar[opcoes.nome];
};

Controlador.prototype.afunilarServico = function(requisicao, resposta, contexto) {
  return this.dados.Restificando(requisicao, resposta, contexto);
};

Controlador.prototype.zerarUmLimite = function(requisicao) {
  return this.dados.Restificando.reiniciarChave(requisicao.ip);
};

Controlador.prototype.verificarPermissao = function(requisicao, contexto, cd) {
  var meuObj = this;

  return new Promessa(function(deliberar, recusar) {
    var modelo = _.toLower(meuObj.modelo.getTableName());
    var token = meuObj.jwt.encontrarUmToken(requisicao);
    var permissao = PERMISSAO_SUPERIOR;
    var metodo = _.toUpper(requisicao.method);

    var acoes = {
      "GET": [ PERMISSAO_ACESSAR, "ler/listar" ]
    , "POST": [ PERMISSAO_CADASTRAR, "cadastrar"]
    , "DELETE": [ PERMISSAO_REMOVER, "remover"]
    , "UPDATE": [ PERMISSAO_ATUALIZAR, "atualizar" ]
    , "PUT": [ PERMISSAO_ATUALIZAR, "atualizar" ] 
    };

    permissao |= acoes[metodo][0];

    var sePermitido = (meuObj.fichario.sePossuiEscopo(token, modelo, permissao) != 0);
    
    if (sePermitido) {
      cd(true);
      deliberar(contexto.continuar);
    } else {
      deliberar(contexto.erro(401, "Você não pode " + acoes[metodo][1] + " " + modelo));
    }
  });
};

module.exports = Controlador;