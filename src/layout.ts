type Walls = {
	rows: number,
	columns: number,
	latitude: boolean[][], // rows, columns+1
	longitude: boolean[][] // rows+1, columns
}
type Cell = {
	row: number,
	column: number
};
type Wall = [number, number, string];

function createMaze(rows: number, columns: number): Walls {
	let walls: Walls = {
		rows: rows,
		columns: columns,
		latitude: [],
		longitude: []
	};

	for (let r=0; r<walls.rows; r++) {
		walls.latitude[r] = [];
		for (let c=0; c<=walls.columns; c++) {
			walls.latitude[r][c] = true;
		}
	}

	for (let r=0; r<=walls.rows; r++) {
		walls.longitude[r] = [];
		for (let c=0; c<walls.columns; c++) {
			walls.longitude[r][c] = true;
		}
	}

	return recursiveBacktracker(walls);
};

function recursiveBacktracker(w: Walls): Walls {
	let stack: Cell[] = [];
	stack.push(randomCell(w.rows, w.columns))

	while (stack.length > 0) {
		let current: Cell = stack[stack.length -1];
		let nextCell: Cell|null = moveToNextCell(current, w);

		if (nextCell === null) {
			stack.pop();
		} else {
			let [r,c,type] = findWall(current, nextCell);
			if (type === 'latitude') {
				w.latitude[r][c] = false;
			} else if (type === 'longitude') {
				w.longitude[r][c] = false;
			}

			stack.push(nextCell);
		}
	}

	// entrance and exit
	w.longitude[0][0] = false;
	w.longitude[w.rows][w.columns-1] = false;

	return w;
};

function moveToNextCell(cell: Cell, walls: Walls): Cell|null {
	let neighbors: Cell[] = [];

	if (cell.row > 0) // north neighbor
		neighbors.push({ row: cell.row-1, column: cell.column })
	if (cell.row+1 < walls.rows) // south neighbor
		neighbors.push({ row: cell.row+1, column: cell.column })
	if (cell.column > 0) // west neighbor
		neighbors.push({ row: cell.row, column: cell.column-1 })
	if (cell.column+1 < walls.columns) // east neighbor
		neighbors.push({ row: cell.row, column: cell.column+1 })

	// find cells that are all surrounded by walls, or not linked
	let availableCells = neighbors.filter(n => getCellLinks(n, walls) === 0);

	if (availableCells.length === 0) return null;
	return availableCells[Math.floor(Math.random()*availableCells.length)]
}

function getCellLinks(cell:Cell, walls: Walls): number {
	let links = 0;

	if (!walls.latitude[cell.row][cell.column]) links++;
	if (!walls.latitude[cell.row][cell.column+1]) links++;

	if (!walls.longitude[cell.row][cell.column]) links++;
	if (!walls.longitude[cell.row+1][cell.column]) links++;

	return links;
}

function randomCell(rows: number, columns: number): Cell {
	return {
		row: Math.floor(Math.random()*rows), 
		column: Math.floor(Math.random()*columns)
	}
};

function findWall(b1: Cell, b2: Cell): Wall {
	let singleWall: Wall = [0, 0, 'unknown'];

	if (b1.row === b2.row) {
		singleWall[2] = 'latitude';
		singleWall[0] = b1.row;
		singleWall[1] = b1.column > b2.column ? b1.column : b2.column;
	} else if (b1.column === b2.column) {
		singleWall[2] = 'longitude';
		singleWall[0] = b1.row > b2.row ? b1.row : b2.row;
		singleWall[1] = b1.column;
	} else {
		throw new Error('unknown wall type');
	}

	return singleWall; 
};


export { Walls, createMaze, recursiveBacktracker }