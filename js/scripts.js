const galleryDiv = document.querySelector('.gallery');
const body = document.querySelector('body');
let cards = null;  

const usersUrl = 'https://randomuser.me/api/?results=12&nat=us';
fetch(usersUrl)
    .then( (response) => response.json())
    .then( (data) => displayUsers(data.results));
    





function displayUsers(users)
{
    let usersHTML = "";
    users.forEach( (user) => usersHTML += getUserContent(user));
    galleryDiv.innerHTML = usersHTML;
    cards = document.querySelectorAll('.card');
    
    let searchForm = document.createElement('form');
    searchForm.innerHTML = getFormInnerHTML();
    searchForm.setAttribute('action' , "#");
    searchForm.setAttribute('method', "get");
    
    const searchContainer = document.querySelector('.search-container');
    searchContainer.appendChild(searchForm);

    addCardListeners(users,cards);

    
    
}


function addCardListeners(users,cards)
{

    let modalHTML = "";
    cards.forEach( (card,index) => {
        card.addEventListener('click', () => {
            const user = users[index];
            const dateOfBirth = getDate(user.dob.date);

            // update html content 
            modalHTML += getModalContent(user,dateOfBirth);
            
            galleryDiv.innerHTML = modalHTML;
            const closeButton = document.querySelector('.modal-close-btn');
            closeButton.addEventListener('click', () => displayUsers(users) ); 
            
            const searchContainer = document.querySelector('.search-container');
            const searchForm = document.querySelector('.search-container > form');
            searchContainer.removeChild(searchForm);
        });        
    });
}

function getModalContent(user,dateOfBirth)
{
    return "" +
     `<div class="modal-container">
      <div class="modal">
         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
         <div class="modal-info-container">
             <img class="modal-img" src=${user.picture.large} alt="profile picture">
             <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
             <p class="modal-text">${user.email}</p>
             <p class="modal-text cap">${user.location.city}</p>
             <hr>
             <p class="modal-text">${user.phone}</p>
             <p class="modal-text">${user.location.street}, ${user.location.state}, ${user.location.postcode}</p>
             <p class="modal-text">Birthday: ${dateOfBirth}</p>
         </div>
      </div>

      <div class="modal-btn-container">
         <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
         <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
      </div>`;
}
     
    
function getUserContent(user)
{
    return "" +
    `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src=${user.picture.large} alt="profile picture">
        </div>

        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>
    </div>`;
}            

function getFormInnerHTML()
{
    return "" +
    `<form>
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
    </form>`;
}

function getDate(string)
{
    const year = string.slice(0,4);
    const month = string.slice(5,7);
    const day = string.slice(8,10);

    return (`${day}/${month}/${year}`);
}

