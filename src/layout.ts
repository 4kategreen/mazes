/**
 *  _ _ _
 * |_|_|_| cell(0,0) = walls(lat(0,0), lat(0,1), long(0,0), long(1,0))
 * |_|_|_| cell(2,0) = walls(lat(2,0), lat(3,0), long(0,0), long(1,0))
 * |_|_|_| cell(0,2) = walls(lat(0,0), lat(0,1), long(2,0), long(3,0))
 * 
 * Lat walls always keeps the cell x value and the y value is cell(y) and then cell(y+1)
 * 	cell(x,y) = lat(x,y), lat(x,y+1)
 * Long walls always keeps the cell y value and the x value is cell(x) and then cell(x+1)
 * 	cell(x,y) = long(x,y), long(x+1,y)
 **/

type Walls = {
	rows: number,
	columns: number,
	latitude: WallOptions[][], // rows, columns+1
	longitude: WallOptions[][] // rows+1, columns
}
type Cell = {
	row: number,
	column: number
};
type Wall = [number, number, string];
const enum WallOptions {
	Locked,
	Closed,
	Open
};

const createMaze = (rows: number, columns: number): Walls => {
	let walls: Walls = {
		rows: rows,
		columns: columns,
		latitude: [],
		longitude: []
	};

	for (let r=0; r<=walls.rows; r++) {
		walls.latitude[r] = [];
		for (let c=0; c<walls.columns; c++) {
			walls.latitude[r][c] = (r === 0 || r === walls.rows) ?
				WallOptions.Locked :
				WallOptions.Closed;
		}
	}

	for (let r=0; r<walls.rows; r++) {
		walls.longitude[r] = [];
		for (let c=0; c<=walls.columns; c++) {
			walls.longitude[r][c] = (c === 0 || c === walls.columns) ? 
				WallOptions.Locked : 
				WallOptions.Closed;
		}
	}

	return recursiveBacktracker(walls);
};

const recursiveBacktracker = (w: Walls): Walls => {
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
				w.longitude[r][c] = WallOptions.Open;
			} else if (type === 'longitude') {
				w.latitude[r][c] = WallOptions.Open;
			}

			stack.push(nextCell);
		}
	}

	// entrance and exit
	w.latitude[0][0] = WallOptions.Open;
	w.latitude[w.rows][w.columns-1] = WallOptions.Open;

	return w;
};

const moveToNextCell = (cell: Cell, walls: Walls): Cell|null => {
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

const getCellLinks = (cell:Cell, walls: Walls): number => {
	let links = 0;

	if (walls.latitude[cell.row][cell.column] === WallOptions.Open) links++;
	if (walls.latitude[cell.row+1][cell.column] === WallOptions.Open) links++;

	if (walls.longitude[cell.row][cell.column] === WallOptions.Open) links++;
	if (walls.longitude[cell.row][cell.column+1] === WallOptions.Open) links++;

	return links;
}

const randomCell = (rows: number, columns: number): Cell => {
	return {
		row: Math.floor(Math.random()*rows), 
		column: Math.floor(Math.random()*columns)
	}
};

const findWall = (b1: Cell, b2: Cell): Wall => {
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


export { Walls, createMaze, WallOptions }