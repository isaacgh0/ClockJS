const buttonNavbarMenu = document.getElementById('navbar-menu')
const navbar = document.getElementsByTagName('nav')[0]
const selected = document.querySelector('nav ul li a.selected')

buttonNavbarMenu.addEventListener('click', () => {
  buttonNavbarMenu.classList.toggle('open')
  navbar.className = buttonNavbarMenu.className
})

selected.addEventListener('click', e => { e.preventDefault() })
