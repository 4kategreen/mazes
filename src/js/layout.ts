class Grid {
	rows: number;
	columns: number;
	grid: Cell[][];

	constructor(rows: number, columns: number) {
		this.rows = rows;
		this.columns = columns;
		this.grid = [];

		this.prepareGrid();
		this.configureCells();
	};

	prepareGrid() {
		for (let r=0; r<this.rows; r++) {
			this.grid[r] = [];
			for (let c=0; c<this.columns; c++) {
				this.grid[r][c] = new Cell(r,c);
			}
		}
	};

	configureCells() {
		for (let r=0; r<this.rows; r++) {
			for (let c=0; c<this.columns; c++) {
				let cell = this.grid[r][c];

				let row = cell.row,
						column = cell.column;

				cell.north = row > 0 ? this.grid[row - 1][column]: undefined;
				cell.south = row < this.rows - 1 ? this.grid[row + 1][column] : undefined;
				cell.west = column > 0 ? this.grid[row][column - 1]: undefined;
				cell.east = column < this.columns - 1 ? this.grid[row][column + 1]: undefined;
			}
		}
	}

	randomCell(): Cell {
		let randomRow = Math.ceil(Math.random()*this.rows);
		let randomColumn = Math.ceil(Math.random()*this.columns);

		return this.grid[randomRow][randomColumn];
	}

	print() {
		console.log(this.rows)
		console.log(this.columns)
		console.log(this.grid)
	}
}

class Cell {
	row: number;
	column: number;
	north?: Cell;
	south?: Cell;
	east?: Cell;
	west?: Cell
	links: Cell[];

	constructor(row: number, column: number) {
		this.row = row;
		this.column = column;
		this.links = [];
	}

	link(cell: Cell) {
		this.links.push(cell);
	};

	isLinked(cell: Cell): Boolean {
		return this.links.includes(cell);
	}

	neighbors(): Cell[] {
		let list = [];
		if (this.north) list.push(this.north);
		if (this.south) list.push(this.south);
		if (this.east) list.push(this.east);
		if (this.west) list.push(this.west);

		return list;
	}
}

export { Grid }