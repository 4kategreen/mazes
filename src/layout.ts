import { Walls, Wall, CellLocation, CellWalls } from './types';

const createMaze = (rows: number, columns: number): Walls => {

	let Walls: Walls = {
		numRows: rows,
		numColumns: columns,
		latitude: [],
		longitude: []
	}

	for (let r=0; r<=Walls.numRows; r++) {
		Walls.latitude[r] = [];

		for (let c=0; c<Walls.numColumns; c++) {
			Walls.latitude[r][c] = {
				isLocked: (r === 0 || r === Walls.numRows),
				isOpen: false
			}
		}
	}

	for (let r=0; r<Walls.numRows; r++) {
		Walls.longitude[r] = [];

		for (let c=0; c<=Walls.numColumns; c++) {
			Walls.longitude[r][c] = {
				isLocked: (c === 0 || c === Walls.numColumns),
				isOpen: false
			}
		}
	}

	return recursiveBacktracker(Walls);
};

const recursiveBacktracker = (w: Walls): Walls => {
	let stack: CellLocation[] = [];
	stack.push(randomCell(w.numRows, w.numColumns))

	while (stack.length > 0) {
		let current: CellLocation = stack[stack.length -1];
		let nextCell: CellLocation|null = moveToNextCell(current, w);

		if (nextCell === null) {
			stack.pop();
		} else {
			let {row,column,orientation} = findWall(current, nextCell);
			if (orientation === 'latitude') {
				w.longitude[row][column].isOpen = true;
			} else if (orientation === 'longitude') {
				w.latitude[row][column].isOpen = true;
			}

			stack.push(nextCell);
		}

	}

	// entrance and exit
	w.latitude[0][0].isOpen = true;
	w.latitude[w.numRows][w.numColumns-1].isOpen = true;

	return w;
};

const moveToNextCell = (cell: CellLocation, walls: Walls): CellLocation|null => {
	let neighbors: CellLocation[] = [];

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

const getCellWalls = (cell:CellLocation): CellWalls => {
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

const getCellLinks = (cell:CellLocation, walls: Walls): number => {
	let links = 0,
			cellWalls = getCellWalls(cell);

	if (walls.latitude[cellWalls.top.row][cellWalls.top.column].isOpen) links++;
	if (walls.longitude[cellWalls.right.row][cellWalls.right.column].isOpen) links++;
	if (walls.latitude[cellWalls.bottom.row][cellWalls.bottom.column].isOpen) links++;
	if (walls.longitude[cellWalls.left.row][cellWalls.left.column].isOpen) links++;

	return links;
}

const randomCell = (rows: number, columns: number): CellLocation => {
	return {
		row: Math.floor(Math.random()*rows), 
		column: Math.floor(Math.random()*columns)
	}
};

const findWall = (b1: CellLocation, b2: CellLocation): Wall => {
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


export { createMaze }