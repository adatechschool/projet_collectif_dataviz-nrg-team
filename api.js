// ==================== Avoir api
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6c3825cd5dmsh566a0d01b2db89fp1c843cjsn018abed16448',
		'X-RapidAPI-Host': 'netflix-api3.p.rapidapi.com'
	}
};
let url = 'https://netflix-api3.p.rapidapi.com/year/2021'
let urlTab = url.split("/")// Transformer url en tableau
// ======================================== Rouh
// ====================== avoir input search et button serach par année
let years = document.getElementById("years")//bar du recherche
let inputCountryUser = document.getElementById("countrysearchbar");
let inputGenreUser = document.getElementById("genresfilter");
let buttonYears = document.getElementById("validationYears");//bouton


// == Collback event: à chaque click sur button envoie ce qui est dans bar du recherch
buttonYears.addEventListener('click', e => {
	// ajouter une condition qui prendre juste des chiffre et 4 chiffre, sinon affiche "votre demande ne pas trouvée"
	// ==================== index 4 = aaaa qui prendre la valeur donnée par utilisateur
	urlTab[4] = years.value
	// ==================== transférer tableau en url
	let urlFinal = urlTab.join("/")
	console.log('----------------------->',urlFinal)// chaeck nouveu url
	getAPIinfo(urlFinal, options) // utiliser pour fetch
})

// ======================= Avoir récuperé api avec fetch
function getAPIinfo(url, options){
	console.log("---------",url)//cheack api
	// asycrhone pour api
	fetch(url, options)
		.then(response => {
			return response.json()// trensformer type donnée en json
		})
		.then(data => {
			searchDataBase(data)
			//console.log(data)//cheack les donnée
		})
		.catch(err => console.error(err)); // retourner erreur si ne pas fonction data
}

function getTitleByCountryandTitle (country, title, listedIn){
	console.log(inputCountryUser.value)
let titleResult = [];
    for (i = 0; i < country.length; i++){
        if (inputCountryUser.value == country[i] && inputGenreUser.value == listedIn[i]){
            titleResult.push(title[i]);
        /*} else if (inputCountryUser == country[i] && typeof(inputGenreUser) == null){
			titleResult.push(title[i]);
		} else if (typeof(inputCountryUser) == null && inputGenreUser == listedIn[i]){
			titleResult.push(title[i]);
		} else if (typeof(inputCountryUser) == null && typeof(inputGenreUser) == null){
			statement = 'Veuillez choisir un pays ou un genre'*/
		}
    }
    console.log(titleResult);
}


function searchDataBase (jsonData){
    let countryList = [];
    let titleList = [];
	let listedInlist = [];
    for (i = 0; i < jsonData.length; i++){
        countryList.push(jsonData[i].country)
        titleList.push(jsonData[i].title)
		listedInlist.push(jsonData[i].listedIn)
    }
    getTitleByCountryandTitle (countryList, titleList, listedInlist);
}
