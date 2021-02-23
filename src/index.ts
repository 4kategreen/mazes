const { Grid, recursiveBacktracker } = require('./layout');

const generateMaze = (height: number, width: number): string => {
  let grid = new Grid(height, width);
  recursiveBacktracker(grid);

  return grid.print()
};

const generateNewMaze = (): void => {
  // todo: make sure these are numbers 
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
    label.appendChild(input);

    return label;
  }

const initialize = (): void => {
  let maze = document.getElementById('maze');

  let pre = document.createElement("pre"),
      button = document.createElement("button");

  button.innerText = "Generate New Maze!";
  button.addEventListener("click", generateNewMaze);

  let height = createInput("height", "Height"),
      width = createInput("width", "Width");

  if (maze) {
    maze.appendChild(height);
    maze.appendChild(width);
    maze.appendChild(button);
    maze.appendChild(pre);

    pre.innerText = generateMaze(20, 20);
  }
}

initialize()