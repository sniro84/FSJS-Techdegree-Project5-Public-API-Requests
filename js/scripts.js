const galleryDiv = document.querySelector('.gallery');
const body = document.querySelector('body');





const usersUrl = 'https://randomuser.me/api/?results=12';
fetch(usersUrl)
    .then( (response) => response.json())
    .then( (data) => displayUsers(data.results));


    
function displayUsers(users)
{
    let usersHTML = "";
    users.forEach( (user) => {
        usersHTML += 
        `<div class="card">
            <div class="card-img-container">
                <img class="card-img" src=${user.picture.medium} alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
        </div>`;   
    });
    galleryDiv.innerHTML = usersHTML;
    addListeners();
}

function addListeners()
{
    const cards = document.querySelectorAll('div.card');
    
    cards.forEach( (card) => {
        card.addEventListener('click', () => {
            alert("clicked");
        });
    });
}





