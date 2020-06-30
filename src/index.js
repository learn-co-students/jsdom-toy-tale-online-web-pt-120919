let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form");
  toyForm.addEventListener('submit', submitToy);
  

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function submitToy(event) {
    let formData = {
      'name': document.querySelector(".input-text")[0],
      'imgUrl': document.querySelector(".input-text")[1],
    };
  
    let configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": "Jessie",
        "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
        "likes": 0
      })
    };

    fetch("http://localhost:3000/toys", configurationObject)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      console.log(object);
      let toyCollection = document.getElementById('toy-collection');
      toyCollection.appendChild(createToyCard(object));
    })
    .catch(function(error) {
      alert("Error when creating toy!");
      console.log(error.message);
    });

    event.preventDefault();
  }

  fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    let toyCollection = document.getElementById('toy-collection');
    for (let i = 0; i < object.length; i++) {
      toyCollection.appendChild(createToyCard(object[i]));
    }
    const likeButtons = document.getElementsByClassName("like-btn");

    function like() {
      let likes = this.getElementsByTagName('p')[0].innerHTML[0];
      let i = 1;
      if (likes == '-') {
        likes += this.getElementsByTagName('p')[0].innerHTML[1];
        i++;
      }
      while (this.getElementsByTagName('p')[0].innerHTML[i] != ' ') {
        likes += this.getElementsByTagName('p')[0].innerHTML[i];
        i++;
      }
      
      likes = parseInt(likes);
      likes++;
      this.getElementsByTagName('p')[0].innerHTML = `${likes} Likes`;

      let configurationObject = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": likes
        })
      };
      let url = `http://localhost:3000/toys/${this.id}`;
      fetch(url, configurationObject)
      .then(function(response) {
        return response.json();
      })
      .then(function(object) {
        console.log('patch success');
      })
      .catch(function(error) {
        alert("Error when creating toy!");
        console.log(error.message);
      });
    }
  
    for (let i = 0; i < likeButtons.length; i++) {
      let parent = likeButtons[i].parentElement;
      parent.addEventListener('click', like);
    }

  })
  .catch(function(error) {
    alert("Error when creating toy!");
    console.log(error.message);
  });

  function createToyCard(toyData) {
    let ele = document.createElement('div');
    ele.id = toyData.id;
    ele.className = 'card';
    let toyName = toyData.name;
    let h2 = document.createElement('h2');
    h2.innerHTML = toyName;
    let img = document.createElement('img');
    img.src = toyData.image;
    img.className = 'toy-avatar';
    let likes = toyData.likes;
    let p = document.createElement('p');
    p.innerHTML = `${likes} Likes`;
    let button = document.createElement('button');
    button.className = 'like-btn';
    button.innerHTML = 'Like <3';
    ele.appendChild(h2);
    ele.appendChild(img);
    ele.appendChild(p);
    ele.appendChild(button);
    return ele;
  }
});
