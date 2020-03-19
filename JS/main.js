// 2.Получить список поддерживаемых языков для Google Translate API (использовать callback)
// 3.Определить язык следующих слов: "หนูมัสคแร็ต" и тп ДОБАВИТЬ СЛОВ (использовать Promise)
// 4.Перевести слово "ბომონერი" на китайский, после чего перевести его на русский (сделать на callback и Promise)
// 5.Паттерны проектирования (Observer, Singleton, Factory...)

let CONFIG = {};

async function init() {
	CONFIG = getConfig();
	Object.freeze(CONFIG);
	await initLanguages();
	createListeners();
}

init();
