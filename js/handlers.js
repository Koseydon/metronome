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
    view.updateVolumeIcon()    
  }
}