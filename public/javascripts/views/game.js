namespace('Frogger.Views')

Frogger.Views.Game = function(config) {
  this.model = config.model
  this.el    = config.el

  this.initialize = function() {
    this.render()
  }

  this.template = function(cells) {
    var html = ''

    for (var i = 0; i < this.model.total; i++) {
      html += '<div class="' + cells[i] + '"></div>'
    }
    return html
  }

  this.render = function() {
    if (this.model.over) {
      location.reload()
    } else {
      if (this.model.win) alert('YOU WIN!')
      this.el.innerHTML = this.template(this.model.toJSON())
    }
  }

  this.initialize()
}
