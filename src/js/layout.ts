class Grid {
	rows: number;
	columns: number;
	grid: Cell[][];

	constructor(rows: number, columns: number) {
		this.rows = rows;
		this.columns = columns;

		this.prepareGrid();
		this.configureCells();
	};

	prepareGrid() {
		for (let r=0; r<this.rows; r++) {
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

				cell.north = this.grid[row - 1][column]
				cell.south = this.grid[row + 1][column]
				cell.west = this.grid[row][column - 1]
				cell.east = this.grid[row][column + 1]
			}
		}
	}

	randomCell(): Cell {
		let randomRow = Math.ceil(Math.random()*this.rows);
		let randomColumn = Math.ceil(Math.random()*this.columns);

		return this.grid[randomRow][randomColumn];
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