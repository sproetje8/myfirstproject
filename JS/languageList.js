async function initLanguages() {
	const GET_LANGS_URL = urlHelper.composeGetLangsURL();
	let langs = await getLanguageList(GET_LANGS_URL);
	let sortedLangsArray = utils.sortLanguageList(langs);

	return sortedLangsArray;
}

async function getLanguageList(GET_LANGS_URL) {
	return await translator.getLangs(GET_LANGS_URL);
}
