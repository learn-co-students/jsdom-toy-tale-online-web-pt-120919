let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-toy-btn");
    const formContainer = document.querySelector(".container");

    addBtn.addEventListener("click", () => {
        console.log(this)
            // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
            formContainer.style.display = "block";
        } else {
            formContainer.style.display = "none";
        }
    });
    getToys()
});





function getToys() {
    fetch(' http://localhost:3000/toys')
        .then(response => response.json())
        .then(data => {
            data.forEach(el => {
                document.querySelector("#toy-collection").innerHTML += `
                <div class="card" id=${el.id}>
                  <h2>${el.name}</h2>
                  <img src="${el.image}" height="120">
                  <p>${el.likes}</p>
                  <button class="like-btn">Like</button>
                </div>  
              `
            })
            likeBtns = document.querySelectorAll(".like-btn");
            likeBtns.forEach(btn => {

                btn.addEventListener("click", function addLike(e) {

                    let add = parseInt(document.querySelector(".like-btn").parentElement.childNodes[5].innerText) + 1
                    return fetch(`http://localhost:3000/toys/${e.target.parentElement.id}`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json"
                            },
                            body: JSON.stringify({
                                "likes": add
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            document.querySelector(".like-btn").parentElement.childNodes[5].innerText = `${add}`
                            console.log(add)
                            e.preventDefault()
                        })
                })
            })
        })

}

function createToy() {
    return fetch('http://localhost:3000/toys', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
              "name": toy_data.name.value,
              "image": toy_data.image.value,
              "likes": 0
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
}