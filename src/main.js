var mobileMenu = document.querySelector('.mobile-menu');
var menuHeader = document.querySelector('.menu-header');

mobileMenu.addEventListener('click', openMenuHeader);

function openMenuHeader () {
    mobileMenu.src = 'assets/menu-close.svg';
}
