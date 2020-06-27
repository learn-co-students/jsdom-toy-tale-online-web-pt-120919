let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
  
addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", function(event){
        event.preventDefault()
        postToyData(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function getToys(){
  fetch("http://localhost:3000/toys")
  .then(function(response){
  return response.json()
  .then(function(toys){
    toys.forEach(function(toy){
      renderToys(toy)
    })
  })
  })}

  function renderToys(toy){
      let card = document.createElement('div');
      let name = document.createElement('h2');
      let image = document.createElement('img');
      let likes = document.createElement('p');
      let button = document.createElement('button');
      const collection = document.getElementById('toy-collection')
      card.className = "card";
      image.className = "toy-avatar";
      button.className = "like-btn";
      name.innerHTML = toy["name"]
      image.src = toy["image"]
      likes.innerHTML = `${toy["likes"]}Likes`
      button.innerHTML = "Like"
      collection.append(card)
      card.appendChild(name)
      card.appendChild(image)
      card.appendChild(likes)
      card.appendChild(button)
    }


function postToyData(data){
fetch("http://localhost:3000/toys", {
  method:"POST",
  headers: {
  "Content-Type":"application/json",
  "Accept":"application/json"
},
body: JSON.stringify({
  name: "data.name.value",
  image: "data.image.value",
  likes: 0
}) 
})
  .then(function(response){
    return response.json()
  })
  .then(function(object){
    debugger
    console.log(object)
  })
}

getToys()
