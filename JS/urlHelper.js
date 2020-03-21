let urlHelper = {
	composeGetLangsURL: function () {
		return `${CONFIG.apiAddress}getLangs?ui=${state.srcLang}&key=${CONFIG.apiKey}`;
	},
	composeDetectURL: function () {
		return `${CONFIG.apiAddress}detect?text=${encodeURI(state.srcText)}&key=${CONFIG.apiKey}`;
	},
	composeTranslateURL: function (lang) {
		return `${CONFIG.apiAddress}translate?text=${encodeURI(state.srcText)}&key=${CONFIG.apiKey}&lang=${lang}`;
	}
}





