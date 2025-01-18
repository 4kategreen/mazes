/**
 *  _ _ _
 * |a|_|b| a = cell(0,0) = walls(top:(0,0,lat), right:(1,0,long), bottom:(0,1,lat), left:(0,0,long))
 * |_|_|_| b = cell(2,0) = walls(top:(2,0,lat), right:(3,0,long), bottom:(0,1,lat), left:(2,0,long))
 * |c|_|_| c = cell(0,2) = walls(top:(0,2,lat), right:(1,2,long), bottom:(0,3,lat), left:(0,2,long))
 * 
 * Top and Left walls are always the same as the cell.
 * Bottom walls are always y+1 more than the y value of the cell
 * Right walls are always x+1 more than the x value of the cell
 **/

 /**
  * Create Maze Function Path
  * createMaze()
  * 	recursiveBacktracker()
  * 		randomCell()
  * 		moveToNextCell()
  * 			getCellLinks()
  * 		findWall()
  **/

type Walls = {
	numRows: number,
	numColumns: number,
	latitude: WallOptions[][], // rows, columns+1
	longitude: WallOptions[][] // rows+1, columns
}

type Cell = {
	row: number,
	column: number
};

type Wall = {
	row: number, 
	column: number, 
	orientation: string
};

type CellWalls = {
	top: Wall,
	right: Wall,
	bottom: Wall,
	left: Wall
}

const enum WallOptions {
	Locked,
	Closed,
	Open
};

const createMaze = (rows: number, columns: number): Walls => {
	let walls: Walls = {
		numRows: rows,
		numColumns: columns,
		latitude: [],
		longitude: []
	};

	for (let r=0; r<=walls.numRows; r++) {
		walls.latitude[r] = [];
		for (let c=0; c<walls.numColumns; c++) {
			walls.latitude[r][c] = (r === 0 || r === walls.numRows) ?
				WallOptions.Locked :
				WallOptions.Closed;
		}
	}

	for (let r=0; r<walls.numRows; r++) {
		walls.longitude[r] = [];
		for (let c=0; c<=walls.numColumns; c++) {
			walls.longitude[r][c] = (c === 0 || c === walls.numColumns) ? 
				WallOptions.Locked : 
				WallOptions.Closed;
		}
	}

	return recursiveBacktracker(walls);
};

const recursiveBacktracker = (w: Walls): Walls => {
	let stack: Cell[] = [];
	stack.push(randomCell(w.numRows, w.numColumns))

	while (stack.length > 0) {
		let current: Cell = stack[stack.length -1];
		let nextCell: Cell|null = moveToNextCell(current, w);

		if (nextCell === null) {
			stack.pop();
		} else {
			let {row,column,orientation} = findWall(current, nextCell);
			if (orientation === 'latitude') {
				w.longitude[row][column] = WallOptions.Open;
			} else if (orientation === 'longitude') {
				w.latitude[row][column] = WallOptions.Open;
			}

			stack.push(nextCell);
		}

	}

	// entrance and exit
	w.latitude[0][0] = WallOptions.Open;
	w.latitude[w.numRows][w.numColumns-1] = WallOptions.Open;

	console.log(w)
	return w;
};

const moveToNextCell = (cell: Cell, walls: Walls): Cell|null => {
	let neighbors: Cell[] = [];

	if (cell.row > 0) // top neighbor
		neighbors.push({ row: cell.row-1, column: cell.column })
	if (cell.column+1 < walls.numColumns) // right neighbor
		neighbors.push({ row: cell.row, column: cell.column+1 })
	if (cell.row+1 < walls.numRows) // bottom neighbor
		neighbors.push({ row: cell.row+1, column: cell.column })
	if (cell.column > 0) // left neighbor
		neighbors.push({ row: cell.row, column: cell.column-1 })

	// find cells that are all surrounded by walls, or not linked
	let availableCells = neighbors.filter(n => getCellLinks(n, walls) === 0);

	if (availableCells.length === 0) return null;
	return availableCells[Math.floor(Math.random()*availableCells.length)]
}

const getCellWalls = (cell:Cell): CellWalls => {
	return {
		top: {
			row: cell.row, 
			column: cell.column,
			orientation: 'latitude'
		},
		right: {
			row: cell.row, 
			column: cell.column+1, 
			orientation: 'longitude'
		},
		bottom: {
			row: cell.row+1, 
			column: cell.column,
			orientation: 'latitude'
		},
		left: {
			row: cell.row,
			column: cell.column,
			orientation: 'longitude'
		}
	}
}

const getCellLinks = (cell:Cell, walls: Walls): number => {
	let links = 0,
			cellWalls = getCellWalls(cell);

	if (walls.latitude[cellWalls.top.row][cellWalls.top.column] === WallOptions.Open) links++;
	if (walls.longitude[cellWalls.right.row][cellWalls.right.column] === WallOptions.Open) links++;
	if (walls.latitude[cellWalls.bottom.row][cellWalls.bottom.column] === WallOptions.Open) links++;
	if (walls.longitude[cellWalls.left.row][cellWalls.left.column] === WallOptions.Open) links++;

	return links;
}

const randomCell = (rows: number, columns: number): Cell => {
	return {
		row: Math.floor(Math.random()*rows), 
		column: Math.floor(Math.random()*columns)
	}
};

const findWall = (b1: Cell, b2: Cell): Wall => {
	let singleWall: Wall = {
		row: 0, 
		column: 0,
		orientation: 'unknown'
	};

	if (b1.row === b2.row) {
		singleWall.orientation = 'latitude';
		singleWall.row = b1.row;
		singleWall.column = b1.column > b2.column ? b1.column : b2.column;
	} else if (b1.column === b2.column) {
		singleWall.orientation = 'longitude';
		singleWall.row = b1.row > b2.row ? b1.row : b2.row;
		singleWall.column = b1.column;
	} else {
		throw new Error('unknown wall type');
	}

	return singleWall; 
};


export { Walls, createMaze, WallOptions }