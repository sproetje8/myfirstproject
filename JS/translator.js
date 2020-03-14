const translator = {
	getLangs: async function (getLangsURL) {
		let response = await fetch(getLangsURL);
		let result = await response.json();
		let languageListObject = result.langs;
		
		return languageListObject;
	},
	detect: function (text, callback) {
		fetch(`${apiAddress}detect?text=${encodeURI(text)}&key=${apiKey}`)
			.then(response => response.json())
			.then(result => {
				if (typeof callback === 'function') callback(result.lang);
			});
	},
	translate: async function (translateUrl) {
		let response = await fetch(translateUrl);
		let result = await response.json();
		translation = result.text;
		
		return translation;
	}
}
