// Returns data from DB in JSON
function fetchToys(){
  return fetch('http://localhost:3000/toys').then(function(response){ 
      return response.json();
  })
}

// Adds toys from fetchToys() onto web page
function renderToys(toy){
  const toyCollection = document.querySelector("#toy-collection");

  const div = document.createElement('div');
  div.setAttribute("id", toy.name)

  const h2 = document.createElement('h2');

  const img = document.createElement('img');
  img.setAttribute("src", toy.image);
  img.setAttribute("class", "toy-avatar");

  const p = document.createElement('p');
  p.innerText = `${toy.likes} Likes`;

  const btn = document.createElement('button');
  btn.setAttribute("class", "like-btn");
  btn.setAttribute("id", toy.id);
  btn.innerText = "Like <3";

  btn.addEventListener("click", function(event){
    addLike(event)
  });

  div.append(h2, img, p, btn);
  toyCollection.append(div)
}

// Iterate over toys, add each toy to web page
fetchToys().then(function(toys){
  for(const toy of toys){
    renderToys(toy);
  }
})

let addToy = false;
const addBtn = document.getElementById('new-toy-btn');
const toyFormContainer = document.querySelector('.container');

// Toggles between showing and hiding toy form
addBtn.addEventListener("click", () => {
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
     
    toyFormContainer.addEventListener('submit', function(event) {
      postToy(event.target);
      event.preventDefault();
    })
  } 
  else {
    toyFormContainer.style.display = "none";
  }
});

// Adds toy from toy form
function postToy(toy) {
  let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": toy.name.value,
          "image": toy.image.value,
          "likes": 0
        })
      }

  fetch('http://localhost:3000/toys', configObj).then(function(response){
    return response.json();

  }).then(function(toyObject){
    renderToys(toyObject);
  })
}

// Increase toy likes
function addLike(event){
  let increasedLikes = parseInt(event.target.previousElementSibling.innerText) + 1;
  
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": increasedLikes
    })
  }

  fetch(`http://localhost:3000/toys/${event.target.id}`, configObj).then(function(response){
    return response.json();

  }).then(function(toyObject){
    event.target.previousElementSibling.innerText = `${increasedLikes} Likes`;
  })
}
