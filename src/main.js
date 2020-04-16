var bodyInput = document.querySelector('.body-input');
var ideaCardsSection = document.querySelector('.idea-cards');
var ideasArray = JSON.parse(localStorage.getItem('ideasArray')) || [];
var menuSideBar = document.querySelector('.side-bar')
var mobileMenuIcon = document.querySelector('.mobile-menu');
var saveButton = document.querySelector('.save-button');
var searchInput = document.querySelector('.search-input')
var showStarredButton = document.querySelector('.starred-ideas-button');
var titleInput = document.querySelector('.title-input');
var upperRightForm = document.querySelector('.upper-right-form');


window.onload = onLoadHandler();

ideaCardsSection.addEventListener('click', targetCard);
mobileMenuIcon.addEventListener('click', openMenuHeader);
saveButton.addEventListener('click', storeIdea);
searchInput.addEventListener('keyup', searchIdeas);
showStarredButton.addEventListener('click', showStarredIdeas);
upperRightForm.addEventListener('keyup', checkEmptyInputs);

function onLoadHandler() {
  checkEmptyInputs();
  displayCards(ideasArray);
  reinstantiateCards();
}

function checkEmptyInputs() {
  if(titleInput.value && bodyInput.value) {
    saveButton.disabled = false;
    saveButton.classList.remove('darkness-disabled');
  } else {
    saveButton.disabled = true;
    saveButton.classList.add('darkness-disabled');
  }
}

function displayCards(array) {
  ideaCardsSection.innerHTML = '';
  for (var i = 0; i < array.length; i++) {
    createCard(array[i]);
  }
}

function reinstantiateCards() {
  var oldIdeasArray = ideasArray;
  ideasArray = [];
  for(var i = 0; i < oldIdeasArray.length; i++) {
    var currentIdea = new Idea({title: oldIdeasArray[i].title, body: oldIdeasArray[i].body, id: oldIdeasArray[i].id, isStarred: oldIdeasArray[i].isStarred});
    ideasArray.push(currentIdea);
  }
}

function createCard(idea) {
  var starVariable = idea.isStarred ? 'star-active' : 'star';
  ideaCardsSection.insertAdjacentHTML('beforeend', `<section class="single-card" data-id="${idea.id}">
    <div class="card-header">
      <img src="assets/${starVariable}.svg" class="idea-star" alt="white-star">
      <img src="assets/menu-close.svg" class="idea-close" alt="X button">
    </div>
    <h4 class="card-title">${idea.title}</h4>
    <p class="card-body">${idea.body}</p>
    <div class="card-footer">
      <img src="assets/comment.svg" class="idea-comment" alt="plus-symbol">Comment
    </div>
  </section>`);
}

function openMenuHeader () {
  var ideas = document.querySelector('.ideas');
  ideas.classList.toggle('darkness');
  menuSideBar.classList.toggle('expanded');
  if (menuSideBar.classList.contains('expanded')) {
    mobileMenuIcon.src = 'assets/menu-close.svg';
    toggleDisable();
   } else {
    mobileMenuIcon.src = 'assets/menu.svg';
    toggleDisable();
   }
}

function toggleDisable() {
  titleInput.disabled = !titleInput.disabled;
  bodyInput.disabled = !bodyInput.disabled ;
  searchInput.disabled = !searchInput.disabled;
}

function storeIdea(event) {
  event.preventDefault();
  var currentIdea = new Idea({title: titleInput.value, body: bodyInput.value});
  ideasArray.push(currentIdea);
  currentIdea.saveToStorage();
  createCard(currentIdea);
  clearInputs();
  checkEmptyInputs();
}

function clearInputs() {
  bodyInput.value = '';
  titleInput.value = '';
  searchInput.value = '';
}

function removeCard(ideaId) {
  var filteredIdeasArray = [];
  for(var i = 0; i < ideasArray.length; i++) {
    if(ideasArray[i].id != parseInt(ideaId)) {
      filteredIdeasArray.push(ideasArray[i]);
    }
  }
  ideasArray = filteredIdeasArray;
}

function targetCard(event) {
  var ideaId = event.target.closest('.single-card').dataset.id
  var targetIdea = findIdea(ideaId);
  if (event.target.classList.contains('idea-close')) {
    removeCard(ideaId);
  } else if (event.target.classList.contains('idea-star')){
    targetIdea.toggleStar(targetIdea);
  }
  displayCards(ideasArray);
  targetIdea.saveToStorage();
}

function findIdea(ideaId) {
  for(var i = 0; i < ideasArray.length; i++) {
    if(ideasArray[i].id === parseInt(ideaId)) {
      return ideasArray[i];
    }
  }
}

function showStarredIdeas() {
  var starredIdeasArray = [];
  for (var i = 0; i < ideasArray.length; i++) {
    if(ideasArray[i].isStarred === true) {
      starredIdeasArray.push(ideasArray[i]);
    }
  }
  if (showStarredButton.innerText === 'Show Starred Ideas') {
    displayCards(starredIdeasArray)
    showStarredButton.innerText = 'Show All Ideas';
  } else {
    showStarredButton.innerText = 'Show Starred Ideas';
    displayCards(ideasArray);
  }
}

function searchIdeas() {
  ideaCardsSection.innerText = '';
  var searchedIdeasArray = [];
  for (var i = 0; i < ideasArray.length; i++) {
    if (ideasArray[i].title.includes(searchInput.value) || ideasArray[i].body.includes(searchInput.value)) {
      searchedIdeasArray.push(ideasArray[i]);
    }
  }
  searchInput.value ? displayCards(searchedIdeasArray) : displayCards(ideasArray);
}
