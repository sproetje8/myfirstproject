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

function srcLangBtnHandler(event) {
	state.srcText = utils.getInput();
	state.Lang = event.target.value;
	let input = utils.checkForInput();
	if (input) {
		utils.getTranslation();
		renderer.renderTranslation();
	}
}

function targLangBtnHandler(event) {
	state.srcText = utils.getInput();
	state.targLang = event.target.value;
	let input = utils.checkForInput();
	if (input) {
		utils.getTranslation();
		renderer.renderTranslation();
	}
}

function switchBtnHandler() {
	state.srcText = utils.getInput();
	let input = utils.checkForInput();
	
	utils.swapSrcAndTargLangs();
	renderer.renderSrcLang();
	renderer.renderTargLang();

	if (input) {
		renderer.moveTranslationToInput();
		utils.getTranslation();
		renderer.renderTranslation();
	}
}

function inputHandler() {
	state.srcText = utils.getInput();
	let input = utils.checkForInput();

	if (input) {
		// state.srcText = utils.getInput();
		// state.srcLang = await utils.getDetectedSrcLang();
		let translation = utils.inputDebouncer();
		renderer.renderTranslation(translation);
	}
}