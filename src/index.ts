import { createMaze } from './layout';
import { Walls, WallOptions } from './types';

const toggleMazeSize = (clicked): void => {
  let size = clicked.target;

  let removeActive = size.parentElement.parentElement.getElementsByClassName('is-active');
  removeActive[0].removeAttribute('class', 'is-active');
  size.parentElement.setAttribute('class', 'is-active');

  switch (size.innerText) {
    case 'Hard':
      document.getElementsByName("height")[0].value = 80;
      document.getElementsByName("width")[0].value = 100;
      break;
    case 'Medium':
      document.getElementsByName("height")[0].value = 40;
      document.getElementsByName("width")[0].value = 50;
      break;
    case 'Easy': // set in instantiation
    default:
      document.getElementsByName("height")[0].value = 20;
      document.getElementsByName("width")[0].value = 25;
      break;
  }

  generateNewMaze()
}

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

    win.document.write("<h2>mazemonster.com</h2><p>Free printable mazes. Generate as many mazes as you want.</p>")
    win.document.write("<br><img src='"+canvas.toDataURL()+"'/>");
    win.print();
}

const initialize = (): void => {
  let maze = document.getElementById('maze');

  let regenerateSubmit = document.getElementById("regenerateSubmit"),
      printMazeSubmit = document.getElementById("printMaze"),
      regenerate = document.getElementById("regenerate"),
      canvas = document.getElementById("mazeDrawing"),
      difficulty = document.getElementById("difficultyToggle");

  regenerateSubmit.addEventListener("click", generateNewMaze);
  printMazeSubmit.addEventListener("click", printMaze);
  printMazeSubmit.addEventListener("click", gtag_report_conversion);
  difficulty.addEventListener("click", toggleMazeSize)
  regenerate.addEventListener("submit", (e) => e.preventDefault(), true);
  canvas.height = canvas.parentElement.clientWidth * .95;
  canvas.width = canvas.parentElement.clientWidth * .95;

  if (maze) {
    let myMaze = createMaze(40, 40);
    printWalls(myMaze, canvas);
  }
}

const printWalls = (w: Walls, canvas: HTMLCanvasElement): void => {
  let ctx = canvas.getContext('2d'),
      latUnit = canvas.height / w.numRows,
      longUnit = canvas.width / w.numColumns;

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';

    for (let r=0;r<w.numRows;r++) {
      for (let c=0;c<=w.numColumns;c++) {
        if (w.longitude[r][c] !== WallOptions.Open) {
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

    for (let r=0;r<=w.numRows;r++) {
      for (let c=0;c<w.numColumns;c++) {
        if (w.latitude[r][c] !== WallOptions.Open) {
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