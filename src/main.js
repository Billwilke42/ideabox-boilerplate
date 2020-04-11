var mobileMenuIcon = document.querySelector('.mobile-menu');
var menuHeader = document.querySelector('.menu-header');
var menuSideBar = document.querySelector('.side-bar')
var ideas = document.querySelector('.ideas');
var saveButton = document.querySelector('.save-button');
var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var cardTitle = document.querySelector('.card-title');
var cardBody = document.querySelector('.card-body');
var ideaCardsSection = document.querySelector('.idea-cards');
var upperRightForm = document.querySelector('.upper-right-form');

var ideasArray = [];

window.onload = checkEmptyInputs();


mobileMenuIcon.addEventListener('click', openMenuHeader);
saveButton.addEventListener('click', storeIdea);
upperRightForm.addEventListener('keyup', checkEmptyInputs);

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
  ideaCardsSection.insertAdjacentHTML('beforeend', `<section class="single-card">
    <div class="card-header">
      <img src="assets/star-active.svg" class="idea-star" alt="white-star">
      <img src="assets/menu-close.svg" class="idea-close" alt="X button">
    </div>
    <h4 class="card-title">${titleInput.value}</h4>
    <p class="card-body">${bodyInput.value}</p>
    <div class="card-footer">
      <img src="assets/comment.svg" class="idea-comment" alt="plus-symbol">Comment
    </div>
  </section>`);

}
function clearInputs() {
  bodyInput.value = '';
  titleInput.value = '';
}

function storeIdea(event) {
  event.preventDefault();
  ideasArray.push(new Idea({title: titleInput.value, body: bodyInput.value}))
  displayCards();
  clearInputs();
  checkEmptyInputs();
}

function checkEmptyInputs(e) {
  console.log(e);
  if(titleInput.value !== '' && bodyInput.value !== '') {
    saveButton.disabled = false;
    saveButton.classList.remove('darkness-disabled');
  } else {
    saveButton.disabled = true;
    saveButton.classList.add('darkness-disabled');
  }
}
