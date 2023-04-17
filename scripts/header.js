button_navbar_menu = document.querySelector('button#navbar_menu')
navbar = document.querySelector('nav')

button_navbar_menu.addEventListener('click', () => {
  button_navbar_menu.className = navbar.className = button_navbar_menu.className === 'close'
  ? 'open'
  : 'close'
})