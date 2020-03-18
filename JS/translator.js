const translator = {
	getLangs: async function (getLangsURL) {
		let response = await fetch(getLangsURL);
		let result = await response.json();
		let languageListObject = result.langs;
		
		return languageListObject;
	},
	detect: async function (detectURL) {
		let response = await fetch(detectURL);
		let result = await response.json();
		let detectedSrcLang = result.lang;
		
		return detectedSrcLang;
	},
	translate: async function (translateURL) {
		let response = await fetch(translateURL);
		let result = await response.json();
		translation = result.text;
		
		return translation;
	}
}
