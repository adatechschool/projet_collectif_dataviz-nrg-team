// Données utilisateur ==================================

let inputYearsUser = document.getElementById("years"); // Demander l'année à l'utilisateur
let inputCountryUser = document.getElementById("countrysearchbar"); // Demander le pays à l'utilisateur
let inputGenreUser = document.getElementById("genresfilter") // Demander le genre à l'utilisateur
let inputDirectorUser = document.getElementById("directorsearchbar"); // Demander le réalisateur à l'utilisateur
let buttonSearch = document.getElementById("validationSearch") // Lancer la recherche




// Déclencher l'évènement CLICK
buttonSearch.addEventListener('click', e => {

groupDataFromNetflix (createNetflixUrlForDecade(urlNetflix), optionsNetflix);

})




// Créer un tableau d'URL pour une décennie =============

let urlNetflix = 'https://netflix-api3.p.rapidapi.com/year/2021' // Url de base de l'api Netflix.
let decadeUrlNetflixArr = []; // Créer le tableau d'urls pour la décennie

// La fonction createNetflixUrlForDecade créer un tableau de 10 url correspondant à la décennie choisie par l'utilisateur. Elle commence par vider ce tableau s'il était plein auparavant.
function createNetflixUrlForDecade (url){ 
    decadeUrlNetflixArr.splice(0,decadeUrlNetflixArr.length);

    let cutUrl = url.split("/"); 
    let endfOfUrl = "";

    for (i = parseInt(inputYearsUser.value); i < parseInt(inputYearsUser.value) + 10; i++){
        
        cutUrl[4] = i;
        endfOfUrl = cutUrl[4].toString();
        decadeUrlNetflixArr.push(endfOfUrl);
    }
    return decadeUrlNetflixArr;
    
}
// NETFLIX ==============================================

const optionsNetflix = {

    method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6c3825cd5dmsh566a0d01b2db89fp1c843cjsn018abed16448',
		'X-RapidAPI-Host': 'netflix-api3.p.rapidapi.com'
	}

}

// Cette fonction groupDataFromNetflix envoie une requête fetch pour chaque url d'un tableau d'url et récolte leurs données.

let finalArrayOfNetflixObjects = [];

function groupDataFromNetflix (arrays, options){

    (async () => {
        try {
            const names = await Promise.all(
                arrays.map(async(array) => {
                    const response = await fetch(`https://netflix-api3.p.rapidapi.com/year/${array}`, options);
                    
                    const name = await response.json();
                    return name;
                })
            )
            finalArrayOfNetflixObjects = groupDataObjectsInOneArray(names);

        } catch(e) {
            console.log(e.messages);
        }
        //console.log(finalArrayOfNetflixObjects);
        filterObjectsFromInputUser(finalArrayOfNetflixObjects);
        
    })()

}

// Cette fonction groupDataObjectsInOneArray regroupe le data récolté par groupDataFromNetflix en un seul tableau de résultat
function groupDataObjectsInOneArray(array){
    const arrayResult = array.flat();
    return arrayResult;
}

// Cette fonction filtre les objets de l'API Netflix en fonction des inputs rentrés par les utilisateurs. 
function filterObjectsFromInputUser (array){

let arrayofResultsObjectsFromFilter = [];

    for (i=0; i < array.length; i++){
        

        if (
            array[i].country.includes(inputCountryUser.value) == true &&
            array[i].listedIn.includes(inputGenreUser.value) == true &&
            array[i].director.includes(inputDirectorUser.value) == true
        ){
            
            arrayofResultsObjectsFromFilter.push(array[i]);
    
        }
    }
    console.log(arrayofResultsObjectsFromFilter);
	let compteur = arrayofResultsObjectsFromFilter.length;
    document.body.innerHTML += compteur;
}
