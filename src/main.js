var mobileMenuIcon = document.querySelector('.mobile-menu');
var menuHeader = document.querySelector('.menu-header');
var menuSideBar = document.querySelector('.side-bar')
var ideas = document.querySelector('.ideas');
var saveButton = document.querySelector('.save-button');
var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var searchInput = document.querySelector('.search-input')
var cardTitle = document.querySelector('.card-title');
var cardBody = document.querySelector('.card-body');
var ideaCardsSection = document.querySelector('.idea-cards');
var upperRightForm = document.querySelector('.upper-right-form');
var cardHeader = document.querySelector('.card-header');
var showStarredButton = document.querySelector('.starred-ideas-button')
var ideasArray = JSON.parse(localStorage.getItem('ideasArray')) || [];
var showingAllCards = true;

window.onload = onLoadHandler();

mobileMenuIcon.addEventListener('click', openMenuHeader);
saveButton.addEventListener('click', storeIdea);
upperRightForm.addEventListener('keyup', checkEmptyInputs);
ideaCardsSection.addEventListener('click', targetCard);
showStarredButton.addEventListener('click', showStarredIdeas)

function onLoadHandler() {
  checkEmptyInputs();
  displayCards();
  reinstantiateCards();
}

function openMenuHeader () {
  menuSideBar.classList.toggle('expanded');
  if (menuSideBar.classList.contains('expanded')) {
     mobileMenuIcon.src = 'assets/menu-close.svg';
   } else {
      mobileMenuIcon.src = 'assets/menu.svg'
   }
    ideas.classList.toggle('darkness');
}

function displayCards() {
  ideaCardsSection.innerHTML = '';
  for (var i = 0; i < ideasArray.length; i++) {
    createCard(ideasArray[i]);
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

function clearInputs() {
  bodyInput.value = '';
  titleInput.value = '';
  searchInput.value = '';
}

function storeIdea(event) {
  event.preventDefault();
  var currentIdea = new Idea({title: titleInput.value, body: bodyInput.value})
  ideasArray.push(currentIdea)
  currentIdea.saveToStorage();
  displayCards();
  clearInputs();
  checkEmptyInputs();
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

function removeCard(ideaId) {
  // ideasArray = ideasArray.filter(idea => idea.id != parseInt(ideaId));
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
  displayCards();
  targetIdea.saveToStorage();
}

function findIdea(ideaId) {
   // return ideasArray.find(function (idea) {idea.id === parseInt(ideaId))
  for(var i = 0; i < ideasArray.length; i++) {
    if(ideasArray[i].id === parseInt(ideaId)) {
    return ideasArray[i];
    }
  }
}

function reinstantiateCards() {
  var oldIdeasArray = ideasArray;
  ideasArray = [];
  for(var i = 0; i < oldIdeasArray.length; i++) {
  var currentIdea = new Idea({title: oldIdeasArray[i].title, body: oldIdeasArray[i].body, id: oldIdeasArray[i].id, isStarred: oldIdeasArray[i].isStarred})
  ideasArray.push(currentIdea);
  }
}

function showStarredIdeas() {
  showingAllCards = !showingAllCards;
  ideaCardsSection.innerHTML = '';
  var starredIdeasArray = [];
  for (var i = 0; i < ideasArray.length; i++) {
    if(ideasArray[i].isStarred === true) {
      starredIdeasArray.push(ideasArray[i]);
    }
  }
  if (!showingAllCards) {
    for (var i = 0; i < starredIdeasArray.length; i++) {
      createCard(starredIdeasArray[i]);
      showStarredButton.innerText = 'Show All Ideas'
    }
  } else {
    showStarredButton.innerText = 'Show Starred Ideas'
    displayCards();
  }

}
