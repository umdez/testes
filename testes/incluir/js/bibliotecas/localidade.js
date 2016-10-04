define([ 
  
], function(
  
) {
  'use strict';

	function Localizando(localidades) {
		if(typeof localidades !== 'object') 
			throw new Error('Um objeto de localidade deve ser informado.');

		for(var chave in localidades) {
			if(localidades.hasOwnProperty(chave)) {
				this[chave] = localidades[chave];
			}
		}

		this.localidadeAtual = '';
		this.textoDaLocalidade = {};
	};

	Localizando.prototype.seTemLocalidade = function(loc) {
		return loc in this;
	};

	Localizando.prototype.carregar = function(codigoDoPais, lObj) {
		if(!this.seTemLocalidade(codigoDoPais)) {
			throw new Error('Esta localidade não existe ' + codigoDoPais);
		}

		this.textoDaLocalidade[codigoDoPais] = lObj;
	};

	Localizando.prototype.adicionarLocalidade = function(novaLocalidade) {
		if(!this.seTemLocalidade(novaLocalidade)) {
			throw new Error('Localidade desconhecida ' + novaLocalidade);
		}

		this.localidadeAtual = novaLocalidade;
	};

	Localizando.prototype.gerar = function(chave, textoVinculado) {
		let pos = this.textoDaLocalidade[this.localidadeAtual];
		let chaveSeparada = chave.split(".");

		if(!pos) {
			throw new Error('Localização não está selecionada.');
		}

		for(let i = 0; i < chaveSeparada.length; i++ ) {
			pos = pos[chaveSeparada[i]];

			// Se nenhum texto é encontrado apenas retornamos a chave
			if(!pos) {
				return chave;
			}
		}

		// Vamos encontrar o templante dos textos
		for(var palavra in textoVinculado) {
			pos = pos.replace(new RegExp('<%=\\s{0,}' + palavra + '\\s{0,}%>', "g"), textoVinculado[palavra]);
		}

		return pos;
	};

  return Localizando;
});