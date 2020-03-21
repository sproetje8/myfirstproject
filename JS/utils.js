const utils = {
	inputDebouncer: function () {
		debounce(utils.getTranslation, 2000);
	},
	sortLanguageList: function (langs) {
		return Object.entries(langs).sort(utils.compareByLang);
	},
	compareByLang: function (a, b) {
		if (a[1] < b[1]) return -1;
		if (a[1] > b[1]) return 1;
		return 0;
	},
	checkForInput: function () {
		let input = state.srcText;
		return input ? true : false; 
	},
	getTranslation: async function () {
		state.srcText = utils.getInput();
		let lang = utils.composeLang();
		let translateURL = urlHelper.composeTranslateURL(lang);
		return state.translation = await translator.translate(translateURL);
	},
	// setSrcLang: function () {
	// 	// let selectID = 'src-langs-list';
	// 	let elementValue = event.target.value;
	// 	// unselect(selectID, state.srcLang);
	// 	state.srcLang = elementValue;
	// 	// select(selectID, state.srcLang);
	// },
	setTargLang: function (event) {
		// let selectID = 'targ-langs-list';
		let elementValue = event.target.value;
		// unselect(selectID, state.targLang);
		state.targLang = elementValue;
		// select(selectID, state.targLang);
	},
	swapSrcAndTargLangs: function () {
		let selectSrcID = 'src-langs-list';
		let selectTargID = 'targ-langs-list';

		let selectSrcValue = document.getElementById(selectSrcID).value;
		let selectTargValue = document.getElementById(selectTargID).value;

		// unselect(selectSrcID, selectSrcValue);
		// unselect(selectTargID, selectTargValue);
		// select(selectSrcID, selectTargValue);
		// select(selectTargID, selectSrcValue);

		state.srcLang = selectTargValue;
		state.targLang = selectSrcValue;
	},
	getInput: function () {
		return document.getElementById('src-text').value;
	},
	// getDetectedSrcLang: async function () {
	// 	let detectURL = urlHelper.composeDetectURL();
	// 	let srcLang = await translator.detect(detectURL);
	// 	let selectSrcID = 'src-langs-list';
	// 	let srcLangOldValue = state.srcLang;	
		
	// 	return state.srcLang;
	// },
	composeLang: function () {
		return `${state.srcLang}-${state.targLang}`;
	},
	// check: if (srcLang) {
	// 	state.srcLang = srcLang;
	// 	unselect(selectSrcID, srcLangOldValue);
	// 	select(selectSrcID, srcLang);
	// }
}

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
