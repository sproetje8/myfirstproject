let urlHelper = {
	composeGetLangsURL: function () {
		return `${CONFIG.apiAddress}getLangs?ui=${appState.srcLang}&key=${CONFIG.apiKey}`;
	},
	composeDetectURL: function () {
		return `${CONFIG.apiAddress}detect?text=${encodeURI(appState.srcText)}&key=${CONFIG.apiKey}`;
	},
	composeTranslateURL: function (lang) {
		return `${CONFIG.apiAddress}translate?text=${encodeURI(appState.srcText)}&key=${CONFIG.apiKey}&lang=${lang}`;
	}
}





