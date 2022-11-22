// ==================== Avoir api
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6c3825cd5dmsh566a0d01b2db89fp1c843cjsn018abed16448',
		'X-RapidAPI-Host': 'netflix-api3.p.rapidapi.com'
	}
};
let url = 'https://netflix-api3.p.rapidapi.com/year/2021'
let urlTab = url.split("/")
// ====================== avoir inpur search et button serach par année
let years = document.getElementById("years")
let buttonYears = document.getElementById("validationYears")

// ====================== collback pour récuperer année
buttonYears.addEventListener('click', e => {
	
	// ==================== Changer la valeur du url après utlisateur
	urlTab[4] = years.value
	// ==================== recréer un neauveau url
	let urlFinal = urlTab.join("/")
	console.log('----------------------->',urlFinal)
	getAPIinfo(urlFinal, options)
})

// ======================= Avoir récuperé api avec ferch
function getAPIinfo(url, options){
	console.log("---------",url)
	fetch(url, options)
		.then(response => {
			return response.json()
		})
		.then(data => {
			console.log(data)
		})
		.catch(err => console.error(err));
}


