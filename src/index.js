let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", getAllToys());

function getAllToys() {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toyDataAll => toyDataAll.forEach(toy => renderToy(toy)))
};

function renderToy(toy) {
   console.log(toy);

   const toyCard = document.createElement('div');
   toyCard.className = 'card';
   document.getElementById('toy-collection').appendChild(toyCard);
   
   const toyName = document.createElement('h2');
   toyName.innerText = toy.name;
   toyCard.appendChild(toyName);

   const toyImage = document.createElement('img');
   toyImage.src = toy.image;
   toyImage.className = 'toy-avatar';
   toyCard.appendChild(toyImage);
   
   const toyLikes = document.createElement('p');
   let numLikes = toy.likes;
   toyLikes.className = 'like_button';
   toyLikes.innerText = `${numLikes} likes`
   toyCard.appendChild(toyLikes);

   const likeButton = document.createElement('btn');
   likeButton.className = 'button';
   likeButton.id = toy.id;
   likeButton.innerText = "Like";
   toyCard.appendChild(likeButton);

   likeButton.addEventListener('click', function() {
    numLikes++;
    if (numLikes === 1) {
      toyLikes.innerText = `${numLikes} like`
    }
    else toyLikes.innerText = `${numLikes} likes`
    
    toy.likes = numLikes;

    updateLikeCount(toy);
   })
}

function updateLikeCount(obj) {  
  fetch(`http://localhost:3000/toys/${obj.id}`, { 
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  .then(res => res.json())
  .then(toy => console.log(toy ))

}

document.addEventListener("DOMContentLoaded", toySubmitted()) 

function toySubmitted(e) {
  const form = document.getElementById("toy-form");
  form.addEventListener('submit', function(e) { 
    e.preventDefault();
    let toyObj = {
      name:e.target.name.value,
      image:e.target.image.value,
      likes:0
    }
    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toyObj)
    })
    .then(res => res.json())
    .then(json => renderToy(json))
  })
}