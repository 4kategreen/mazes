import { createMaze } from './layout';
import { Walls, WallOptions } from './types';

const initialize = (): void => {
  let body = document.getElementById('body') as HTMLDivElement;

  let regenerateSubmit = document.getElementById("regenerateSubmit") as HTMLButtonElement,
      printMazeSubmit = document.getElementById("printMaze") as HTMLButtonElement,
      regenerate = document.getElementById("regenerate") as HTMLFormElement,
      canvas = document.getElementById("mazeDrawing") as HTMLCanvasElement,
      canvasParent = canvas.parentElement as HTMLDivElement,
      difficulty = document.getElementById("difficultyToggle") as HTMLDivElement;

  // set event listeners
  regenerateSubmit.addEventListener("click", generateNewMaze);
  printMazeSubmit.addEventListener("click", printMaze);
  // @ts-ignore
  printMazeSubmit.addEventListener("click", gtag_report_conversion); 
  difficulty.addEventListener("click", toggleMazeSize)
  regenerate.addEventListener("submit", (e) => e.preventDefault(), true);

  // set canvas to screen size
  canvas.height = canvasParent.clientWidth;
  canvas.width = canvasParent.clientWidth;

  if (body) {
    let myMaze = createMaze(40, 40);
    printWalls(myMaze, canvas);
  }
}

const generateNewMaze = (): void => {
  let height = document.getElementsByName("height")[0] as HTMLInputElement,
      width = document.getElementsByName("width")[0] as HTMLInputElement,
      canvas = document.getElementsByTagName("canvas")[0] as HTMLCanvasElement;

  let myMaze = createMaze(parseInt(height.value),parseInt(width.value))

  printWalls(myMaze, canvas);
}

const printMaze = (): void => {
    let win=window.open() as Window,
        canvas = document.getElementById("mazeDrawing") as HTMLCanvasElement;

    win.document.write("<h2>mazemonster.com</h2><p>Free printable mazes. Generate as many mazes as you want.</p>")
    win.document.write("<br><img src='"+canvas.toDataURL()+"'/>");
    win.print();
}

const printWalls = (w: Walls, canvas: HTMLCanvasElement): void => {
  let ctx = canvas.getContext('2d'),
      latUnit = canvas.height / w.numRows,
      longUnit = canvas.width / w.numColumns;

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';

    for (let r=0; r<w.numRows; r++) {
      for (let c=0; c<=w.numColumns; c++) {
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

const toggleMazeSize = (clicked: Event): void => {
  let size = clicked.target as HTMLUListElement,
      sizeParent = size.parentElement as HTMLUListElement,
      allSizes = sizeParent.parentElement as HTMLDivElement,
      height = document.getElementsByName("height")[0] as HTMLInputElement,
      width = document.getElementsByName("width")[0] as HTMLInputElement,
      removeActive = allSizes.getElementsByClassName('is-active')[0];

  removeActive.removeAttribute('class');
  sizeParent.setAttribute('class', 'is-active');

  switch (size.innerText) {
    case 'Hard':
      height.value = "80";
      width.value = "100";
      break;
    case 'Medium':
      height.value = "40";
      width.value = "50";
      break;
    case 'Easy': 
    default:
      height.value = "20";
      width.value = "25";
      break;
  }

  generateNewMaze()
}

initialize()