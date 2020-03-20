const inputDebouncer = debounce(createTranslation, 2000);

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

async function createTranslation() {
	appState.srcText = getOriginalText();
	detectedSrcLang = await getDetectedSrcLang(appState.srcText);
	appState.srcLang = appState.srcLang || detectedSrcLang;
	let lang = composeLang();
	let translateURL = urlHelper.composeTranslateURL(lang);
	let translation = await translator.translate(translateURL);
	renderTranslation(translation);
}

function switchBtnHandler() {
	swapSrcAndTargLangs();
	moveTranslationToInput();
	createTranslation();
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

function srcLangBtnHandler(event) {
	setSrcLang(event);
	createTranslation();
}

function targLangBtnHandler(event) {
	setTargLang(event);
	createTranslation();
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

function getOriginalText() {
	appState.srcText = document.getElementById('src-text').value;

	return appState.srcText;
}

async function getDetectedSrcLang() {
	let selectSrcID = 'src-langs-list';
	let srcLang = appState.srcLang;

	unselect(selectSrcID, srcLang);
	detectURL = await urlHelper.composeDetectURL();
	srcLang = await translator.detect(detectURL);
	select(selectSrcID, srcLang);
	appState.srcLang = srcLang;

	return appState.srcLang;
}

function composeLang() {
	return `${appState.srcLang}-${appState.targLang}`;
}
