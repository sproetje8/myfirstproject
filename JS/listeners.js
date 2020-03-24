let listeners = [
	{
		id: 'src-langs-list',
		event: 'change',
		handler: srcLangBtnHandler
	},
	{
		id: 'targ-langs-list',
		event: 'change',
		handler: targLangBtnHandler
	},
	{
		id: 'switch-lang',
		event: 'click',
		handler: switchBtnHandler
	},
	{
		id: 'src-text',
		event: 'keyup',
		handler: inputHandler
	}
];

function addListener({ id, event, handler }) {
	document.getElementById(id).addEventListener(event, handler);
}

function createListeners() {
	listeners.forEach(element => addListener(element));
}

async function srcLangBtnHandler(event) {
	state.srcText = utils.getInput();
	state.srcLang = event.target.value;
	let input = utils.checkForInput();
	if (input) {
		let translation = await utils.getTranslation();
		renderer.renderTranslation(translation);
	}
}

async function targLangBtnHandler(event) {
	state.srcText = utils.getInput();
	state.targLang = event.target.value;
	let input = utils.checkForInput();
	if (input) {
		let translation = await utils.getTranslation();
		renderer.renderTranslation(translation);
	}
}

async function switchBtnHandler() {
	state.srcText = utils.getInput();
	let input = utils.checkForInput();

	utils.swapSrcAndTargLangs();
	renderer.renderSrcLang();
	renderer.renderTargLang();
	// state.translation = 'Enter your text';

	if (input) {
		renderer.moveTranslationToInput();
		let translation = await utils.getTranslation();
		renderer.renderTranslation(translation);
	}
}

const inputDebouncer = debounce(utils.getTranslation, 2000);

function debounce(func, delay) {
	let timer = null;
	let promise;

	return (...args) => {
		clearTimeout(timer);
		return promise = new Promise((resolve) => {
			timer = setTimeout(
				() => resolve(func(...args)), 
				delay
			);
		});
	};
}

async function inputHandler() {
	state.srcText = utils.getInput();
	let input = utils.checkForInput();

	if (input) {
		state.srcLang = await utils.detectLanguage();
		renderer.renderSrcLang();
		let translation = await inputDebouncer();
		renderer.renderTranslation(translation);
	} else {
		state.translation = '';
		renderer.renderTranslation(state.translation);
	}
}
