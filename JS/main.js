// 2.Получить список поддерживаемых языков для Google Translate API (использовать callback)
// 3.Определить язык следующих слов: "หนูมัสคแร็ต" и тп ДОБАВИТЬ СЛОВ (использовать Promise)
// 4.Перевести слово "ბომონერი" на китайский, после чего перевести его на русский (сделать на callback и Promise)
// 5.Паттерны проектирования (Observer, Singleton, Factory...)

// populate the dropdown menus with the language list

// const form = {
// 	srcLang,
// 	targLang,
// 	srcText,
// 	translation,
// 	srcLanguageList: languageList,
// 	targLanguageList: languageList,
// }


// callback should get the result (result.langs) in the form of an object and save it in a variable (languageListObject)
let languageListObject = {};

async function wrapper() {
	languageListObject = await translator.getLangs('en', languageListObject);
}

wrapper();

// create for each value of languageListObject an option element in the DOM to fill the language list
function populateLanguageList (object) {
	let languageArray = Object.values(object).sort();
	let selectSrcLang = document.getElementById('src-langs-list');
	let selectTargLang = document.getElementById('targ-langs-list');

	languageArray.forEach(language => {
		let optSrc = document.createElement('option');
		let optTarg = document.createElement('option');

		optSrc.text = language;
		optSrc.value = language;
		optTarg.text = language;
		optTarg.value = language;

		selectSrcLang.add(optSrc);
		selectTargLang.add(optTarg);
	});
}
