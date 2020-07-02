let addToy = false;

document.addEventListener('DOMContentLoad', fetchToys());

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
  });
});

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => createCard(json))
  }

function createCard(json) {
  const collection = document.querySelector('div#toy-collection');
  for (toy of json) {
    let newDiv = document.createElement('div')
    newDiv.className = "card" 
    createName(toy, newDiv)
    createPhoto(toy, newDiv)
    totalLikes(toy, newDiv)
    addBtn(toy, newDiv)
    collection.appendChild(newDiv)
  }
}

function createName(toy, card){
  let name = document.createElement('h2')
  name.innerText = toy.name
  card.appendChild(name)
}

function createPhoto(toy, card) {
  let img = document.createElement('img')
  img.src = toy.image
  img.className = "toy-avatar"
  card.appendChild(img)
}

function totalLikes(toy, card) {
  let likes = document.createElement('p')
  likes.innerText = `${toy.likes} likes`
  card.appendChild(likes)
}

function addBtn(toy, card) {
  let newBtn = document.createElement('button')
  newBtn.addEventListener("click", function() {
    increaseCount(toy);
    window.location.reload(true);
  })
  newBtn.className = "like-btn"
  newBtn.style = "width: 30px;height:30px;cursor:pointer;"
  newBtn.innerText = "♥"
  card.appendChild(newBtn)

}

form = document.querySelector('.add-toy-form')
form.addEventListener('submit', submitData())

function submitData() {

  let formData = {
    "name": document.querySelectorAll('.index-text')[0].value,
    "image": document.querySelectorAll('.index-text')[1].value,
    "likes": "0"
  }

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
   
  fetch("http://localhost:3000/toys", configObj)
      .then(response => response.json())
      .then(json => console.log(json))
}

    
function increaseCount(toy) {

  let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": parseInt(toy.likes) + 1
        })
  };

  fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
}




