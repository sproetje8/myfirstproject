const inputDebouncer = debounce(getOriginalText, 2000);

function debounce(func, delay) {
	let timer;

	return function () {
		let context = this;
		let args = arguments;

		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(context, args);
		}, delay);
	};
}

function switchLanguages() {
	swapSrcAndTargLangs();
	moveTranslationToSourceText();
	getTranslation();
}

function swapSrcAndTargLangs() {
	let selectSrcID = 'src-langs-list';
	let selectTargID = 'targ-langs-list';

	let selectSrcValue = document.getElementById(selectSrcID).value;
	let selectTargValue = document.getElementById(selectTargID).value;

	unselect(selectSrcID, selectSrcValue);
	unselect(selectTargID, selectTargValue);
	select(selectSrcID, selectTargValue);
	select(selectTargID, selectSrcValue);

	appState.srcLang = selectTargValue;
	appState.targLang = selectSrcValue;
}

function moveTranslationToSourceText() {
	let translationValue = document.getElementById('translation').value;

	appState.srcText = translationValue;
	document.getElementById('src-text').value = appState.srcText;
}

function srcLangBtnHandler(event) {
	setSrcLang(event);
	getTranslation();
}

function targLangBtnHandler(event) {
	setTargLang(event);
	getTranslation();
}

function setSrcLang(event) {
	let selectID = 'src-langs-list';
	let elementValue = event.target.value;
	unselect(selectID, appState.srcLang);
	appState.srcLang = elementValue;
	select(selectID, appState.srcLang);
}

function setTargLang(event) {
	let selectID = 'targ-langs-list';
	let elementValue = event.target.value;
	unselect(selectID, appState.targLang);
	appState.targLang = elementValue;
	select(selectID, appState.targLang);
}	

// think about how to get what user typed and send it to yandex
async function getTranslation() {
	appState.srcText = getOriginalText();
	appState.srcLang = appState.srcLang || await detectSrcLang();
	let lang = composeLang();
	let translateURL = urlHelper.composeTranslateURL(lang);
	let translation = await translator.translate(translateURL);
	renderTranslation(translation);

	return translation;
}

function getOriginalText() {
	appState.srcText = document.getElementById('src-text').value;

	if (appState.srcText !== '' && appState.srcText !== ' ') {
		getTranslation(appState.srcText);

		return appState.srcText;
	}

	return appState.srcText;
}


async function detectSrcLang() {
	let selectSrcID = 'src-langs-list';

	unselect(selectSrcID, appState.srcLang);

	detectURL = await urlHelper.composeDetectURL();
	appState.srcLang = await translator.detect(detectURL);

	select(selectSrcID, appState.srcLang);

	return appState.srcLang;
}

function composeLang() {
	return `${appState.srcLang}-${appState.targLang}`;
}
