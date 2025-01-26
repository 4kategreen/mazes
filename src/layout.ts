import { Walls, Wall, CellLocation, CellProperties } from './types';

const createMaze = (rows: number, columns: number): Walls => {

	let walls: Walls = {
		numRows: rows,
		numColumns: columns,
		numLatitudes: 0,
		numLongitudes: 0,
		latitude: [],
		longitude: []
	}

	for (let r=0; r<=walls.numRows; r++) {
		walls.latitude[r] = [];

		for (let c=0; c<walls.numColumns; c++) {
			walls.latitude[r][c] = {
				isLocked: (r === 0 || r === walls.numRows),
				isOpen: false
			}
		}
	}

	for (let r=0; r<walls.numRows; r++) {
		walls.longitude[r] = [];

		for (let c=0; c<=walls.numColumns; c++) {
			walls.longitude[r][c] = {
				isLocked: (c === 0 || c === walls.numColumns),
				isOpen: false
			}
		}
	}

	return recursiveBacktracker(walls);
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

	makeExits(w);

	return w;
};

const makeExits = (w: Walls): void => {
	let randomTop = Math.round(w.numRows*Math.random()),
			randomBottom = Math.round(w.numRows*Math.random());

	w.latitude[0][randomTop].isOpen = true;
	w.latitude[w.numRows][randomBottom].isOpen = true;
}

const moveToNextCell = (cell: CellLocation, walls: Walls): CellLocation|null => {
	let neighbors: CellLocation[] = [],
			cellProps = getCellProperties(cell)

	if (cell.row > 0)
		neighbors.push(cellProps.neighbors.top)
	if (cell.column+1 < walls.numColumns)
		neighbors.push(cellProps.neighbors.right)
	if (cell.row+1 < walls.numRows)
		neighbors.push(cellProps.neighbors.bottom)
	if (cell.column > 0)
		neighbors.push(cellProps.neighbors.left)

	// find cells that are all surrounded by walls, or not linked
	let availableCells = neighbors.filter(n => getCellLinks(n, walls) === 0);

	if (availableCells.length === 0) return null;
	return availableCells[Math.floor(Math.random()*availableCells.length)]
}

const getCellProperties = (cell:CellLocation): CellProperties => {
	return {
		row: cell.row,
		column: cell.column,
		walls: {
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
		},
		neighbors: {
			top: { row: cell.row-1, column: cell.column },
			right: { row: cell.row, column: cell.column+1 },
			bottom: { row: cell.row+1, column: cell.column },
			left: { row: cell.row, column: cell.column-1 }
		}
	}
}

const getCellLinks = (cell:CellLocation, walls: Walls): number => {
	let links = 0,
			cellProps: CellProperties = getCellProperties(cell);

	if (walls.latitude[cellProps.walls.top.row][cellProps.walls.top.column].isOpen) links++;
	if (walls.longitude[cellProps.walls.right.row][cellProps.walls.right.column].isOpen) links++;
	if (walls.latitude[cellProps.walls.bottom.row][cellProps.walls.bottom.column].isOpen) links++;
	if (walls.longitude[cellProps.walls.left.row][cellProps.walls.left.column].isOpen) links++;

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