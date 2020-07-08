let addToy = false;
const addToyBtn = document.querySelector("input.submit");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", event => {
        event.preventDefault();
             
        fetchAddToy(event.target);
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });


  fetchToys();
  
});




function fetchToys() {
  return fetch("http://localhost:3000/toys")
    .then(function(response) {
        return response.json();
    })
    .then(function(toys) {
      const toyDiv = document.getElementById("toy-collection");
      toys.forEach(toy => {
        const newDiv = document.createElement('div');
        newDiv.className = "card";

        //h2 tag
        const newHeader = document.createElement('h2');
        newHeader.innerText = toy.name;
        newDiv.appendChild(newHeader);

        //img tag
        const newImg = document.createElement('img');
        newImg.src = toy.image;
        newImg.className = "toy-avatar";
        newDiv.appendChild(newImg);

        //p tag
        const newP = document.createElement('p');
        newP.innerText = toy.likes;
        newDiv.appendChild(newP);

        //btn tag 
        const newBtn = document.createElement('button');
        newBtn.className = "like-btn";
        newBtn.setAttribute('id', toy.id)
        newBtn.innerText = "Like";
        newDiv.appendChild(newBtn);

        newBtn.addEventListener("click", (event) => {
          fetchLikeToy(event.target);
        })

        toyDiv.appendChild(newDiv);
      }) 
    });
}

function fetchAddToy(toy) {
  return fetch("http://localhost:3000/toys", {
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
      })
    .then(function(response) {
        return response.json();
    })
    .then(function() {
      location.reload();
    });

}

function fetchLikeToy(toy) {
  
  let likes = parseInt(toy.previousElementSibling.innerText) + 1

 // debugger;
  return fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
            "likes": likes
          })
      })
    .then(function(response) {
        return response.json();
    })
    .then(function(object) {
      toy.previousElementSibling.innerText= likes;
    });


}