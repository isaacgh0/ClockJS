const time = document.getElementById('time')
const dialog = document.getElementsByTagName('dialog')[0]

time.addEventListener('click', () => {
  dialog.showModal()
})

dialog.firstElementChild.addEventListener('submit', e => {
  e.preventDefault()
})
