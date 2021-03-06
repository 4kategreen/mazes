const { Walls, createWalls, createMaze } = require('./layout');

const generateMaze = (height: number, width: number): void => {
  let myMaze = createWalls(height, width);
  return createMaze(myMaze);
};

const generateNewMaze = (): void => {
  let height = document.getElementsByName("height")[0],
      width = document.getElementsByName("width")[0],
      canvas = document.getElementsByTagName("canvas")[0];

  let myMaze = generateMaze(parseInt(height.value),parseInt(width.value))
  printWalls(myMaze, canvas);
}

const createInput = (elementName: string, userText: string): HTMLLabelElement => {
    let label = document.createElement("label"),
        input = document.createElement('input');
    
    label.innerText = userText;
    input.setAttribute("name", elementName);
    input.setAttribute("type", "number");
    input.setAttribute("placeholder", "20");
    input.required = true;
    input.min="1";
    label.appendChild(input);

    return label;
  }

const initialize = (): void => {
  let maze = document.getElementById('maze');

  let canvas = document.createElement("canvas"),
      button = document.createElement("button"),
      form = document.createElement("form");

  canvas.height = 500;
  canvas.width = 500;

  form.addEventListener("submit", (e) => e.preventDefault(), true);

  button.innerText = "Generate New Maze!";
  button.addEventListener("click", generateNewMaze);

  let height = createInput("height", "Height"),
      width = createInput("width", "Width");

  if (maze) {
    form.appendChild(height);
    form.appendChild(width);
    form.appendChild(button);
    maze.appendChild(form);
    maze.appendChild(canvas);

    let myMaze = generateMaze(10,10)
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