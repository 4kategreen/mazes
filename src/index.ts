const { Walls, createMaze } = require('./layout');

const generateNewMaze = (): void => {
  let height = document.getElementsByName("height")[0],
      width = document.getElementsByName("width")[0],
      canvas = document.getElementsByTagName("canvas")[0];

  let myMaze = createMaze(parseInt(height.value),parseInt(width.value))
  printWalls(myMaze, canvas);
}

const initialize = (): void => {
  let maze = document.getElementById('maze');

  let button = document.getElementById("regenerateSubmit"),
      form = document.getElementById("regenerate"),
      canvas = document.getElementById("mazeDrawing");

  canvas.height = canvas.parentElement.clientWidth * .9;
  canvas.width = canvas.parentElement.clientWidth * .9;

  form.addEventListener("submit", (e) => e.preventDefault(), true);
  button.addEventListener("click", generateNewMaze);

  if (maze) {
    let myMaze = createMaze(50,50)
    printWalls(myMaze, canvas);
  }
}

function printWalls(w: typeof Walls, canvas: HTMLCanvasElement): void {
  let ctx = canvas.getContext('2d'),
      latUnit = canvas.height / w.rows,
      longUnit = canvas.width / w.columns;

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';

    for (let r=0;r<w.rows;r++) {
      for (let c=0;c<=w.columns;c++) {
        if (w.latitude[r][c]) {
          let stationary = c*longUnit,
              start = r*latUnit,
              end = (r+1)*latUnit;

          ctx.beginPath();
          ctx.moveTo(stationary, start);
          ctx.lineTo(stationary, end);
          ctx.stroke()
        }
      }
    }

    for (let r=0;r<=w.rows;r++) {
      for (let c=0;c<w.columns;c++) {
        if (w.longitude[r][c]) {
          let stationary = r*latUnit,
              start = c*longUnit,
              end = (c+1)*longUnit;

          ctx.beginPath();
          ctx.moveTo(start, stationary);
          ctx.lineTo(end, stationary);
          ctx.stroke()
        }
      }
    }
  }
};

initialize()