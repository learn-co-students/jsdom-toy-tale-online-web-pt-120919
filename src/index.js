let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
  
addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener("submit", function(event){
        event.preventDefault()
        postToyData(event.target)          
      })
    } else {
      toyForm.style.display = "none";
    }
  });

  function getToys(){
  fetch("http://localhost:3000/toys")
  .then((response) => response.json())
  .then((toys) => {
    toys.forEach(function(toy){
      renderToys(toy)
    })
  })
  }

  function renderToys(toy){
      let card = document.createElement('div');
      let name = document.createElement('h2');
      let image = document.createElement('img');
      let likes = document.createElement('p');
      let button = document.createElement('button');
      const collection = document.getElementById('toy-collection')
      card.className = "card";
      image.className = "toy-avatar";
      name.innerHTML = toy["name"]
      image.src = toy["image"]
      button.className = "like-btn";
      button.innerHTML = "Like"
      button.addEventListener("click", function(e){
      fetch("http://localhost:3000/toys")
      .then((response) => response.json())
      .then((json) => addLikes(json,e))
      })
      likes.innerHTML = `${toy["likes"]} Likes`
      
      collection.append(card)
      card.append(name, image, likes, button)
    }


function postToyData(data){

fetch("http://localhost:3000/toys", {
  method:"POST",
  headers: {
  "Content-Type":"application/json",
  "Accept":"application/json"
},
body: JSON.stringify({
  name: `${data[0].value}`,
  image: `${data[1].value}`,
  likes: 0
}) 
})
  .then((response) => response.json())
  .then((object) => {
    renderToys(object)
  })
}

function addLikes(json,e){
  e.preventDefault()
  let add = parseInt(e.target.previousElementSibling.innerText) + 1
  let toy = e.target.parentElement
  let toyTitle= toy.childNodes[0].innerHTML
  let foundToy = json.find((toy)=>toy.name === toyTitle)
  fetch(`http://localhost:3000/toys/${foundToy.id}`, {
  method : "PATCH",
  headers: {
  "Content-Type": "application/json",
  "Accept": "application/json"
  },
  body: JSON.stringify({
  "likes": add
  })
  })
  .then((response)=>response.json())
  .then((newLike) => {
    e.target.previousElementSibling.innerText = `${add} likes`;
  })
}
getToys()

