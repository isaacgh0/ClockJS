const time = document.getElementById('time')
const playTimer = document.getElementById('play-timer')
const resetTimer = document.getElementById('reset-timer')
const progress = document.querySelector('div.progress')
const dialog = document.getElementsByTagName('dialog')[0]
const cancelDialog = document.getElementById('cancel-dialog')
const submitDialog = document.getElementById('submit-dialog')
const errorMessage = document.getElementsByClassName('error-message')[0]
const inputs = [...dialog.getElementsByTagName('input')]
const regexNumber = /^[0-9:]+$/
const regexSpecial = /^[-e:]+$/
const date = new Date()
const cords = [
  { def: { x: 0, y: 0 }, real: { x: 0, y: 0 } },
  { def: { x: 0, y: 100 }, real: { x: 0, y: 100 } },
  { def: { x: 100, y: 100 }, real: { x: 100, y: 100 } },
  { def: { x: 100, y: 0 }, real: { x: 100, y: 0 } }
]

let totalMiliseconds = 0
let progressMiliseconds = 0
let interval
let minutes = 0
let seconds = 0

const getLocaleTime = numbers => `${numbers.map(num => `0${num}`.slice(-2))}`.replace(',', ':')

const reset = () => {
  clearInterval(interval)
  interval = undefined

  date.setHours(0)
  date.setMinutes(minutes)
  date.setSeconds(seconds)
  date.setMilliseconds(0)

  progressMiliseconds = totalMiliseconds

  playTimer.firstElementChild.src = 'assets/icons/player-play-filled.svg'
  playTimer.lastElementChild.innerHTML = 'Play'

  time.value = getLocaleTime([date.getMinutes(), date.getSeconds()])
  cords.forEach(item => {
    item.real.x = item.def.x
    item.real.y = item.def.y
  })
  progress.style.clipPath = 'polygon(0 0, 50% 50%, 0 0, 0 100%, 100% 100%, 100% 0)'
  progress.style.transition = 'unset'
}

const pause = () => {
  clearInterval(interval)
  interval = undefined
}

const updateSeconds = () => {
  const quarter = totalMiliseconds / 4
  const more = (totalMiliseconds - progressMiliseconds) % quarter
  const div = Math.floor((totalMiliseconds - progressMiliseconds) / quarter)
  const next = div + 1 === cords.length ? 0 : div + 1
  const cord = cords[div] ?? cords[0]
  const nCord = cords[next] ?? cords[1]
  const percent = Math.floor(more * 100 / quarter)
  const changer = { x: null, y: null }

  changer.x = cord.def.x
  changer.y = cord.def.y

  if (more < 1) {
    cord.real.x = null
    cord.real.y = null
  } else {
    if (nCord.def.x !== cord.def.x) {
      changer.x += nCord.def.x > cord.def.x ? percent : -percent
    }

    if (nCord.def.y !== cord.def.y) {
      changer.y += nCord.def.y > cord.def.y ? percent : -percent
    }
  }

  console.log(quarter, more, div, next, cord, nCord, percent, changer)
  console.log(progressMiliseconds)

  const clip = `polygon(0 0, 50% 50%, ${changer.x}% ${changer.y}%, ${
    cords[1].real.x ?? changer.x}% ${cords[1].real.y ?? changer.y}%, ${
    cords[2].real.x ?? changer.x}% ${cords[2].real.y ?? changer.y}%, ${
    cords[3].real.x ?? changer.x}% ${cords[3].real.y ?? changer.y}%)`

  progress.style.clipPath = clip
}

const init = () => {
  progress.style.transition = 'clip-path 250ms linear'

  interval = setInterval(() => {
    date.setTime(date.getTime() - 250)
    time.value = getLocaleTime([date.getMinutes(), date.getSeconds()])

    progressMiliseconds -= 250
    updateSeconds()

    if (date.getMinutes() < 1 && date.getSeconds() < 1 && date.getMilliseconds() < 1) {
      clearInterval(interval)
      interval = undefined

      playTimer.firstElementChild.src = 'assets/icons/player-play-filled.svg'
      playTimer.lastElementChild.innerHTML = 'Play'
    }
  }, 250)
}

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
  [minutes, seconds] = inputs.map(input => Number(input.value))

  if ((seconds < 1 || seconds > 59) && (minutes < 1 || minutes > 59)) {
    errorMessage.classList.add('visible')
    minutes = 0
    seconds = 0
    return
  }

  inputs.forEach(input => {
    input.value = ''
  })

  errorMessage.classList.remove('visible')

  date.setMinutes(minutes)
  date.setSeconds(seconds)

  time.value = getLocaleTime([minutes, seconds])

  totalMiliseconds = minutes * 60000 + (seconds) * 1000
  progressMiliseconds = totalMiliseconds

  dialog.classList.remove('visible')
  dialog.close()
})

playTimer.addEventListener('click', e => {
  if (date.getMinutes() > 0 || date.getSeconds() > 0) {
    e.currentTarget.firstElementChild.src = `assets/icons/player-${interval ? 'play' : 'pause'}-filled.svg`
    e.currentTarget.lastElementChild.innerHTML = interval ? 'Play' : 'Pause'
    interval ? pause() : init()
  }
})

resetTimer.addEventListener('click', reset)

;(reset)()
