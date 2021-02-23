const { Grid, recursiveBacktracker } = require('./layout');

const generateMaze = (height: number, width: number): string => {
  let grid = new Grid(height, width);
  recursiveBacktracker(grid);

  return grid.print()
};

const generateNewMaze = (): void => {
  let height = document.getElementsByName("height")[0],
      width = document.getElementsByName("width")[0],
      pre = document.getElementsByTagName("pre")[0];

  pre.innerText = generateMaze(parseInt(height.value), parseInt(width.value));
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

  let pre = document.createElement("pre"),
      button = document.createElement("button"),
      form = document.createElement("form");

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
    maze.appendChild(pre);

    pre.innerText = generateMaze(20, 20);
  }
}

initialize()