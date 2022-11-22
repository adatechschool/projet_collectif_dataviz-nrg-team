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