let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection")

  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toys => {
      // take my toys array and make HTML with them in order to add them to the DOM
      let toysHTML = toys.map(function(toy){ //get all the toys back and transform them to html
        return `
        <div class="card">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p>${toy.likes} Likes </p>
          <button data-id="${toy.id}" class="like-btn">Like <3</button>
        </div>
        `
      })
      //console.log(toysHTML)
      toyCollection.innerHTML = toysHTML.join('')
    })

  toyFormContainer.addEventListener("submit", function(event){
    event.preventDefault()
    //console.log(event.target.name)
    //grab the inputs from form
    const toyName = event.target.name.value
    const toyImage = event.target.image.value
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 99
      })
    })
    .then(response => response.json())
    .then(newToy => {
      //fetch updated the DB
      //now i need to update the DOM
      //convert newToy from JSON to HTML in order to add to DOM
      let newToyHTML = `
        <div class="card">
          <h2>${newToy.name}</h2>
          <img src=${newToy.image} class="toy-avatar" />
          <p>${newToy.likes} Likes </p>
          <button data-id="${newToy.id}" class="like-btn">Like <3</button>
        </div>
      `
      toyCollection.innerHTML += newToyHTML
      console.log(event.target.reset()) //creates the toy then resets form
    })
    
  })

toyCollection.addEventListener("click", (event) => {
  if (event.target.className === "like-btn") {
    let currentLikes = parseInt(event.target.previousElementSibling.innerText)
    let newLikes = currentLikes + 1
    event.target.previousElementSibling.innerText = newLikes + " likes"

    fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": newLikes
      })
    })
  }  
})


  addBtn.addEventListener("click", () => { //this is for add a new toy
    // hide & seek with the form
    addToy = !addToy; //whenever i click, i make add toy the oppositie (so if it starts as true it's now false; "toggle syntax")
    if (addToy) {
      toyFormContainer.style.display = "block"; //if true (which it is), then take the style and display and make it block
    } else {
      toyFormContainer.style.display = "none"; //if display = none it will not render on the page
    }
  });
});
