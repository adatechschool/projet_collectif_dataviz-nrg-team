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
	
	// ==================== transférer tableau en url
	let urlFinal = urlTab.join("/")
	console.log('----------------------->',urlFinal)// chaeck nouveu url
	getAPIinfo(urlFinal, options) // utiliser pour fetch
})

// ======================= Avoir récuperé api avec fetch
function getAPIinfo(url, options){

	fetch(url, options)
		.then(response => {
			
			return response.json()// trensformer type donnée en json

		})
		.then(data => {

			searchDataBase(data)
			
			separateShowTvAndMovie(data)
			
		})
		.catch(err => console.error(err)); // retourner erreur si ne pas fonction data
}

function getTitleByCountryandTitle (country, title, listedIn, director){
	console.log(inputCountryUser.value)
let titleResult = [];
    for (i = 0; i < country.length; i++){
        if (
			country[i].includes(inputCountryUser.value) == true && 
			listedIn[i].includes(inputGenreUser.value) == true &&
			director[i].includes(inputDirectorUser.value) ==true){
            titleResult.push(title[i] +  " -- Director: " + director[i]);
		}
    }
	document.getElementById("filmresults").innerHTML = titleResult.join("<br>");
	console.log(titleResult);
	//console.log(directorResult);
}


function searchDataBase (jsonData){
    let countryList = [];
    let titleList = [];
	let listedInlist = [];
	let directorList = [];
    for (i = 0; i < jsonData.length; i++){
        countryList.push(jsonData[i].country)
        titleList.push(jsonData[i].title)
		listedInlist.push(jsonData[i].listedIn)
		directorList.push(jsonData [i].director)
    }
    getTitleByCountryandTitle (countryList, titleList, listedInlist, directorList);
}
// ============================= Avoir les film à partir de l'année
function separateShowTvAndMovie(data){
	
	let emissionTV = [""]
	let film = [""]
	let j = 0
	
// ========================== Parcourire de donnée pour récuperer chaque valeur qui ont besoin
	let i = 0;
	while(i<=data.length-1){

		if(data[i].type == "TV Show"){// avoir les émission télé
			
			emissionTV[j] = data[i];

			j++
		}else if (data[i].type == "Movie"){//avoir les film
			
			film.push(data[i])
		
		}
		i++
	}
	showTvToYears(emissionTV)
	filmToYears(film)

}

let showTvAndFilm = document.getElementById("ShowTvAndFilm")// div qui contenir les émission télé et film 

// ======================== Avoir les emission télé
function showTvToYears(emissionTv){
	
	let i = 0;
	while(i <= emissionTv.length-1){
		let titleP = document.createElement("p")
		let typeP = document.createElement("p")
		titleP.innerText = emissionTv[i]["title"]
		typeP.innerText = emissionTv[i]["type"]
		showTvAndFilm.appendChild(titleP)
		showTvAndFilm.appendChild(typeP)
		
		i++
	}
}


// ======================== Avoir les film
function filmToYears(film){
	console.log("film: ", film)
}
