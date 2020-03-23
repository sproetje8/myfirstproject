let urlHelper = {
	composeGetLangsURL: function () {
		return `
		${CONFIG.apiAddress}
		${CONFIG.apiMethods[0]}
		?ui=${state.srcLang}
		&key=${CONFIG.apiKey}
		`;
	},
	composeDetectURL: function () {
		return `
		${CONFIG.apiAddress}
		${CONFIG.apiMethods[1]}
		?text=${encodeURI(state.srcText)}
		&key=${CONFIG.apiKey}
		`;
	},
	composeTranslateURL: function (lang) {
		return `
		${CONFIG.apiAddress}
		${CONFIG.apiMethods[2]}
		?text=${encodeURI(state.srcText)}
		&key=${CONFIG.apiKey}
		&lang=${lang}
		`;
	}
}





