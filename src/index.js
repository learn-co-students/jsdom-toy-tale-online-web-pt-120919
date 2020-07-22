  let addToy = false
  const toyForm = document.querySelector('.container')
  const addBtn = document.querySelector('#new-toy-btn')
  const toyCollection = document.querySelector("#toy-collection")

  document.addEventListener("DOMContentLoaded", () => {


    addBtn.addEventListener('click', () => {
      addToy = !addToy
      if (addToy){
        toyForm.style.display = 'block'
      } else {
        toyForm.style.display = "none"
      }
    });
    //this is toggle syntax. If add toy is true then display, else don't. 






  
  

 
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys => {
    //Take my toys array and make HTML with in ORDER TO ADD THEM TO THE DOM
    //so we create a variable so we can access it. 
    let toysHTML = toys.map(function(toy){
      return `
      <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button data-id="${toy.id}" class="like-btn">Like <3</button>
    </div>
    `
    })
    //Now that this is working properly, we can grab the element and display it on the DOM. 
    
    toyCollection.innerHTML = toysHTML.join(" ") //.join removed the commas in between. 
  })


  toyForm.addEventListener("submit", function(e) {
    e.preventDefault()
    
    const toyName = e.target.name.value
    const toyImage = e.target.image.value

    console.log(toyName)

    fetch("http://localhost:3000/toys", {
      method: "POST" ,
      headers: {
        "Content-Type": "application/json", 
        "Accept": "application/json"
      }, 
      body: JSON.stringify({
        name: toyName , 
        image: toyImage , 
        likes: 2
      })
      }
    )
    .then( r => r.json())
    .then( newToy => {
      
      let newToyHTML = `
       <div class="card">
      <h2>${newToy.name}</h2>
      <img src=${newToy.image} class="toy-avatar" />
      <p>${newToy.likes} Likes </p>
      <button data-id="${newToy.id}" class="like-btn">Like <3</button>
    </div>`

    toyCollection.innerHTML += newToyHTML
    console.log(e.target.reset())

    })
  });
  
  toyCollection.addEventListener("click", (e) =>{
    if (e.target.className === "like-btn"){
      console.log(e.target)
      let currentLikes = parseInt(e.target.previousElementSibling.innerText)
      let newLikes = currentLikes + 1 
      e.target.previousElementSibling.innerText = newLikes + " likes"

    }
  })


  })


