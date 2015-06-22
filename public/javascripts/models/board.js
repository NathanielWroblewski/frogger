namespace('Frogger.Models')

Frogger.Models.Board = function(config) {
  this.height = 13
  this.width  = 9
  this.total  = this.height * this.width
  this.lanes  = config.lanes
  this.frog   = this.total - Math.floor(9 / 2) - 1
  this.win    = false
  this.over   = false

  this.SLOW_LANES = [
    this.lanes[2],
    this.lanes[5],
    this.lanes[8],
    this.lanes[10]
  ]
  this.FAST_LANES = [
    this.lanes[1],
    this.lanes[3],
    this.lanes[4],
    this.lanes[7],
    this.lanes[9],
    this.lanes[11]
  ]

  this.initialize = function() {
    this.generateBoard()
  }

  this.generateBoard = function() {
    this.cells = []

    for (var i = 0; i < this.lanes.length; i++) {
      this.cells = this.cells.concat(this.lanes[i].toJSON())
    }

    this.moveFrog(this.frog, this.frog)
  }

  this.tick = function(integer) {
    if (integer % 2 === 0) {
      this.moveCars(this.SLOW_LANES.concat(this.FAST_LANES))
    } else {
      this.moveCars(this.FAST_LANES)
    }

    this.generateBoard()
  }

  this.moveCars = function(lanes) {
    for (var i = 0; i < lanes.length; i++) {
      lanes[i].move()
    }
  }

  this.hop = function(direction) {
    var next = 0

    switch (direction) {
      case 'up':    next = this.frog - this.width
      break;
      case 'down':  next = this.frog + this.width
      break;
      case 'left':  next = this.frog - 1
      break;
      case 'right': next = this.frog + 1
      break;
    }

    this.moveFrog(this.frog, next)
  }

  this.moveFrog = function(from, to) {
    if (this.validMove(from, to)) {
      this.cells[from] = this.cells[from].replace(' frog', '')

      if (/car|water/.test(this.cells[to])) {
        this.over = true
      } else {
        if (/lily-pad/.test(this.cells[to])) this.win = true
        this.frog = to
        this.cells[this.frog] += ' frog'
      }
    }
  }

  this.validMove = function(from, to) {
    return (
      to >= 0 &&
      to < this.total &&
      !(from % this.width === 0 && to % this.width === this.width - 1) &&
      !(from % this.width === this.width - 1 && to % this.width === 0)
    )
  }

  this.toJSON = function() {
    return this.cells
  }

  this.initialize()
}
