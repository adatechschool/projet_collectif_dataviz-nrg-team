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


// OPTIONS POUR APIS

const optionsNetflix = {

    method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6c3825cd5dmsh566a0d01b2db89fp1c843cjsn018abed16448',
		'X-RapidAPI-Host': 'netflix-api3.p.rapidapi.com'
	}

}

const optionsMovieDataBase = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6c3825cd5dmsh566a0d01b2db89fp1c843cjsn018abed16448',
		'X-RapidAPI-Host': 'outking.p.rapidapi.com'
	}
};

// NETFLIX ==============================================


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
        
        let resultatFinal = filterObjectsFromInputUser(finalArrayOfNetflixObjects);
        console.log(resultatFinal);
        
    })()

}




// Cette fonction groupDataObjectsInOneArray regroupe le data récolté par groupDataFromNetflix en un seul tableau de résultat
function groupDataObjectsInOneArray(array){
    const arrayResult = array.flat();
    return arrayResult;
}




// Cette fonction filtre les objets de l'API Netflix en fonction des inputs rentrés par les utilisateurs. 
let titleNetflixToUrlMovieDataBase = [];
function filterObjectsFromInputUser (array){


let arrayofResultsObjectsFromFilter = [];

    for (i=0; i < array.length; i++){
        

        if (
            array[i].country.includes(inputCountryUser.value) == true &&
            array[i].listedIn.includes(inputGenreUser.value) == true &&
            array[i].director.includes(inputDirectorUser.value) == true
        ){
            
            arrayofResultsObjectsFromFilter.push(array[i]);
            titleNetflixToUrlMovieDataBase.push(array[i].title);
        }
    }
    
    let UrlForMovieDataBase = createUrlMovieDataBaseFromArrayOfTitle(titleNetflixToUrlMovieDataBase);
    //console.log(UrlForMovieDataBase);
    getResultFromMovieDataBase(UrlForMovieDataBase, optionsMovieDataBase);
    return arrayofResultsObjectsFromFilter;
}




// Cette fonction créé un URL pour l'API de Movie DataBase à partir du titre du résultat de la recherche Netflix
let urlMovieDataBaseOrigin = "https://api.themoviedb.org/3/search/movie?api_key=37be5d290801265a56611ad3b8802f85&query="
let arrayOfTitleForUrlMovieDataBase = [];

function createUrlMovieDataBaseFromArrayOfTitle (array){

    for (i = 0; i < array.length; i++){

        arrayOfTitleForUrlMovieDataBase.push(array[i].replace(/ /g, "+"));
    }
    return arrayOfTitleForUrlMovieDataBase;
}

// IMAGE FROM MOVIEDATABASE API ======================


// Cette fonction ira chercher le poster de Movie Data Base 
function getResultFromMovieDataBase (arrays, options){

    (async () => {
        try {
            const names = await Promise.all(
                arrays.map(async (array) => {
                    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=37be5d290801265a56611ad3b8802f85&query=${array}`, options);
                    const name = await response.json()
                    return name
                })
            )
            getPosterPathFromMovieDataBase(names)
        } catch (e){
            console.log(e.messages)
        }
    })()

}


// Cette fonction ira chercher le lien de l'image JPG correspondant au résultat de notre recherche et la stockera dans un tableau.
let posterPathForMatches = []; 
function getPosterPathFromMovieDataBase (array){
    for (i = 0; i < array.length; i++){
        console.log(array[i].results[0].poster_path)

        // if (
        //     array[i].results[0] == null ||
        //     array[i].results[0].poster_path == null
        //     ){
        //         posterPathForMatches.push(array[i].results[0].poster_path);
        //     }
        
    }
    // console.log(posterPathForMatches);
    // return posterPathForMatches;
}
