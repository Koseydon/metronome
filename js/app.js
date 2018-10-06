const metronome = {
  bpm: 60,
  volume: 100,
  clickAudio: new Audio('sounds/beat.wav'),
  timer: null,
  isPlaying: false,
  initialize: function() {
    if (localStorage.simpleMetronomeTempo) {
      this.bpm = parseInt(localStorage.simpleMetronomeTempo)
    }
    view.updateAllBpmRelated()
    
    if (localStorage.simpleMetronomeVolume) { 
      this.volume = parseInt(localStorage.simpleMetronomeVolume)
      this.clickAudio.volume = this.volume / 100
      view.volumeRange.value = localStorage.simpleMetronomeVolume
    } else {
      this.clickAudio.volume = this.volume / 100
      view.volumeRange.value = this.volume
    }
  },
  start: function() {
    let t1 = performance.now()
    this.clickAudio.play()
    this.isPlaying = true

    let interval = 60000 / this.bpm

    this.timer = setTimeout(() => {
      console.log(performance.now() - t1)
      this.start()
    }, interval)
  },
  stop: function() {
    clearInterval(this.timer)
    this.timer = null
    this.isPlaying = false
  }  
}

const view = {
  startStopButton: document.getElementById('startStop'),
  startStopButtonIcon: document.getElementById('startStopIcon'),
  bpmRange: document.getElementById('bpmRange'),
  bpmDiv: document.getElementById('bpmDiv'),
  minusFive: document.getElementById('minusFive'),
  minusOne: document.getElementById('minusOne'),
  plusOne: document.getElementById('plusOne'),
  plusFive: document.getElementById('plusFive'),
  volumeRange: document.getElementById('volumeRange'),
  volumeIcon: document.getElementById('volumeIcon'),  
  tempoName: document.getElementById('tempoName'),

  setUpEventListeners: function() {    
    this.startStopButton.addEventListener('click', handlers.toggleStart)
    this.bpmRange.addEventListener('input', handlers.changeTempo.bind(this.bpmRange))
    this.minusFive.addEventListener('click', handlers.decreaseTempoFive)
    this.minusOne.addEventListener('click', handlers.decreaseTempo)
    this.plusOne.addEventListener('click', handlers.increaseTempo)
    this.plusFive.addEventListener('click', handlers.increaseTempoFive)
    this.volumeRange.addEventListener('input', handlers.changeVolume.bind(this.volumeRange))
  },

  updateStartStopButton: function() {
    this.startStopButtonIcon.classList.toggle('fa-play')
    this.startStopButtonIcon.classList.toggle('fa-stop')
  },

  updateBpmDiv: function() {
    this.bpmDiv.innerText = metronome.bpm
  },

  updateTempoName: function() {
    this.tempoName.innerText = tempoMarkings.name(metronome.bpm)
  },

  updateBpmRange: function() {
    this.bpmRange.value = metronome.bpm
  },

  updateAllBpmRelated: function() {
    this.updateBpmDiv()
    this.updateTempoName()
    this.updateBpmRange()
  }
}

const handlers = {
  toggleStart: function() {
    if (metronome.isPlaying) {
      metronome.stop()
    } else {
      metronome.start()
    }
    view.updateStartStopButton()
  },
  
  changeTempo: function() {
    metronome.bpm = parseInt(this.value)
    localStorage.simpleMetronomeTempo = metronome.bpm
    view.updateBpmDiv()
    view.updateTempoName()
  },

  increaseTempo: function() {
    if (metronome.bpm < 300) metronome.bpm++
    localStorage.simpleMetronomeTempo = metronome.bpm
    view.updateAllBpmRelated()
  },

  decreaseTempo: function() {
    if (metronome.bpm > 20) metronome.bpm--
    localStorage.simpleMetronomeTempo = metronome.bpm
    view.updateAllBpmRelated()
  },

  increaseTempoFive: function() {
    if (metronome.bpm < 296) {
      metronome.bpm += 5
    } else if (metronome.bpm > 295) {
      metronome.bpm = 300
    }
    localStorage.simpleMetronomeTempo = metronome.bpm
    view.updateAllBpmRelated()
  },

  decreaseTempoFive: function() {
    if (metronome.bpm > 24) {
      metronome.bpm -= 5
    } else if (metronome.bpm < 25) {
      metronome.bpm = 20
    }
    localStorage.simpleMetronomeTempo = metronome.bpm
    view.updateAllBpmRelated()
  },

  changeVolume: function() {
    metronome.clickAudio.volume = this.value / 100
    localStorage.simpleMetronomeVolume = this.value
    
    if (this.value > 50) {
      view.volumeIcon.classList.remove('fa-volume-down')
      view.volumeIcon.classList.remove('fa-volume-off')
      view.volumeIcon.classList.add('fa-volume-up')        
    }
    if (this.value < 51 && this.value > 0) {
      view.volumeIcon.classList.remove('fa-volume-up')
      view.volumeIcon.classList.remove('fa-volume-off')
      view.volumeIcon.classList.add('fa-volume-down')        
    }
    if (this.value == 0) {
      view.volumeIcon.classList.remove('fa-volume-up')
      view.volumeIcon.classList.remove('fa-volume-down')
      view.volumeIcon.classList.add('fa-volume-off')        
    }
  }
}

metronome.initialize()
view.setUpEventListeners()