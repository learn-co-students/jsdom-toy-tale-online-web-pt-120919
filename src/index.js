let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      getForm().addEventListener('submit', addNewToy)
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

  function addNewToy(event) {
    event.preventDefault()

    let nameElement = document.getElementById("name-field")
    let imageElement = document.getElementById("img-url-field")
    // console.log(image)

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
      },
      body: JSON.stringify({
          name: nameElement.value,
          image: imageElement.value,
          likes: 0

      })
    })
      .then(resp => resp.json())
      .then(data => createToy(data))
  }

document.addEventListener('DOMContentLoaded', function() {
  getToys()
})

function getToys() {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => toys.forEach(toy => (createToy(toy))));
}

function createToy(toy_Obj) {
  // make div
  let div = document.createElement("div")
  div.classList.add("card")
  // make h2
  let h2 = document.createElement('h2')
  h2.innerText = toy_Obj.name
  //  make img
  let img = document.createElement('img')
  img.src = toy_Obj.image
  img.classList.add('toy-avatar')
  //  make p
  let p = document.createElement('p')
  p.innerText = `${toy_Obj.likes} Likes`

  let btn = document.createElement('button')
  btn.addEventListener('click', updateLike)
  btn.classList.add('like-btn')
  btn.id = toy_Obj.id
  btn.innerText = "Like <3"

  div.append(h2, img, p, btn)
 
  getToyDiv().appendChild(div)
}



  function updateLike(event) {
    // console.log(event.currentTarget.parentElement.querySelector('p'))
    let currentLike = event.currentTarget.previousSibling.innerText
    currentLike = parseInt(currentLike.split(" ")[0])
    currentLike += 1

    let id = event.currentTarget.id
    console.log(id)
    let paragraph = event.currentTarget.previousSibling

    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: currentLike
      })
    })
      .then(resp => resp.json())
      .then(data => {
        paragraph.innerText = `${data.likes} Likes`
      })
  }

  function getToyDiv() {
    return document.getElementById('toy-collection')
  }

  function getForm() {
    return document.querySelector(".add-toy-form")
  }

