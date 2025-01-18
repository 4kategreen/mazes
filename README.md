[![Netlify Status](https://api.netlify.com/api/v1/badges/499b2c8e-7cd5-4b8d-8f5e-2585e9c33ebb/deploy-status)](https://app.netlify.com/sites/mystifying-curie-614fdc/deploys)

# Maze Monster
[www.mazemonster.com](www.mazemonster.com), a maze generator based on Jamis Buck's Mazes for Programmers

A compilation of the code from Jamis Buck's book with some changes and upgrades to suit my needs, which is generating endless mazes for my children.

## Approach
 Maze data is stored by the state of its walls. It has rows (latitude) and columns (longitude). For each piece of a wall, it can be Closed (has a wall), Open (doesn't have a wall), or Locked (can't be changed; an edge).

 To traverse the maze during its creation, we use the cells, or the spaces between the walls.
 
 Cells and walls are based on an (x,y) coordinates pattern and expressed as (row, column) or (r,c).

 Walls are expressed, like a map, as latitude (up and down) and longitude (left and right). Latitude walls have an extra column (3 v. 2 cells). Longitude walls have an extra row.
 
 ### Examples
  ```
  _ _ _
 |a|_|b| a = cell(0,0) = walls(top:(0,0,lat), right:(1,0,long), bottom:(0,1,lat), left:(0,0,long))
 |_|_|_| b = cell(2,0) = walls(top:(2,0,lat), right:(3,0,long), bottom:(0,1,lat), left:(2,0,long))
 |c|_|_| c = cell(0,2) = walls(top:(0,2,lat), right:(1,2,long), bottom:(0,3,lat), left:(0,2,long))
 ```

 Top and Left walls are always the same as the cell.
 Bottom walls are always y+1 more than the y value of the cell
 Right walls are always x+1 more than the x value of the cell

## Usage

### Installation
1. Clone
1. `npm i`

### Compilation
`npm run build` or `npm run build:watch`

### Running Locally
Open `index.html` in your browser
