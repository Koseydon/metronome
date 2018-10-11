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
  },

  updateVolumeIcon: function() {
    if (this.volumeRange.value > 50) {
      view.volumeIcon.className = 'fas fa-volume-up'
    } else if (this.volumeRange.value < 51 && this.volumeRange.value > 0) {
      view.volumeIcon.className = 'fas fa-volume-down'
    } else if (this.volumeRange.value == 0) {
      view.volumeIcon.className = 'fas fa-volume-off'
    }
  }
}