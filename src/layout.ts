// given a block, the walls should be 	latitude = [bx,by][bx+1,by]
// 																		longitude = [bx,by][bx, by+1]

// given a 5x5 grid, lat walls should be 5 r and 6 c
// 									 long walls should be 6 r and 5 c		

// joins
// 0,0 -> 1,0 (1,0 wall); 1,6 -> 2,6 (2,6 wall)
// 0,0 -> 0,1 (0,1 wall)
// one number is the same. first number==long change, second number==lat change
// the wall is always the larger of the two coordinates

// find out wall numbers
// 0,0 -> lat 0,1 (not lat 0,0); long 1,0 (not long 0,0)
// 1,0 -> lat 1,0 and 2,0; long 1,1 (not 1,0)
// 2,1 -> lat 2,1 and 3,1; long 2,1 and 2,2

type Walls = {
	rows: number,
	columns: number,
	latitude: boolean[][],
	longitude: boolean[][]
}
type Block = {
	row: number,
	column: number
};
type Wall = [number, number, string];

function createWalls(rows: number, columns: number): Walls {
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

	makeEntrance(walls);

	return walls;
};

function makeEntrance(w: Walls): void {
	w.longitude[0][0] = false;
	// w.longitude[4][5] = false;
}
function createMaze(w: Walls): Walls {
	let stack: Block[] = [];
	stack.push(randomCell(w.rows, w.columns))

	while (stack.length > 0) {
		let current: Block = stack[stack.length -1];
		let nextCell: Block|null = getNextCell(current, w);

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

	return w;
};

function getNextCell(cell: Block, walls: Walls): Block|null {
	let neighbors: Block[] = [];

	if (cell.row > 0)
		neighbors.push({ row: cell.row-1, column: cell.column })
	if (cell.row+1 < walls.rows)
		neighbors.push({ row: cell.row+1, column: cell.column })
	if (cell.column > 0)
		neighbors.push({ row: cell.row, column: cell.column-1 })
	if (cell.column+1 < walls.columns)
		neighbors.push({ row: cell.row, column: cell.column+1 })

	let availableCells = neighbors.filter(n => getLinks(n, walls) === 0);

	if (availableCells.length === 0) return null;

	return availableCells[Math.floor(Math.random()*availableCells.length)]
}

function getLinks(cell:Block, walls: Walls): number {
	let links = 0;

	if (!walls.latitude[cell.row][cell.column]) links++;
	if (!walls.latitude[cell.row][cell.column+1]) links++;

	if (!walls.longitude[cell.row][cell.column]) links++;
	if (!walls.longitude[cell.row+1][cell.column]) links++;

	return links;
}

function randomCell(rows: number, columns: number): Block {
	return {
		row: Math.floor(Math.random()*rows), 
		column: Math.floor(Math.random()*columns)
	}
};

function findWall(b1: Block, b2: Block): Wall {
	let removal: Wall = [0, 0, 'unknown'];

	if (b1.row === b2.row) {
		removal[2] = 'latitude';
		removal[0] = b1.row;
		removal[1] = b1.column > b2.column ? b1.column : b2.column;
	} else if (b1.column === b2.column) {
		removal[2] = 'longitude';
		removal[0] = b1.row > b2.row ? b1.row : b2.row;
		removal[1] = b1.column;
	} else {
		throw new Error('unknown wall type');
	}

	return removal; 
};


export { Walls, createWalls, createMaze }