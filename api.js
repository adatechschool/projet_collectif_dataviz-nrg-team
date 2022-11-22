const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6c3825cd5dmsh566a0d01b2db89fp1c843cjsn018abed16448',
		'X-RapidAPI-Host': 'netflix-api3.p.rapidapi.com'
	}
}; 

let url = 'https://netflix-api3.p.rapidapi.com/year/2020';

let inputCountryUser = "United States";
let inputGenreUser = "Dramas";

function getDataInfo() {
        fetch(url, options)
            .then((response) => {
                return response.json()
            })
            .then ((jsonData) => {
                searchDataBase(jsonData)
            })
            .catch ((err) => {
                console.log(err);
            })
}

getDataInfo()
function getTitleByCountryandTitle (country, title, listedIn){
let titleResult = [];
    for (i = 0; i < country.length; i++){
        if (inputCountryUser == country[i] && inputGenreUser == listedIn[i]){
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
	console.log(statement);
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
