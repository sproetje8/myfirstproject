function renderTranslation(translation) {
	const translationField = document.getElementById('translation');
	translationField.innerText = translation;
}

function unselect(selectID, languageAbbr) {
	let selectElement = document.getElementById(selectID);
	let selectOptions = selectElement.options;

	for (let opt, i = 0; opt = selectOptions[i]; i++) {
		if (opt.value === languageAbbr) {
			selectElement.selectedIndex = i;
			selectElement.options[selectElement.selectedIndex].removeAttribute('selected');
			break;
		}
	}

	return selectElement;
}

function select(selectID, optionValToSelect) {
	let selectElement = document.getElementById(selectID);
	let selectOptions = selectElement.options;

	for (let opt, i = 0; opt = selectOptions[i]; i++) {
		if (opt.value === optionValToSelect) {
			selectElement.selectedIndex = i;
			selectElement.options[selectElement.selectedIndex].setAttribute('selected', 'selected');
			selectElement.text = opt.text;
			break;
		}
	}
}