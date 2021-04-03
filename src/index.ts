const { Walls, createMaze, WallOptions } = require('./layout');

const generateNewMaze = (): void => {
  let height = document.getElementsByName("height")[0],
      width = document.getElementsByName("width")[0],
      canvas = document.getElementsByTagName("canvas")[0];

  let myMaze = createMaze(parseInt(height.value),parseInt(width.value))
  printWalls(myMaze, canvas);
}

const printMaze = (): void => {
    let win=window.open(),
        canvas = document.getElementById("mazeDrawing");

    win.document.write("<br><img src='"+canvas.toDataURL()+"'/>");
    win.print();
}

const initialize = (): void => {
  let maze = document.getElementById('maze');

  let regenerateSubmit = document.getElementById("regenerateSubmit"),
      printMazeSubmit = document.getElementById("printMaze"),
      regenerate = document.getElementById("regenerate"),
      canvas = document.getElementById("mazeDrawing");


  regenerateSubmit.addEventListener("click", generateNewMaze);
  printMazeSubmit.addEventListener("click", printMaze);
  regenerate.addEventListener("submit", (e) => e.preventDefault(), true);
  canvas.height = canvas.parentElement.clientWidth * .95;
  canvas.width = canvas.parentElement.clientWidth * .95;

  if (maze) {
    let myMaze = createMaze(40, 40);
    printWalls(myMaze, canvas);
  }
}

const printWalls = (w: typeof Walls, canvas: HTMLCanvasElement): void => {
  let ctx = canvas.getContext('2d'),
      latUnit = canvas.height / w.rows,
      longUnit = canvas.width / w.columns;

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';

    for (let r=0;r<w.rows;r++) {
      for (let c=0;c<=w.columns;c++) {
        if (w.latitude[r][c] === WallOptions.Closed) {
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
        if (w.longitude[r][c] === WallOptions.Closed) {
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