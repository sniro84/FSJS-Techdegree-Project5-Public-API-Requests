/******************************************
Treehouse FSJS Techdegree:
project 5 - Public API Requests
Name: Snir Holland
Date: 05/08/2019
******************************************/

// Selecting the gallery div and the body of HTML file
const galleryDiv = document.querySelector('.gallery');
const body = document.querySelector('body');

// Each card should contain user's details (name, email, location) 
let cards = null;

// The search bar which will be appended to and removed from screen
let searchForm = null;

// Request 12 employees with american nationality
const usersUrl = 'https://randomuser.me/api/?results=12&nat=us';
fetch(usersUrl)
    .then( (response) => response.json())
    .then( (data) => displayUsers(data.results));

// This function display user details in the form of 'cards'.    
function displayUsers(users)
{
    // Appending HTML content to gallery div.
    let usersHTML = "";
    users.forEach( (user) => usersHTML += getUserContent(user));
    galleryDiv.innerHTML = usersHTML;

    // The cards array can now be filled. 
    cards = document.querySelectorAll('.card');
    
    // Dynamically add a search bar.
    searchForm = document.createElement('form');
    searchForm.innerHTML = getFormInnerHTML();
    searchForm.setAttribute('action' , "#");
    searchForm.setAttribute('method', "get");
    const searchContainer = document.querySelector('.search-container');
    searchContainer.appendChild(searchForm);

    // Add event listeners
    addCardListeners(users);
    addSearchListener();
}

// This function adds event listeners to all cards
function addCardListeners(users)
{ 
    cards.forEach( (card,index) => {
        card.addEventListener('click', () => {

            // helper variables
            const user = users[index];
            const dateOfBirth = getDate(user.dob.date);

            // update html content inside the gallery div 
            const modalHTML = getModalContent(user,dateOfBirth);            
            galleryDiv.innerHTML = modalHTML;

            // add modal close button listener
            const closeButton = document.querySelector('.modal-close-btn');
            closeButton.addEventListener('click', () =>  displayUsers(users) );
            
            // add modal toggle buttons (next/prev)
            addModalToggleListeners(index);

            //remove search bar   
            if (searchForm !== null)   // card click event is NOT triggered by modal toggle button clicks.
            {
                const searchContainer = document.querySelector('.search-container');
                searchForm = document.querySelector('.search-container > form');
                searchContainer.removeChild(searchForm);
                searchForm = null;
            }
        });        
    });
}

// This function adds event listener to search form
function addSearchListener()
{    
    const searchSubmit = document.querySelector('form');
    searchSubmit.addEventListener('submit', filterResults);    
}

// This function adds event listener to modal toggle buttons 
function addModalToggleListeners(index)
{
    // The 'next' button
    const nextButton = document.querySelector('#modal-next');
    nextButton.addEventListener('click', () => {
        const i = getNextIndex(index);  
        cards[i].dispatchEvent(new Event("click"));  // trigger card 'click' event
    });

    // The 'prev' button
    const prevButton = document.querySelector('#modal-prev');
    prevButton.addEventListener('click', () => {
        const i = getPrevIndex(index);
        cards[i].dispatchEvent(new Event("click"));  // trigger card 'click' event
    }); 
}

// This function displays search results with respect to search input value
function filterResults()
{
    // Extracting value from search input field
    const searchInput = document.querySelector('.search-input');
    const value = searchInput.value;

    // Iterate all the cards and search for the value 
    for(let i=0; i<cards.length; i++)
    {
        // Get the full name from the data in the user's card
        const fullname = cards[i].children[1].children[0].textContent;

        // If the full name contains the value --> show card, otherwise --> hide card
        cards[i].style.display = (fullname.search(value) === -1) ? "none" : "";   
    }
}

// This function translates the modals of users to HTML content
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

// This function translates the cards of users to HTML content   
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

// This function translates search bar to HTML content
function getFormInnerHTML()
{
    return "" +
    `<form>
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
    </form>`;
}

// Helper function to extract the date from a string and change its template.
function getDate(string)
{
    const year = string.slice(0,4);
    const month = string.slice(5,7);
    const day = string.slice(8,10);

    return (`${day}/${month}/${year}`);
}

// Helper function to get the next index number of a specified 'index'. 
function getNextIndex(index)
{
    const firstIndex = 0;
    const lastIndex = cards.length - 1;

    // if 'index' is the last one in the array, return the first index.
    return (index === lastIndex) ? firstIndex : index + 1;
}

// Helper function to get the previous index number of a specified 'index'. 
function getPrevIndex(index)
{
    const firstIndex = 0;
    const lastIndex = cards.length - 1;

    // if 'index' is the first one in the array, return the last index.
    return (index === firstIndex) ? lastIndex : index - 1;
}

