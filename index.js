const areaOfTriangle = ([x1,y1], [x2,y2], [x3,y3]) => Math.abs(x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2)) / 2
    , pointIsInsideTriangle = xy => ([side, [x1y1, x2y2, x3y3]]) => {
        const A = areaOfTriangle(x1y1, x2y2, x3y3)
            , A1 = areaOfTriangle(xy, x2y2, x3y3)
            , A2 = areaOfTriangle(x1y1, xy, x3y3)
            , A3 = areaOfTriangle(x1y1, x2y2, xy)
      
        return A === (A1 + A2 + A3)
      }
    , divideRectangleIntoTriangles = ({ width, height }) => {
        const halfWidth = width / 2
            , halfHeight = height / 2

        return [
          ['top', [[0,0], [halfWidth,halfHeight], [width,0]]],
          ['right', [[width,0], [halfWidth,halfHeight], [width,height]]],
          ['bottom', [[width,height], [halfWidth,halfHeight], [0,height]]],
          ['left', [[0,height], [halfWidth,halfHeight], [0,0]]],
        ]
      }

class Grid {
  constructor() {
    (document.head || document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0])
      .appendChild(this.styleElement = document.createElement('style'))
    
    this.grid = [[0]]

    this.render()
  }

  getString() {
    return this.grid
      .reduce((accY, y) => `${accY}\n"${y.reduce((accX, x) => `${accX} pane-${x}`, '')}"`, '')
  }

  render() {
    this.styleElement.textContent = `.grid { grid-template: ${this.getString()}}`
  }

  dragEnter(event) {
    this.triangles = divideRectangleIntoTriangles(event.target.getBoundingClientRect())
  }

  dragOver(event) {
    event.target.classList.remove('left', 'top', 'right', 'bottom')
    const [side] = this.triangles.find(pointIsInsideTriangle([event.offsetX, event.offsetY]))
    event.target.classList.add(side)
  }

  dragLeave(event) {
    event.target.classList.remove('left', 'top', 'right', 'bottom')
  }
}

const grid = new Grid();