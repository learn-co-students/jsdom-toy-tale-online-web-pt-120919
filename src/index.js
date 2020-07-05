let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.getElementById("add-toy-form");
  addToys();

  function addToyToPage(id, name, image, likes) {
    const toyCollection = document.getElementById("toy-collection");

    const div = document.createElement('div');
    div.setAttribute("id", name)
    const h2 = document.createElement('h2');
    h2.innerText = name;
    div.appendChild(h2);

    const img = document.createElement('img');
    img.setAttribute("src", image);
    img.setAttribute("class", "toy-avatar");
    div.appendChild(img);

    const p = document.createElement('p');
    p.innerText = `${likes} Likes`;
    div.appendChild(p);

    const bttn = document.createElement('button');
    bttn.setAttribute("class", "like-btn");
    bttn.setAttribute("value", id);
    bttn.innerText = "Like <3";

    bttn.addEventListener("click", function(event){
      increaseLikes(event.srcElement.value);
    });

    div.appendChild(bttn);
    toyCollection.append(div)

  }

  function increaseLikes(toy){

    fetch(`http://localhost:3000/toys/${toy}`).then(function(response){
      return response.json();
    }).then(function(toyObject){
      let toyLikes = toyObject.likes += 1;

      let formData = {
        likes: toyLikes
      }

      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData) 
      }

      fetch(`http://localhost:3000/toys/${toy}`, configObj).then(function(response){
        return response.json();
      }).then(function(toyObject){
        let toyLikes = document.querySelector(`div#${toyObject.name} p`)
        toyLikes.innerText = `${toyObject.likes} Likes`
      })
    })



  }

 function addToys(){
  fetch('http://localhost:3000/toys').then(function(response){
    return response.json();
  }).then(function(json) {
    for (const toy of json){
      addToyToPage(toy.id, toy.name, toy.image, toy.likes)
    }
  })
 }
  
  addBtn.addEventListener("click", () => {
    // hIde & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })

  toyForm.addEventListener("submit", function(event){
    const toyName = document.getElementById("name").value;
    const toyImage = document.getElementById("image").value;

    let formData = {
      name: toyName,
      image: toyImage,
      likes: 0
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData),
    }

    fetch("http://localhost:3000/toys", configObj).then(function(response){
      return response.json();

    }).then(function(toyObject){
      addToyToPage(toyObject.name, toyObject.image, toyObject.likes);

    }).catch(function(error){
      console.log(error.message);
    });

    event.preventDefault();
  });
});