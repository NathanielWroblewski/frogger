!function() {
  var counter = 1,
      lanes   = [
        new Frogger.Models.Lane({ empty: 'grass' }),
        new Frogger.Models.Lane({
          type:     'red-car',
          empty:    'road',
          direction: -1,
          counter:   0
        }),
        new Frogger.Models.Lane({
          type:     'yellow-car',
          empty:    'road',
          direction: 1,
          counter:   1
        }),
        new Frogger.Models.Lane({
          type:     'red-car',
          empty:    'road',
          direction: -1,
          counter:   2
        }),
        new Frogger.Models.Lane({
          type:     'yellow-car',
          empty:    'road',
          direction: 1,
          counter:   2
        }),
        new Frogger.Models.Lane({
          type:     'red-car',
          empty:    'road',
          direction: -1,
          counter:   1
        }),
        new Frogger.Models.Lane({ empty: 'grass' }),
        new Frogger.Models.Lane({
          type:  'water',
          empty: 'turtle',
          direction: 1,
          counter: 0
        }),
        new Frogger.Models.Lane({
          type:  'water',
          empty: 'log',
          direction: -1,
          counter: 2
        }),
        new Frogger.Models.Lane({
          type:  'water',
          empty: 'log',
          direction: 1,
          counter: 1
        }),
        new Frogger.Models.Lane({
          type:  'water',
          empty: 'turtle',
          direction: 1,
          counter: 2
        }),
        new Frogger.Models.Lane({
          type:  'water',
          empty: 'log',
          direction: -1,
          counter: 0
        }),
        new Frogger.Models.Lane({
          lane: [
            'grass',
            'lily-pad',
            'grass',
            'lily-pad',
            'grass',
            'lily-pad',
            'grass',
            'lily-pad',
            'grass'
          ]
        })
      ],
      board = new Frogger.Models.Board({ lanes: lanes.reverse() }),
      game  = new Frogger.Views.Game({
        model: board,
        el:    document.querySelector('.game')
      })

  setInterval(function() {
    if (!board.win && !board.over) {
      board.tick(counter)
      game.render()
      counter++
    } else {
      document.onkeyup = function() {}
    }
  }, 400)

  document.onkeyup = function(e) {
    var code = e.which || e.keyCode;

    switch (code) {
      case 37: board.hop('left')
      break;
      case 38: board.hop('up')
      break;
      case 39: board.hop('right')
      break;
      case 40: board.hop('down')
      break;
    }

    if (code >= 37 && code <= 40) {
      e.preventDefault()
      game.render()
    }
  }
}()
