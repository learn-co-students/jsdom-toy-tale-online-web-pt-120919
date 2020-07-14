const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
//console.log("%cDOM is loaded", "color :purple")
  const toyCollection = document.querySelector("#toy-collection")

fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then(toys => {
    let toysHTML = toys.map(function(toy) {
      return `
      <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button data-id="${toy.id}" class="like-btn">Like <3</button>
  </div>
      `
    })
    toyCollection.innerHTML = 
    document.querySelector("#toy-collection").innerHTML = toysHTML.join('')

  })

  toyForm.addEventListener('submit', function(e) {
    e.preventDefault()
    console.log(e.target.name)
    const toyName = e.target.name.value 
    const toyImage = e.target.image.value 

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
      .then(r => r.json())
      .then(newToy => {
        let newToyHTML = `
        <div class="card">
    <h2>${newToy.name}</h2>
    <img src=${newToy.image} class="toy-avatar" />
    <p>${newToy.likes} Likes </p>
    <button data-id="${newToy.id}" class="like-btn">Like <3</button>
  </div>
        `
        toyCollection.innerHTML += newToyHTML
        //document.querySelector("#toy-collection").innerHTML += newToy.HTML
      console.log(e.target.reset())
      
      })
    })

    toyCollection.addEventListener("click", (e) => {
      if (e.target.className === "like-btn") {

        let currentLikes = parseInt(e.target.previousElementSibling.innerText) 
        let newLikes = currentLikes + 1
        e.target.previousElementSibling.innerText = newLikes + " Likes"
      
      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`)
      }
    })

  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
