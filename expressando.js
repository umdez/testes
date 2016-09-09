'use strict';

var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');
var morgan = require('morgan');  
var registrador = require('./fonte/nucleo/registrador')('Expressando');
var _ = require('lodash');
var cors = require('cors');
var sessao = require('express-session');
var httpProxy = require('http-proxy');

var Expressando = function(opcoes) {

  this.aplicativo = opcoes.aplicativo;
  this.express = opcoes.express;
  this.aConfDoServidor = opcoes.configuracao.servidor;
  this.asCredenciais = opcoes.credenciais;
  this.aListaDeRotas = opcoes.lista;

  this.carregar();
};

Expressando.prototype.carregar = function() {
  var meuObjt = this;

  this.aplicativo.enable('trust proxy');
  this.aplicativo.use(bodyParser.json({limit: this.aConfDoServidor.limite}));
  this.aplicativo.use(bodyParser.urlencoded({limit: this.aConfDoServidor.limite, extended: false}));

  this.aplicativo.set('porta', process.env.PORT || this.aConfDoServidor.porta);
  this.aplicativo.set('portaSSL', process.env.SSLPORT || this.aConfDoServidor.portaSSL);
  
  this.aplicativo.use(sessao({ secret: "superSegredo", cookie: { httpOnly: true, secure: true }}));
  this.aplicativo.use(morgan(this.aConfDoServidor.registro || 'combined')); 

  // Aqui nós iremos obrigado que as conexões não seguras sejam redirecionadas.
  // Para mais informações @veja http://stackoverflow.com/a/10715802
  this.aplicativo.use(function(requisicao, resposta, proximo) {
    if(!requisicao.secure && meuObjt.aConfDoServidor.exigirConSegura) {
      return resposta.redirect(['https://', requisicao.get('Host'), requisicao.url].join(''));
    }
    proximo();
  });

  _.forEach(this.aListaDeRotas, function(diretorio) {
    meuObjt.aplicativo.use(diretorio.rota, diretorio.caminho);  
  });

  this.aConfDoCors = this.aConfDoServidor.cors;
  this.aListaDasOrigensPermitidas = this.aConfDoCors.origem; 

  /* Iremos separar as preocupações do nosso projeto, para isso nós iremos
   * oferecer os serviços deste servidor para a parte da visão. Assim iremos
   * oferecer aceitação de conexões e requisições dos dominios de origem
   * permitidos utilizando o módulo CORS.
   * @Veja https://www.npmjs.com/package/cors
   */
  this.aplicativo.use(cors({
    origin: function(origem, cd) {  
      var seOrigemPermitida = meuObjt.aListaDasOrigensPermitidas.indexOf(origem) !== -1;
      cd(null, seOrigemPermitida);
    }  
  , methods:  this.aConfDoCors.metodos 
  , allowedHeaders: this.aConfDoCors.cabecalhosAceitos
  , exposedHeaders: this.aConfDoCors.cabecalhosExpostos  
  , credentials: this.aConfDoCors.seUsarCredenciais
  }));

  httpProxy.createServer(5280, '127.0.0.1', {https: this.asCredenciais}).listen(8001);
};

Expressando.prototype.escutarPorConexoes = function() {
  var meuObjt = this;

  this.aplicativo.servidor = http.createServer(this.aplicativo);
  this.aplicativo.servidor.listen(this.aplicativo.get('porta'), function () {
    registrador.debug("Servidor HTTP express carregado e escutando na porta " + meuObjt.aplicativo.get('porta'));
  });

  this.aplicativo.servidorSSL = https.createServer(this.asCredenciais, this.aplicativo);
  this.aplicativo.servidorSSL.listen(this.aplicativo.get('portaSSL'), function () {
    registrador.debug("Servidor HTTPS express carregado e escutando na porta " + meuObjt.aplicativo.get('portaSSL'));
  });
};

module.exports = Expressando;