const translator = {
	getLangs: function (ui, callback) {
		fetch(`${apiAddress}getLangs?ui=${ui}&key=${apiKey}`)
			.then(response => response.json())
			.then(result => callback(result.langs));
	},
	detect: function (text, callback) {
		fetch(`${apiAddress}detect?text=${encodeURI(text)}&key=${apiKey}`)
			.then(response => response.json())
			.then(result => callback(result.lang));
	},
	translate: function (text, lang, format, callback) {
		fetch(`${apiAddress}translate?text=${encodeURI(text)}&key=${apiKey}&lang=${lang}&format=${format}`)
		.then(response => response.json())
		.then(result => callback(result.text));
	}
};

translator.getLangs()

translator.translate('My book is closed. I forgot on what page I was.', 'en-ru', 'plain', console.log);



// first of all write functions to get all necessary data for the first rendering. Then add think of how to pass that data to your dropdowns etc. Then how to get data from your text area, send to yandex, get response and show it in another text area. Try to do that step by step and push the results to git.

// save API key from Yandex translator

// compose URL to request language list

// get language list from the API

// populate the dropdown menus with the language list (convert JSON into array + forEach create and append an option element)

// activate the page after the dropdowns are loaded

// add listeners to dropdown menus and textarea for text input

// add POSTs for src lang, targ lang, input text (with debouncer)

// create a function to encode the input text (regex?)

// use the API methods:
// https://translate.yandex.net/api/v1.5/tr.json/getLangs
//  ? [key=<API-ключ>]
//  & [ui=<код языка>]
//  & [callback=<имя callback-функции>]

// https://translate.yandex.net/api/v1.5/tr.json/detect
//  ? [key=<API-ключ>]
//  & text=<текст>
//  & [hint=<список вероятных языков текста>]
//  & [callback=<имя callback-функции>]
// Для исходного текста обязательно используйте URL-кодирование. = Use encoding with % and the UTF code for spaces, hyphens, etc)

// https://translate.yandex.net/api/v1.5/tr.json/translate
//  ? [key=<API-ключ>]
//  & [text=<переводимый текст>]
//  & [lang=<направление перевода>]
//  & [format=<формат текста>]
//  & [options=<опции перевода>]
//  & [callback=<имя callback-функции>]
