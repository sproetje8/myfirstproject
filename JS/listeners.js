let listeners = [
	{ id: 'src-langs-list', event: 'change', handler: srcLangBtnHandler },
	{ id: 'targ-langs-list', event: 'change', handler: setTargLang },
	{ id: 'switch-lang', event: 'click', handler: switchLanguages },
	{ id: 'src-text', event: 'keyup', handler: inputDebouncer }
];

function addListener({ id, event, handler }) {
	document.getElementById(id).addEventListener(event, handler);
}

function createListeners() {
	listeners.forEach(element => addListener(element));
}