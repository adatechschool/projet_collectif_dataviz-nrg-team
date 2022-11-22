const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6c3825cd5dmsh566a0d01b2db89fp1c843cjsn018abed16448',
		'X-RapidAPI-Host': 'netflix-api3.p.rapidapi.com'
	}
}; 

fetch('https://netflix-api3.p.rapidapi.com/year/2020', options)
	.then(response => response.json())
	.then(data => data[0].director)
	.catch(err => console.error(err));

console.log(data[0])


//////

function updateHTMLWithData(data) {
	console.log(data[0].director)
	document.getElementsByClassName('news')[0].textContent = data
}

function getAPIinfo() {
	let url = 'https://....'
	fetch(url, options)
		.then((response) => {
			return response.json()
		})
		.then((jsonData) => {
			console.log(jsonData)
			updateHTMLWithData(jsonData)
		})
		.catch((err) => {
			console.log('Une erreur est survenue')
			console.error(err)
		})
}

getAPIinfo()