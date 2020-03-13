// 2.Получить список поддерживаемых языков для Google Translate API (использовать callback)
// 3.Определить язык следующих слов: "หนูมัสคแร็ต" и тп ДОБАВИТЬ СЛОВ (использовать Promise)
// 4.Перевести слово "ბომონერი" на китайский, после чего перевести его на русский (сделать на callback и Promise)
// 5.Паттерны проектирования (Observer, Singleton, Factory...)

// populate the dropdown menus with the language list
let srcLang = 'en';
let targLang = 'ru';
let srcText = '';
let languageListObject;

async function init() {
	const CONFIG = await getConfig();
	const GETLANGSURL = await composeGetLangsURL(CONFIG);
	await getLanguageList(GETLANGSURL);
	await addListenerToSrcLangBtn();
	await addListenerToTargLangBtn();
	await addListenerToInput();
}

init();

function composeGetLangsURL(CONFIG) {
	url = `${CONFIG.apiAddress}getLangs?ui=${srcLang}&key=${CONFIG.apiKey}`;

	return url;
}

async function getLanguageList(GETLANGSURL) {
	languageListObject = await translator.getLangs(GETLANGSURL);
	sortLanguageList(languageListObject);

	return languageListObject;
}

function sortLanguageList() {
	let sortedLangsArray = Object.entries(languageListObject).sort(compareByLang);

	populateLanguageList(sortedLangsArray);
}

function compareByLang(a, b) {
	if (a[1] < b[1]) return -1;
	if (a[1] > b[1]) return 1;
	return 0;
}

// create for each value of languageListObject an option element in the DOM to fill the language list
function populateLanguageList (sortedLangsArray) {
	let selectSrcLang = document.getElementById('src-langs-list');
	let selectTargLang = document.getElementById('targ-langs-list');
	
	sortedLangsArray.forEach( (language) => {
		let optionSrc = document.createElement('option');
		let optionTarg = document.createElement('option');

		let abbrIndex = 0;
		let fullLanguageIndex = 1;
		
		optionSrc.text = optionTarg.text = language[fullLanguageIndex];
		optionSrc.value = optionTarg.value = language[abbrIndex];

		if (optionSrc.value === srcLang) {
			optionSrc.setAttribute("selected", "selected");
		}

		if (optionTarg.value === targLang) {
			optionTarg.setAttribute("selected", "selected");
		}

		selectSrcLang.add(optionSrc);
		selectTargLang.add(optionTarg);
	});
}

function addListenerToSrcLangBtn() {
	let selectSrcLang = document.getElementById('src-langs-list');

	selectSrcLang.addEventListener('change', setSrcLang);
}

function setSrcLang (event) {
	srcLang = event.target.value;
	getOriginalText();
}

function addListenerToTargLangBtn() {
	let selectTargLang = document.getElementById('targ-langs-list');

	selectTargLang.addEventListener('change', setTargLang);
}

function setTargLang (event) {
	targLang = event.target.value;
	getOriginalText();
}

// think about how to get what user typed and send it to yandex
const inputDebouncer = debounce(getOriginalText, 2000);

function addListenerToInput () {
	document
		.getElementById('src-text')
		.addEventListener('keyup', inputDebouncer);
}

function getOriginalText () {
	srcText = document.getElementById('src-text').value;
	composeLang();
	
	translator.translate(srcText, lang, translation, renderTranslation);
}

function composeLang() {
	return lang = `${srcLang}-${targLang}`;

}

function debounce (func, delay) {
	let timer;
	
	return function() {
		let context = this;
		let args = arguments;

		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(context, args);
		}, delay);
	};
}

function renderTranslation (translation) {
	const translationField = document.getElementById('translation');
	translationField.innerText = translation;
}