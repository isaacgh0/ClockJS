const userLocation = document.getElementById('user-location')
const progress = document.querySelector('div.progress')
const middaySwitch = document.getElementById('midday-switch')
const midday = document.getElementById('midday')
const time = document.getElementById('time')
const date = new Date()
const api = 'http://ip-api.com/json/'
const cords = [
  { def: { x: 0, y: 0 }, real: { x: null, y: null } },
  { def: { x: 100, y: 0 }, real: { x: null, y: null } },
  { def: { x: 100, y: 100 }, real: { x: null, y: null } },
  { def: { x: 0, y: 100 }, real: { x: null, y: null } }
]
const now = {
  hrs: date.getHours(),
  min: date.getMinutes(),
  sec: date.getSeconds()
}

let middayFormat = false

const updateTime = () => {
  now.hrs = date.getHours()
  now.min = date.getMinutes()
  now.sec = date.getSeconds()

  if (middayFormat) {
    midday.innerText = `${now.hrs > 11 ? 'pm' : 'am'}`

    if (now.hrs > 12) {
      now.hrs -= 12
    }
  }

  time.value = `${`0${now.hrs}`.slice(-2)}:${`0${now.min}`.slice(-2)}`
}

const updateSeconds = sec => {
  const more = sec % 15
  const div = Math.floor(sec / 15)
  const next = div + 1 === cords.length ? 0 : div + 1
  const cord = cords[div] ?? cords[0]
  const nCord = cords[next] ?? cords[1]
  const percent = Math.floor(more * 100 / 15)
  const changer = { x: null, y: null }

  if (sec < 1) {
    cords.forEach(item => { item.real.x = item.real.y = null })
  }

  if (more < 1) {
    changer.x = cord.real.x = cord.def.x
    changer.y = cord.real.y = cord.def.y
  } else {
    changer.x = cord.def.x
    changer.y = cord.def.y

    if (nCord.def.x !== cord.def.x) {
      changer.x += nCord.def.x > cord.def.x ? percent : -percent
    }

    if (nCord.def.y !== cord.def.y) {
      changer.y += nCord.def.y > cord.def.y ? percent : -percent
    }
  }

  const clip = `polygon(0 0, 50% 50%, ${changer.x}% ${changer.y}%, ${
    cords[3].real.x ?? changer.x}% ${cords[3].real.y ?? changer.y}%, ${
    cords[2].real.x ?? changer.x}% ${cords[2].real.y ?? changer.y}%, ${
    cords[1].real.x ?? changer.x}% ${cords[1].real.y ?? changer.y}%)`

  progress.style.clipPath = clip
}

middaySwitch.addEventListener('click', e => {
  middayFormat = !middayFormat
  e.currentTarget.className = `${middayFormat ? 'on' : ''}`
  midday.className = `${middayFormat ? 'visible' : ''}`

  updateTime()
})

fetch(api, { method: 'GET' })
  .then(response => response.json())
  .then(response => {
    if (response.status === 'success') {
      userLocation.innerText = `${response.city}, ${response.country}`
    }
  })
  .catch(err => console.error(err))

const already = Math.floor(now.sec / 15)

if (already > 0) {
  for (let i = 0; i <= already; i++) {
    cords[i].real.x = cords[i].def.x
    cords[i].real.y = cords[i].def.y
  }
}

time.value = `${`0${now.hrs}`.slice(-2)}:${`0${now.min}`.slice(-2)}`

progress.style.transition = '1s linear'
setInterval(() => {
  updateTime()
  updateSeconds(now.sec)

  date.setTime(date.getTime() + 1000)
}, 1000)
