const { Grid, recursiveBacktracker } = require('./layout');

let grid = new Grid(20,20);
recursiveBacktracker(grid);
let maze = document.getElementById('maze');
if (maze) {
  maze.innerText = grid.print()
} else {
  document.body.innerText = 'No maze to display';
}

