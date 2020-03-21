let renderer = {
	populateLanguageList: function (sortedLangsList) {
		let selectSrcLang = document.getElementById('src-langs-list');
		let selectTargLang = document.getElementById('targ-langs-list');
	
		sortedLangsList.forEach((language) => {
			let optionSrc = document.createElement('option');
			let optionTarg = document.createElement('option');
	
			let abbrIndex = 0;
			let fullLanguageIndex = 1;
	
			optionSrc.text = optionTarg.text = language[fullLanguageIndex];
			optionSrc.value = optionTarg.value = language[abbrIndex];
	
			if (optionSrc.value === state.srcLang) {
				optionSrc.setAttribute('selected', 'selected');
			}
	
			if (optionTarg.value === state.targLang) {
				optionTarg.setAttribute('selected', 'selected');
			}
	
			selectSrcLang.add(optionSrc);
			selectTargLang.add(optionTarg);
		});
	},
	renderTranslation: function () {
		let translation = state.translation;
		const translationField = document.getElementById('translation');
		translationField.innerText = translation;
	},
	renderSrcLang: function () {
		document.getElementById('src-langs-list').value = state.srcLang;
	},
	renderTargLang: function () {
		document.getElementById('targ-langs-list').value = state.targLang;
	},
	// unselect: function (selectID, languageAbbr) {
	// 	let selectElement = document.getElementById(selectID);
	// 	let selectOptions = selectElement.options;
	
	// 	for (let opt, i = 0; opt = selectOptions[i]; i++) {
	// 		if (opt.value === languageAbbr) {
	// 			selectElement.selectedIndex = i;
	// 			selectElement.options[selectElement.selectedIndex].removeAttribute('selected');
	// 			break;
	// 		}
	// 	}
	// },
	// select: function (selectID, optionValToSelect) {
	// 	let selectElement = document.getElementById(selectID);
	// 	let selectOptions = selectElement.options;
	
	// 	for (let opt, i = 0; opt = selectOptions[i]; i++) {
	// 		if (opt.value === optionValToSelect) {
	// 			selectElement.selectedIndex = i;
	// 			selectElement.options[selectElement.selectedIndex].setAttribute('selected', 'selected');
	// 			selectElement.text = opt.text;
	// 			break;
	// 		}
	// 	}
	// },
	moveTranslationToInput: function () {
		let translationValue = document.getElementById('translation').value;
		state.srcText = translationValue;
		document.getElementById('src-text').value = state.srcText;
	}
}
