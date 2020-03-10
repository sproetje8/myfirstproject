// 2.Получить список поддерживаемых языков для Google Translate API (использовать callback)
// 3.Определить язык следующих слов: "หนูมัสคแร็ต" и тп ДОБАВИТЬ СЛОВ (использовать Promise)
// 4.Перевести слово "ბომონერი" на китайский, после чего перевести его на русский (сделать на callback и Promise)
// 5.Паттерны проектирования (Observer, Singleton, Factory...)

// populate the dropdown menus with the language list
let srcLang = '';
let targLang = '';
let srcText = '';

// const form = {
// 	srcLang,
// 	targLang,
// 	srcText,
// 	translation,
// }

// callback should get the result (result.langs) in the form of an object and save it in a variable (languageListObject)
let languageListObject = {};

async function wrapper() {
	languageListObject = await translator.getLangs('en', languageListObject, populateLanguageList);
}

wrapper();

// create for each value of languageListObject an option element in the DOM to fill the language list
function populateLanguageList (langsListObj) {
	let sortableLangsList = [];

	for (let abbrev in langsListObj) {
		sortableLangsList.push([abbrev, langsListObj[abbrev]]);
	}

	function compareByLang(a, b) {
		if (a[1] < b[1]) return -1;
		if (a[1] > b[1]) return 1;
		return 0;
	}
	 
	let sortedLangsArray = sortableLangsList.sort(compareByLang);

	let selectSrcLang = document.getElementById('src-langs-list');
	let selectTargLang = document.getElementById('targ-langs-list');

	sortedLangsArray.forEach( (language, i) => {
		let optSrc = document.createElement('option');
		let optTarg = document.createElement('option');

		optSrc.text = sortedLangsArray[i][1];
		optSrc.value = sortedLangsArray[i][0];
		optTarg.text = sortedLangsArray[i][1];
		optTarg.value = sortedLangsArray[i][0];

		if (optSrc.value === 'en') {
			optSrc.setAttribute('selected', 'selected');
		}

		if (optTarg.value === 'ru') {
			optTarg.setAttribute('selected', 'selected');
		}

		selectSrcLang.add(optSrc);
		selectTargLang.add(optTarg);
	});
}

// think about how to get what user typed and send it to yandex
const inputDebouncer = debounce(getOriginalText, 2000);

document
	.getElementById('src-text')
	.addEventListener('keyup', inputDebouncer);

function getOriginalText () {
	srcText = document.getElementById('src-text').value;
	// let translation = [];

	lang = 'en-ru';

	translator.translate(srcText, lang, translation, renderTranslation);
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