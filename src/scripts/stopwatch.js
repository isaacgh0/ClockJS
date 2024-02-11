const playStopwatch = document.getElementById('play-stopwatch')
const resetStopwatch = document.getElementById('reset-stopwatch')
const progress = document.querySelector('div.progress')
const time = document.getElementById('time')
const mili = document.getElementById('mili')
const date = new Date()

let interval

const getLocaleTime = numbers => `${numbers.map(num => `0${num}`.slice(-2))}`.replace(',', ':')

const updateMiliseconds = mili => {
  if (mili > 500) {
    const px = 10 - Math.floor((mili - 500) / 50)
    progress.style.boxShadow = `0 0 ${px}px #00CECB`
  } else {
    const px = Math.floor(mili / 50)
    progress.style.boxShadow = `0 0 ${px}px #00CECB`
  }
}

const init = () => {
  interval = setInterval(() => {
    date.setTime(date.getTime() + 22)
    time.value = getLocaleTime([date.getMinutes(), date.getSeconds()])
    mili.innerText = `00${date.getMilliseconds()}`.slice(-3)
    updateMiliseconds(date.getMilliseconds())
  }, 22)
}

const pause = () => {
  clearInterval(interval)
  interval = undefined
}

const reset = () => {
  clearInterval(interval)
  interval = undefined

  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)

  playStopwatch.firstElementChild.src = '/src/assets/icons/player-play-filled.svg'
  playStopwatch.lastElementChild.innerHTML = 'Play'

  time.value = getLocaleTime([date.getMinutes(), date.getSeconds()])
  mili.innerText = '000'
  progress.style.boxShadow = '0 0 0 #00CECB'
}

playStopwatch.addEventListener('click', e => {
  e.currentTarget.firstElementChild.src = `/src/assets/icons/player-${interval ? 'play' : 'pause'}-filled.svg`
  e.currentTarget.lastElementChild.innerHTML = interval ? 'Play' : 'Pause'
  interval ? pause() : init()
})

resetStopwatch.addEventListener('click', reset)

;(reset)()
