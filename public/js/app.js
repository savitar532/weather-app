const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    const url = 'http://localhost:3000/weather?address=' + location
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    fetch(url).then((response)=>{
        response.json().then((data)=>{


            if(data.error){
            return messageOne.textContent = data.error
            }
            messageOne.textContent = data.location 
            messageTwo.textContent = data.forecast
        })
    })

})





  

// const url = 'https://lorem-ipsum-api.p.rapidapi.com/sentence?amount=2';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '03803038bdmsh44a419428ad57c8p1011dfjsnc1d93bfef96f',
// 		'x-rapidapi-host': 'lorem-ipsum-api.p.rapidapi.com'
// 	}
// };

// try {
// 	const response =  fetch(url, options);
// 	// const result =response.text();
// 	console.log("jiljil jiga " + response);
// } catch (error) {
// 	console.error(error);
// }