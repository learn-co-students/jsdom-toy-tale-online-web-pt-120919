let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  let collection = document.querySelector('#toy-collection')


  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then((toyObj) => {
    console.log(toyObj)
    let toysHtml = toyObj.map(function(toy) {
      return `
      <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button data-id="${toy.id}" class="like-btn">Like <3</button>
    </div>`
    })
    
    collection.innerHTML = toysHtml.join('')
  });

  toyFormContainer.addEventListener("submit", function(e) {
    e.preventDefault()
    console.log(e.target.name)

    const toyName = e.target.name.value
    const toyImage = e.target.image.value

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 0
      })
    };
     
    fetch("http://localhost:3000/toys", configObj)
    .then(res => res.json())
    .then(newToy => {
      let newToyHTML = `
        <div class="card">
        <h2>${newToy.name}</h2>
        <img src=${newToy.image} class="toy-avatar" />
        <p>${newToy.likes} Likes </p>
        <button data-id="${newToy.id}" class="like-btn">Like <3</button>
      </div>`

      collection.innerHTML += newToyHTML
    });
    console.log(e.target)
  })

  collection.addEventListener('click', (e) => {
    if (e.target.className === "like-btn") {

      let currLikes = parseInt(e.target.previousElementSibling.innerHTML)
      let newLikes = currLikes + 1
      e.target.previousElementSibling.innerHTML = newLikes + " Likes"

      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: newLikes
        })
      })

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
