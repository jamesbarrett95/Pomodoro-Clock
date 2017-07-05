const timeContainer = document.querySelector('.timer')
const optionsContainer = document.querySelector('.options')
const currentTime = document.querySelector('.time')
const startButton = document.getElementById('start')
const stopButton = document.getElementById('pause')
const resetButton = document.getElementById('reset')
const toggleSession = document.querySelectorAll('.toggleSession')
const toggleBreak = document.querySelectorAll('.toggleBreak')

let breakLengthCounter = document.querySelectorAll('.break--length span')[1]
let sessionLengthCounter = document.querySelectorAll('.session--length span')[1]
let countdown // Countdown interval
let isPaused = false // Countdown state
let lastEnteredTime
let secondsLeft
let onBreak = false

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
        if (!onBreak) {
          onBreak = true
          clearInterval(countdown)
          timer(breakLengthCounter.textContent * 60)
          return
        }
        clearInterval(countdown)
        resetButton.click()
        onBreak = false
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
  timeContainer.classList.add('counting')
  optionsContainer.classList.add('hide')
}

function resetTimer () {
  currentTime.textContent = lastEnteredTime
  clearInterval(countdown)
  startButton.disabled = false
  stopButton.disabled = true
  this.disabled = true
  isPaused = false
  timeContainer.classList.remove('counting')
  optionsContainer.classList.remove('hide')
  document.title = 'Pomodoro Clock'
}

function stopTimer () {
  isPaused = true
  this.disabled = true
  startButton.disabled = false
}

function toggleSessionLengths () {
  if (this.textContent === '+') {
    sessionLengthCounter.textContent++
    currentTime.textContent = sessionLengthCounter.textContent + `:00`
  } else {
    if (sessionLengthCounter.textContent > 1) {
      sessionLengthCounter.textContent--
      currentTime.textContent = sessionLengthCounter.textContent + `:00`
    }
  }
}

function toggleBreakLengths () {
  if (this.textContent === '+') {
    breakLengthCounter.textContent++
  } else {
    if (breakLengthCounter.textContent > 1) {
      breakLengthCounter.textContent--
    }
  }
}

stopButton.disabled = true
resetButton.disabled = true

// Start, stop, reset event listeners
startButton.addEventListener('click', startTimer)
stopButton.addEventListener('click', stopTimer)
resetButton.addEventListener('click', resetTimer)
toggleSession.forEach(button => button.addEventListener('click', toggleSessionLengths))
toggleBreak.forEach(button => button.addEventListener('click', toggleBreakLengths))
