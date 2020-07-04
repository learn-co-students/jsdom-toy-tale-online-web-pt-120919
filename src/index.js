let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }

    const newToy = document.getElementsByName("submit")[0];
      newToy.addEventListener("click", () => {
      name = document.getElementsByName('name')[0].value
      image = document.getElementsByName('image')[0].value

      submitData(name, image)
    });

  });
  fetchToys()
});


function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(json => renderToys(json))
}

function renderToys(toys) {
  const collection = document.getElementById('toy-collection')
  collection.innerHTML = ''

  toys.forEach(toy => {

    let name = document.createElement('h2')
    name.innerHTML = toy.name
    collection.appendChild(name)

    let image = document.createElement('img')
    image.src = toy.image
    image.className = "toy-avatar"
    collection.appendChild(image)

    let likes = document.createElement('p')
    likes.innerHTML = toy.likes + ' likes'
    collection.appendChild(likes)

    let likeBtn = document.createElement('button')
    likeBtn.innerHTML = "Like <3"
    likeBtn.className = "like-btn"

    likeBtn.addEventListener("click", function() {
      likeToy(toy.id)
    })
    collection.appendChild(likeBtn)
  })

}

function likeToy(id){
  return fetch("http://localhost:3000/toys/"+id)
    .then(resp => resp.json())
    .then(json => {

    let likeData = {
      likes: json.likes + 1
    }

    let configToy = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(likeData)
    }

    fetch("http://localhost:3000/toys/"+id, configToy)
      .then(function(response) {
        fetchToys()
    })
  })
}

function submitData(name, image, likes=0){
    let toyData = {
       name: name,
       image: image,
       likes: likes
    }

    let configToy = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toyData)
    }

    return fetch("http://localhost:3000/toys", configToy)
}
