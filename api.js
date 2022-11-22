const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6c3825cd5dmsh566a0d01b2db89fp1c843cjsn018abed16448',
		'X-RapidAPI-Host': 'netflix-api3.p.rapidapi.com'
	}
}; 

let url = 'https://netflix-api3.p.rapidapi.com/year/1999';

let inputCountryUser = "United States";

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
function getTitleByCountryandTitle (country, title){
let titleResult = [];
    for (i = 0; i < country.length; i++){
        if (inputCountryUser == country[i]){
            titleResult.push(title[i])
        }
    }
    console.log(titleResult);
}

function searchDataBase (jsonData){
    let countryList = [];
    let titleList = [];
    for (i = 0; i < jsonData.length; i++){
        countryList.push(jsonData[i].country)
        titleList.push(jsonData[i].title)
    }
    getTitleByCountryandTitle (countryList, titleList);
}
