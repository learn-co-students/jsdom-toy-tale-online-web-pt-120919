// variables in the global scope
let addToy = false;
const BASE_URL = 'http://localhost:3000'
const TOYS_URL = `${BASE_URL}/toys`
divCollect = document.querySelector('#toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        postToys(event.target)
      })
    } else {
      toyForm.style.display = 'none'
    }
  })

  fetchToys().then(toys => {
    toys.forEach(toy => {
      renderToys(toy)
    })
  })
});


const fetchToys = () => {
  
  return fetch(TOYS_URL)
  .then(resp => resp.json())
}

const postToys = (toy_data) => {
  fetch(TOYS_URL, {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify({
      name: toy_data.name.value,
      image: toy_data.image.value,
      likes: 0
    })
  })
    .then(resp => resp.json())
    .then((obj_toy) =>{
      let new_toy = renderToys(obj_toy)
      divCollect.append(new_toy)
    })
}

const likeToys = (e) => {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(TOYS_URL, {
    method: 'PATCH',
    headers: {
      'content-type': "application/json"
    },
    body: JSON.stringify({
      likes: more
    })
  })
  .then(resp => resp.json())
  .then((like_obj => {
    e.target.previousElementSibling.innerText = `${more} likes`;
  }))
}

const renderToys = (toy) => {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likeToys(e)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollect.append(divCard)
}