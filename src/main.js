var mobileMenuIcon = document.querySelector('.mobile-menu');
var menuHeader = document.querySelector('.menu-header');
var menuSideBar = document.querySelector('.side-bar')
var ideas = document.querySelector('.ideas');

mobileMenuIcon.addEventListener('click', openMenuHeader);

function openMenuHeader () {

   if (menuSideBar.className === 'menu side-bar') {
     mobileMenuIcon.src = 'assets/menu-close.svg';
   } else {
      mobileMenuIcon.src = 'assets/menu.svg'
   }
    menuSideBar.classList.toggle('expanded');
    ideas.classList.toggle('darkness');
}
