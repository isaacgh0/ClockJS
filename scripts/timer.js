const time = document.getElementById('time')
const dialog = document.getElementsByTagName('dialog')[0]
const cancelDialog = document.getElementById('cancel-dialog')
const submitDialog = document.getElementById('submit-dialog')
const errorMessage = document.getElementsByClassName('error-message')[0]
const inputs = [...dialog.getElementsByTagName('input')]
const regexNumber = /^[0-9:]+$/
const regexSpecial = /^[-e:]+$/
const date = new Date()

inputs.forEach(input => {
  input.addEventListener('keydown', e => {
    if (regexSpecial.test(e.key)) {
      e.preventDefault()
    }

    if (e.currentTarget.value.length > 1 && (regexNumber.test(e.key) || regexSpecial.test(e.key))) {
      e.preventDefault()
    }
  })
})

time.addEventListener('click', () => {
  dialog.classList.add('visible')
  dialog.showModal()
})

dialog.firstElementChild.addEventListener('submit', e => {
  e.preventDefault()
})

cancelDialog.addEventListener('click', () => {
  dialog.classList.remove('visible')
  dialog.close()
})

submitDialog.addEventListener('click', () => {
  const [minutes, seconds] = inputs.map(input => Number(input.value))

  if ((seconds < 1 || seconds > 59) && (minutes < 1 || minutes > 59)) {
    errorMessage.classList.add('visible')
    return
  }

  inputs.forEach(input => {
    input.value = ''
  })

  errorMessage.classList.remove('visible')

  date.setMinutes(minutes)
  date.setSeconds(seconds)

  time.value = `${`0${minutes}`.slice(-2)}:${`0${seconds}`.slice(-2)}`

  dialog.classList.remove('visible')
  dialog.close()
})

date.setHours(0)
date.setMinutes(0)
date.setSeconds(0)
date.setMilliseconds(0)
