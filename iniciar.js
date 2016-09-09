'use strict';
 
var sistemaDeArquivo = require('fs');
var pasta = require('path');
var pastaDeConfiguracaoPadrao = pasta.join(__dirname, '/configuracao/configuracao.js');
var express = require('express');
var configurado = require('configurado');
var registrador = require('./fonte/nucleo/registrador')('iniciar');  // Carregamos o nosso registrador
var Expressando = require('./expressando');
var servidorXmpp = require('servidor-xmpp');

configurado.iniciar(pastaDeConfiguracaoPadrao, function(configuracao) {
  
  // Iniciamos o servidor express
  var aplicativo = express();
  
  // Nossa configuração do servidor Express.
  var confDoServidor = configuracao.servidor;
  
  // Aqui temos a nossa chave e certificado para nosso servidor https.
  var chavePrivada  = sistemaDeArquivo.readFileSync('./certificados/' + confDoServidor.certificados.chavePrivada, 'utf8');
  var certificado = sistemaDeArquivo.readFileSync('./certificados/' + confDoServidor.certificados.certificado, 'utf8');
  var credenciais = { key: chavePrivada, cert: certificado };
  
  // Aqui nós temos as rotas para cada caminho do nosso aplicativo
  var listaDeRotas = [
    { "caminho": express.static(pasta.join(__dirname, 'testes')), "rota": '/' }
  , { "caminho": express.static(pasta.join(__dirname, 'testes/incluir/js/bibliotecas')), "rota": '/bibliotecas' }
  , { "caminho": express.static(pasta.join(__dirname, 'testes/incluir/estilos')), "rota": '/estilos' }
  ];

  var expressando = new Expressando({
    "configuracao": configuracao
  , "aplicativo": aplicativo
  , "express": express
  , "credenciais": credenciais
  , "lista": listaDeRotas
  });
  
  // Chamamos o arquivo principal, ele vai carregar os outros arquivos
  // principais do servidor.
  var principal = require('./fonte/iniciador/principal');
  
  // Aqui nós prosseguimos com nossos serviços basicos.
  principal.prosseguir(configuracao, aplicativo, function() {
    registrador.debug('Carregando o servidor HTTP e HTTPS.');
    expressando.escutarPorConexoes();
  });

  servidorXmpp.inicializar().then(function(){
    servidorXmpp.carregar(function(){ });
  });
  
});
