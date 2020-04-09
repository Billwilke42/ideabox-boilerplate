var mobileMenuIcon = document.querySelector('.mobile-menu');
var menuHeader = document.querySelector('.menu-header');
var menuSideBar = document.querySelector('.side-bar')
var ideas = document.querySelector('.ideas');
var saveButton = document.querySelector('.save-button');
var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var ideasArray = [];


mobileMenuIcon.addEventListener('click', openMenuHeader);
saveButton.addEventListener('click', storeIdea);

function openMenuHeader () {
  if (menuSideBar.className === 'menu side-bar') {
     mobileMenuIcon.src = 'assets/menu-close.svg';
   } else {
      mobileMenuIcon.src = 'assets/menu.svg'
   }
    menuSideBar.classList.toggle('expanded');
    ideas.classList.toggle('darkness');
}

function storeIdea(event) {
  event.preventDefault();
  ideasArray.push(new Idea({title: titleInput.value, body: bodyInput.value}))
}
