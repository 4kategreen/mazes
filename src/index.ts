const { Grid, recursiveBacktracker } = require('./layout');

let grid = new Grid(10,10);
recursiveBacktracker(grid);
grid.print();
