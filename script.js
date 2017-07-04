const currentTime = document.querySelector('.time')
const startButton = document.getElementById('start')
const stopButton = document.getElementById('pause')
const resetButton = document.getElementById('reset')
let countdown
let isPaused = false
let lastEnteredTime
let secondsLeft

// Timer function taken from Wes Bos' JavaScript 30 Series
function timer (seconds) {
  clearInterval(countdown)
  const now = Date.now()
  const then = now + seconds * 1000
  displayTimeLeft(seconds)
  countdown = setInterval(() => {
    if (!isPaused) {
      secondsLeft = Math.round((then - Date.now()) / 1000)
      if (secondsLeft < 0) {
        clearInterval(countdown)
        return
      }
      displayTimeLeft(secondsLeft)
    }
  }, 1000)
}

function displayTimeLeft (seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  const visualTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  currentTime.textContent = visualTime
  document.title = visualTime
}

function startTimer () {
  // If the timer is stopped and played again, send through the seconds left global variable
  if (isPaused) {
    isPaused = false
    timer(secondsLeft)
  } else {
    isPaused = false
    lastEnteredTime = currentTime.textContent
    const minutes = currentTime.textContent.split(':')[0]
    const seconds = minutes * 60
    timer(seconds)
  }
  this.disabled = true
  stopButton.disabled = false
  resetButton.disabled = false
}

function resetTimer () {
  currentTime.textContent = lastEnteredTime
  clearInterval(countdown)
  startButton.disabled = false
  stopButton.disabled = true
  this.disabled = true
  isPaused = false
}

function stopTimer () {
  isPaused = true
  this.disabled = true
  startButton.disabled = false
}

stopButton.disabled = true
resetButton.disabled = true

// Start, stop, reset event listeners
startButton.addEventListener('click', startTimer)
stopButton.addEventListener('click', stopTimer)
resetButton.addEventListener('click', resetTimer)
