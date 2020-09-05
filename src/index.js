

document.addEventListener("DOMContentLoaded", () => {
  let toycollection = document.getElementById("toy-collection")
  fetch('http://localhost:3000/toys')
  .then( resp => resp.json() )
  .then(toys => {for(let toy of toys)
   toycollection.innerHTML +=
   `
   <div class = "card">
   <h2>${toy.name}</h2>
  <br><img src = ${toy.image} >
<br><p>${toy.likes}</p>
<br><button class = "like-bttn" onclick = "like()" data-id = ${toy.id} data-likes = ${toy.likes}></button>
</div>`
})})

function add(){
  let name = document.getElementById("name").value
  let image = document.getElementById("image").value
  let toy = {
    name: name ,
    image: image
  }
 fetch( "http://localhost:3000/toys"),{
   method: "POST",
headers: 
{
  "Content-Type": "application/json",
  Accept: "application/json"
},
body: JSON.stringify(toy) }}



function like(){
  let toyId = parseInt(event.target.dataset.id)
  let like = parseInt(event.target.dataset.likes)
  fetch(`http://localhost:3000/toys/${toyId}`,{
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({

      likes: like + 1,
    }    )
  })
}
 


