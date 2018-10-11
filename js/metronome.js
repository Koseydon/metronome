const metronome = {
  bpm: 60,
  clickAudio: new Audio('audio/beat.wav'),
  timer: null,
  isPlaying: false,
  initialize: function() {
    if (localStorage.simpleMetronomeTempo) {
      this.bpm = parseInt(localStorage.simpleMetronomeTempo)
    }
    view.updateAllBpmRelated()
    
    if (localStorage.simpleMetronomeVolume) { 
      this.clickAudio.volume = parseInt(localStorage.simpleMetronomeVolume) / 100
      view.volumeRange.value = localStorage.simpleMetronomeVolume
    } else {
      this.clickAudio.volume = 1
      view.volumeRange.value = 100
    }
    view.updateVolumeIcon()
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