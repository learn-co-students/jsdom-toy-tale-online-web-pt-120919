let addToy = false; 
// default setting for toggle
// starts false

// document.addEventListener("DOMContentLoaded", () => {

// }) 
// this waits till the dom content has loaded
  const toyCollection = document.getElementById('toy-collection')
  // find the toy collection in DOM
  fetch(`http://localhost:3000/toys`)
  .then(response => response.json()) // parses response to json
  .then(toys => { // toys = parsed toys data
    // take my toys array make HTML with them in ORDER TO ADD THEM TO THE DOM
    // map does this for us immediatly transforms them into HTML
    console.log(toys)
    let toysHTML = toys.map(function(toy){ 
      // save it as a variable(toyHTML) so you can console log it
      return `<div class="card">
      <h2>${toy.name}</h2> 
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button data-id='${toy.id}' class="like-btn">Like <3</button>
      <button data-id='${toy.id}' class="delete-btn">Blast Off!</button>
    </div>`
    })
    toyCollection.innerHTML = toysHTML.join('')
    // add the join to remove the commas
    // if there was already information already inside you would 
    // need to += instead of equals so it doesn't override previous data
  })
  const addBtn = document.querySelector("#new-toy-btn"); // given code
  const toyFormContainer = document.querySelector(".container"); // given code
  
  toyFormContainer.addEventListener('submit',function(e){
    e.preventDefault()
    const toyName = e.target.name.value
    const toyImage = e.target.image.value
    console.log(toyName)
    fetch('http://localhost:3000/toys',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 99
      })
    })
    .then(response => response.json())
    .then(newToy => {
      //fetch updated database now you have to update the DOM
      // have to convert new toy from JSON to HTML in order to add to the DOM
      // use += instead of = so it doesn't over ride everything instead it adds it
      let newToyHTML = `<div class="card">
      <h2>${newToy.name}</h2>
      <img src=${newToy.image} class="toy-avatar" />
      <p>${newToy.likes} Likes </p>
      <button data-id='${newToy.id}' class="like-btn">Like <3</button>
      <button data-id='${newToy.id}' class="delete-btn">Blast Off!</button>
    </div>`

      toyCollection.innerHTML += newToyHTML
      console.log(e.target.reset())
    })
    
  })


toyCollection.addEventListener('click',(e)=>{
  
  if (e.target.className === 'like-btn'){
   let currentLikes = parseInt(e.target.previousElementSibling.innerText)
   let newLikes = currentLikes + 1
   e.target.previousElementSibling.innerText = newLikes + " Likes"
   
   fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
     method:'PATCH',
     headers: {
       "Content-Type": "application/json",
       "Accept": "application/json"
     },
     body: JSON.stringify({
       likes: newLikes
     })
   })
   
  }
  if (e.target.className === "delete-btn"){
    fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
      method:'DELETE'
    })
    .then(response => {
      e.target.parentElement.remove()
      
    })
  }
})


// GIVEN CODE----------------------------------
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy; 
    // whenever I click it's switching between true and false
    // toggle if clicked turns true
    if (addToy) {
      toyFormContainer.style.display = "block";
      
    } else {
      toyFormContainer.style.display = "none";
    }
  });
// });
