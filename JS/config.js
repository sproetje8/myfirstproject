const apiKey =
	'trnsl.1.1.20200303T102859Z.6823171d9619f449.50fd2197c0e0b5befffaf0806fafd924b64f046b';
const apiAddress = 'https://translate.yandex.net/api/v1.5/tr.json/';
const apiMethods = ['getLangs', 'detect', 'translate'];

function getConfig() {
	return {
		apiKey,
		apiAddress,
		apiMethods
	}
}
