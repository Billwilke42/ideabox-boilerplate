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
var ideasArray = [];

window.onload = checkEmptyInputs();

mobileMenuIcon.addEventListener('click', openMenuHeader);
saveButton.addEventListener('click', storeIdea);
upperRightForm.addEventListener('keyup', checkEmptyInputs);
ideaCardsSection.addEventListener('click', targetCard);

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
  ideaCardsSection.innerHTML = ''
  for (var i = 0; i < ideasArray.length; i++) {
    createCard(ideasArray[i]);
 }
}

function createCard(idea) {
  ideaCardsSection.insertAdjacentHTML('beforeend', `<section class="single-card" data-id="${idea.id}">
    <div class="card-header">
      <img src="assets/star-active.svg" class="idea-star" alt="white-star">
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
  ideasArray.push(new Idea({title: titleInput.value, body: bodyInput.value}))
  displayCards();
  clearInputs();
  checkEmptyInputs();
}

function checkEmptyInputs() {
  if(titleInput.value !== '' && bodyInput.value !== '') {
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
  displayCards();
}

function targetCard(event) {
  var ideaId = event.target.closest('.single-card').dataset.id
  console.log(ideaId)
  if (event.target.classList.contains('idea-close')) {
    console.log(event.target.classList.contains('idea-close'))
    removeCard(ideaId);
  }
}
