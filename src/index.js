let addToy = false;

function fetchToys(){
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => renderToys(json))
}

function renderToys(toys) {
  //console.log(JSON.stringify(toys))
  const container = document.getElementById('toy-collection')
  container.innerHTML = '';

    toys.forEach(toy => { 
      let title = document.createElement('h2')
      title.innerHTML = toy.name 
      container.appendChild(title)

      let img = document.createElement('img');
      img.src = toy.image
      img.className = 'toy-avatar'
      container.appendChild(img);

      let likes = document.createElement('p')
      likes.innerHTML = toy.likes + ' Likes'
      container.appendChild(likes)
      
      let likeBtn = document.createElement('button')
      likeBtn.className = "like-btn"
      likeBtn.innerHTML = "Like <3"
      
      likeBtn.addEventListener('click', function() {
        likeToy(toy.id)
      });

      container.appendChild(likeBtn)
    });
}

function likeToy(id){
  return fetch("http://localhost:3000/toys/"+id)
    .then(resp => resp.json())
    .then(json => {

    let formData = {
      likes: json.likes + 1
    };
 
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
      
    fetch("http://localhost:3000/toys/"+id, configObj)
      .then(function(response) {
        fetchToys()
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()

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

  const addBtn2 = document.getElementsByName("submit")[0];
  addBtn2.addEventListener("click", () => {
    name = document.getElementsByName('name')[0].value
    image = document.getElementsByName('image')[0].value

    submitData(name, image)
  });

});

function submitData(name, image, likes=0){
    let formData = {
       name: name,
       image: image,
       likes: likes
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
     
    return fetch("http://localhost:3000/toys", configObj)
};





  