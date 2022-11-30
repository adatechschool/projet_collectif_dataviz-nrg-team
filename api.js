
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
let inputDirectorUser = document.getElementById("directorsearchbar");
let buttonYears = document.getElementById("validationYears");//bouton



// == Collback event: à chaque click sur button envoie ce qui est dans bar du recherch
buttonYears.addEventListener('click', e => {
	// ajouter une condition qui prendre juste des chiffre et 4 chiffre, sinon affiche "votre demande ne pas trouvée"
	// ==================== index 4 = aaaa qui prendre la valeur donnée par utilisateur
	urlTab[4] = years.value
	console.log(urlFinal)
	// filmresults 
	// ==================== transférer tableau en url
	let urlFinal = urlTab.join("/")
	getAPIinfo(urlFinal, options) // utiliser pour fetch

})

// ======================= Avoir récuperé api avec fetch
function getAPIinfo(url, options){

	fetch(url, options)
		.then(response => {
			
			return response.json()// trensformer type donnée en json

		})
		.then(data => {
			console.log(data)
			searchDataBase(data)
			
		})
		.catch(err => console.error(err)); // retourner erreur si ne pas fonction data
}

// ===================================== Récuperer la json et ajouter dans tableaux chaque valeur, years[0] = 1999
function searchDataBase (jsonData){

	console.log(jsonData)
	let type = []
    let titleList = [];
	let years = [];
	let directorList = [];
	let acteurs = [];
	let listedInlist = []; // genre du film
    let countryList = [];
	let description = [];

    for (i = 0; i < jsonData.length; i++){

		if(jsonData[i].type == "TV Show"){// avoir les émission télé

			type.push(jsonData[i].type)
			titleList.push(jsonData[i].title) 
			years.push(jsonData[i].releaseYear)
			directorList.push(jsonData [i].director)
			acteurs.push(jsonData[i].cast)
			listedInlist.push(jsonData[i].listedIn)
			countryList.push(jsonData[i].country)
			description.push(jsonData[i].description)

		} else if(jsonData[i].type == "Movie"){// avoir les film
			
			type.push(jsonData[i].type)
			titleList.push(jsonData[i].title) 
			years.push(jsonData[i].releaseYear)
			directorList.push(jsonData [i].director)
			acteurs.push(jsonData[i].cast)
			listedInlist.push(jsonData[i].listedIn)
			countryList.push(jsonData[i].country)
			description.push(jsonData[i].description)

		}
    }

    getTitleByCountryandTitle (type, titleList, years, directorList, acteurs, listedInlist, countryList, description);

}

// ================================== Avoir les titre type annéee... d'un film dans condition les filtres du country, Genre et director
function getTitleByCountryandTitle (type, title, years, director, acteurs, listedIn, country, description){

	let result = []
	let resultFinal = []
	let j = 0
	for (i = 0; i < country.length; i++){
		if (
				country[i].includes(inputCountryUser.value) == true && 
				listedIn[i].includes(inputGenreUser.value) == true &&
				director[i].includes(inputDirectorUser.value) ==true)
				{
					result.push(type[i] + title)// [movie]
					// result.push(title[j])// [movie], [toto]
					// console.log("i: ", i,result[i])
					// resultFinal.push(result)

				}
				j++
    }
	// console.log(resultFinal)

	afficheFilm(result)//Ajouter resulta du film dans fonction pour afficher sur page html 
	
	let test = []
	
	test[0] = result[0].split(" ")
	test[1] = result[1].split(" ")

	// console.log(test)


}

// =========================== Cline html après chaque changement d'un api
const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};
// =========================== Avoir affiché les films sur page html
function afficheFilm(result){
	
	let divResult;
	let filmresults = document.getElementById("resultFilm");
	removeChilds(filmresults)
	let chaqueFilm = []

	for(let i = 0; i<result.length; i++){

		chaqueFilm[i] = result[i].split(" ")

	}

	for(let i = 0; i< result.length; i++){

		divResult = document.createElement("div")
		divResult.className = "classFordevResult"
		divResult.innerText = result[i]
		filmresults.appendChild(divResult)
	}

}
