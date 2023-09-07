const playStopwatch = document.getElementById('play-stopwatch')
const resetStopwatch = document.getElementById('reset-stopwatch')
const time = document.getElementById('time')
const date = new Date()
let interval

const getLocaleTime = numbers => `${numbers.map(num => `0${num}`.slice(-2))}`.replace(',', ':')

const init = () => {
  interval = setInterval(() => {
    date.setTime(date.getTime() + 1000)
    time.value = getLocaleTime([date.getMinutes(), date.getSeconds()])
  }, 1000)
}

const pause = () => {
  clearInterval(interval)
  interval = undefined
}

const reset = () => {
  clearInterval(interval)
  interval = undefined

  date.setHours(0, 0, 0, 0)
  date.setMinutes(0, 0, 0, 0)
  date.setMilliseconds(0, 0, 0, 0)

  playStopwatch.firstElementChild.src = 'assets/icons/player-play-filled.svg'
  playStopwatch.lastElementChild.innerHTML = 'Play'

  time.value = getLocaleTime([date.getMinutes(), date.getSeconds()])
}

playStopwatch.addEventListener('click', e => {
  e.currentTarget.firstElementChild.src = `assets/icons/player-${interval ? 'play' : 'pause'}-filled.svg`
  e.currentTarget.lastElementChild.innerHTML = interval ? 'Play' : 'Pause'
  interval ? pause() : init()
})

resetStopwatch.addEventListener('click', reset)

;(reset)()
