let addToy = false;

// starts false
document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.getElementById('toy-collection')
  fetch(`http://localhost:3000/toys`)
  .then(response => response.json())
  .then(toys => {
    console.log(toys)
    let toysHTML = toys.map(function(toy){
      return `<div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button data-id='${toy.id}' class="like-btn">Like <3</button>
      <button data-id='${toy.id}' class="delete-btn">Blast Off!</button>
    </div>`
    })
    toyCollection.innerHTML = toysHTML.join('')
  })
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  toyFormContainer.addEventListener('submit',function(e){
    e.preventDefault()
    const toyName = e.target.name.value
    const toyImage = e.target.image.value
    
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



  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    // toggle if clicked turns true
    if (addToy) {
      toyFormContainer.style.display = "block";
      
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
