namespace('Frogger.Models')

Frogger.Models.Lane = function(config) {
  this.type      = config.type
  this.direction = config.direction || 1
  this.counter   = config.counter   || 0
  this.empty     = config.empty     || 'empty'
  this.lane      = config.lane      || []

  this.initialize = function() {
    if (this.lane.length === 0) this.move()
  }

  this.move = function() {
    this.lane = []

    for (var i = 0; i < 9; i++) {
      if (this.type && (i + (this.direction * this.counter)) % 3 === 0) {
        this.lane.push(this.type)
      } else {
        this.lane.push(this.empty)
      }
    }
    this.counter++
  }

  this.toJSON = function() {
    return this.lane
  }

  this.initialize()
}
