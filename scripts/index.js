const userLocation = document.getElementById('user-location')
const progress = document.querySelector('div.progress')
const api = 'http://ip-api.com/json/'

fetch(api, { method: 'GET' })
  .then(response => response.json())
  .then(response => {
    if (response.status === 'success') {
      userLocation.innerText = `${response.city}, ${response.country}`
    }
  })
  .catch(err => console.error(err))

let secs = 0
const cords = [
  { def: { x: 0, y: 0 }, real: { x: null, y: null } },
  { def: { x: 100, y: 0 }, real: { x: null, y: null } },
  { def: { x: 100, y: 100 }, real: { x: null, y: null } },
  { def: { x: 0, y: 100 }, real: { x: null, y: null } }
]
progress.style.transition = '1s linear'
setInterval(() => {
  secs = secs + 1 > 59 ? 0 : secs + 1

  const more = secs % 15
  const div = Math.floor(secs / 15)
  const next = div + 1 === cords.length ? 0 : div + 1
  const cord = cords[div] ?? cords[0]
  const nCord = cords[next] ?? cords[1]

  const changer = { x: null, y: null }

  if (secs < 1) {
    cords.forEach(item => { item.real.x = item.real.y = null })
  }

  if (more < 1) {
    changer.x = cord.real.x = cord.def.x
    changer.y = cord.real.y = cord.def.y
  } else {
    const percent = Math.floor(more * 100 / 15)

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
}, 1000)
