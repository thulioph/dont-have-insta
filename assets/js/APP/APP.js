//Início de APP

/**
 * Singleton Pattern
 * O seu projeto JS em um objeto literal (JSON)
 * Sugerido por: Dennis Calazans
 * Veja mais em www.denniscalazans.com/js
 * 
 * Problema 
 * Como modularizar o meu projeto, proteger a estrutura, tornar o código manutenível?
 * 
 * Solução
 * Criar apenas uma variável global e utilizar notação de objeto
 * 
 * Quando aplicar
 * Projetos pequenos - Como ferramenta para namespace.
 * Projetos médios - Como forma de agrupar códigos relacionados.
 * Projetos grandes e complexos - Como ferramenta de otimização  (Ver Pro JavaScript Design Patterns, capítulo 5).
 *
 * Algumas sugestões para organização:
 *  
 * Atributos - começam com _ e caixa baixa, segue com o padrão camelCase
 * APP._titulo = "Atributos começam com _";
 *
 * Métodos - começam com caixa baixa, segue com padrão camelCase
 * APP.retornarTitulo = function() {
 *	return this._titulo;
 * }
 * 
 * Módulos - começam com caixa alta, segue com padrão camelCase
 *  APP.Mudulo = {
 * 		_atributo: "valor" 
 * }
 * 
 * Agradecimento a os meus alunos e amigos que vem trabalhando 
 * e contribuindo para o desenvolvimento desta iniciativa:
 * Bruno Mota, Brenda, Ciclone, Pablo, Leonardo, Ricardo, Júlio Melo, Klayton
 **/

//Existe APP? Sim. Então usa. Não. Então cria.
var APP = APP || {};

//Propriedade que será executa em todos os módulos
APP._nameSpace = "APP";

//Inicia o APP
APP.iniciar = function(Modulos) {
	var quantidadeDeModulos = arguments.length;

	//Se algum Modulo for especificado, executa o setUp de App	
	if(Modulos !== undefined && Modulos !== APP) {
		APP.setUp();
	}

	//Caso o Modulo seja omitido, TODOS os módulos de APP serão iniciados
	if(quantidadeDeModulos == 0 || quantidadeDeModulos == 1) {
		this.iniciarModulos(Modulos || APP);
	} else if(quantidadeDeModulos > 1) {
		APP.iniciarModulos.apply(this, arguments);
	}
};

//Quando o APP for iniciado
APP.setUp = function() {
	//console.debug('APP iniciado');
};

//Inicícia todos os módulos
APP.iniciarModulos = function(Modulo) {
	var Filho, i=0;

	if(arguments.length > 1) {

		for(;i<arguments.length;i++) {
			APP.iniciarModulos(arguments[i]);
		} 
		return;
	}


	if(typeof Modulo != "object") return false;

	//Executa o método construtor do módulo, se existir
	if(Modulo.hasOwnProperty('setUp') && typeof Modulo.setUp == "function") {
		Modulo.setUp();
	} else {
		//Evita que durante a execução dos setUp, objetos inseridos na estrutura, 
		//ampliem a verificação iterativa
		return false;
	}

	//Procura por Sub Módulos para fazer a mesma coisa
	for(Filho in Modulo) {


		if(Modulo.hasOwnProperty(Filho) === true) {
			if(Modulo[Filho] !== null && typeof Modulo[Filho] == "object") {

				//Permite a navegação em níveis superiores do namespace
				Modulo[Filho]['pai'] = function() {
					return Modulo;
				};


				//Cria em cada módulo a propriedade _nameSpace
				//Ex: App.Contato.Formulario._nameSpace = App.Contato.Formulario
				Modulo[Filho]['_nameSpace'] = (Modulo['_nameSpace'] || "APP") + '.'+Filho;


				APP.iniciarModulos(Modulo[Filho]);
			}
		}
	}

	return false;
};

/**
 *	Retorna o valor da propriedade (nó) informado.
 *  Ex 1: 
 * 		APP.nameSpace("APP.ModuloPai.ModuloFilho");
 * 		Retornará: APP.ModuloPai.ModuloFilho
 * 
 * 	Caso o nó seja um método, ele será executado.
 *	É possível passar parâmetros 
 *
 * 	Ex 2: APP.Calculadora.somar = function(a, b) { return a+b; }	
 * 		
 *	APP.nameSpace("APP.Calculadora.somar", [7, 9]);
 * 		Retornará: 16
 */
APP.nameSpace = function(nameSpace, arrayDeParametros) {
	//Declaração de variáveis;
	var no, nos, escopos, alvo, i;

		//Por comodidade, se for apenas 1 parâmetro,
		 //pode passar direto, sem estar dentro de um array
		//By Pablo
		if(arrayDeParametros !== undefined && arrayDeParametros instanceof Array === false) {
			arrayDeParametros = [arrayDeParametros];
		}

		//Escopos encontrados
		escopos = [window];

		//Nós do nameSpace
		nos = nameSpace.split('.');

		//Para cada nó
		for(i=0;i<nos.length;i++) {
			no = nos[i];

			//Verifica se não é do protótipo
			if(escopos[i].hasOwnProperty(no)) {

				//Guarda o escopo encontrado
				escopos.push(escopos[i][no]);
			}
		}

		//Captura o alvo
		alvo = escopos.pop();

		//Se a última referência encontrada for uma função
		if(typeof alvo == 'function') {

			//A função é executada no escopo do alvo
			return alvo.apply(escopos.pop(), arrayDeParametros || []);

		}

		//Apenas retorna o alvo, caso não seja uma função
		else { return alvo; }
}

//FIM de APP