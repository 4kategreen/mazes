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

export type Walls = {
	numRows: number,
	numColumns: number,
	latitude: Array<Array<WallProperties>>,
	longitude: Array<Array<WallProperties>>
}

export type Wall = {
	row: number, 
	column: number, 
	orientation: string
};

export type CellLocation = {
	row: number,
	column: number
};

export type CellProperties = {
	row: number,
	column: number,
	walls: CellWalls,
	neighbors?: null
}

export type CellWalls = {
	top: Wall,
	right: Wall,
	bottom: Wall,
	left: Wall
}

export type WallProperties = {
  isLocked: Boolean,
  isOpen: Boolean
}