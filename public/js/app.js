console.log("Client side javascript file is loaded!")

const form = document.querySelector('form')
const searchInput = form.querySelector('#search-input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')


// // Log the current value of the input field
// searchInput.addEventListener('input', (e) =>  {
//     console.log("Current Input Value: ", e.target.value);
//   });

// // Log the final value of the input field
// searchInput.addEventListener('change', (e) =>{   
//     console.log("Final Input Value: ", e.target.value);
//   });



form.addEventListener('submit', (e) => {
    const search =  searchInput.value

    e.preventDefault()

    messageOne.textContent = 'Loading..'
    
    fetch(`http://localhost:3000/weather?address=${search}`)
    .then(res => {
       return res.json() 
    }).then(data => {
        if(data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = `Current degress is ${data.temperature} and it's ${data.description}`
            console.log(data)
        }
    }) 
})




