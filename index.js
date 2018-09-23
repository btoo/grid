class Grid {
  constructor() {
    (document.head || document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0])
      .appendChild(this.styleElement = document.createElement('style'))
    
    this.grid = [
      [1, 2],
      [1, 2],
    ];
    // this.styleElement.appendChild(document.createTextNode(`
    //   main {
    //     // background: green;
    //   }
    // `))

    this.render();
  }

  getString() {
    return this.grid
      .reduce((accY, y) => `${accY}\n"${y.reduce((accX, x) => `${accX} pane-${x}`, '')}"`, '')
  }

  render() {
    this.styleElement.textContent = `.grid { grid-template: ${
      this.getString()
    }}`;
  }
}

const grid = new Grid();