const buttonNavbarMenu = document.getElementById('navbar-menu')
const navbar = document.getElementsByTagName('nav')[0]

buttonNavbarMenu.addEventListener('click', () => {
  buttonNavbarMenu.classList.toggle('open')
  navbar.className = buttonNavbarMenu.className
})
