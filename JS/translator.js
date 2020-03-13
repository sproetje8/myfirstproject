const translator = {
	getLangs: async function (URL) {
		let response = await fetch(URL);
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
	translate: async function (text, lang, translation, callback) {
		await fetch(`${apiAddress}translate?text=${encodeURI(text)}&key=${apiKey}&lang=${lang}`)
			.then(response => response.json())
			.then(result => translation = result.text);
		await callback(translation);
	}
}
