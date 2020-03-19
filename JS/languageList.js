let languageListObject;

async function initLanguages() {
	const GETLANGSURL = urlHelper.composeGetLangsURL();
	languageListObject = await getLanguageList(GETLANGSURL);
	let sortedLangsArray = sortLanguageList(languageListObject);
	populateLanguageList(sortedLangsArray);

}

async function getLanguageList(GETLANGSURL) {
	return await translator.getLangs(GETLANGSURL);
}

function sortLanguageList() {
	return Object.entries(languageListObject).sort(compareByLang);
}

function compareByLang(a, b) {
	if (a[1] < b[1]) return -1;
	if (a[1] > b[1]) return 1;
	return 0;
}

// create for each value of languageListObject an option element in the DOM to fill the language list
function populateLanguageList(sortedLangsArray) {
	let selectSrcLang = document.getElementById('src-langs-list');
	let selectTargLang = document.getElementById('targ-langs-list');

	sortedLangsArray.forEach((language) => {
		let optionSrc = document.createElement('option');
		let optionTarg = document.createElement('option');

		let abbrIndex = 0;
		let fullLanguageIndex = 1;

		optionSrc.text = optionTarg.text = language[fullLanguageIndex];
		optionSrc.value = optionTarg.value = language[abbrIndex];

		if (optionSrc.value === appState.srcLang) {
			optionSrc.setAttribute('selected', 'selected');
		}

		if (optionTarg.value === appState.targLang) {
			optionTarg.setAttribute('selected', 'selected');
		}

		selectSrcLang.add(optionSrc);
		selectTargLang.add(optionTarg);
	});
}