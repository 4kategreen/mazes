[![Netlify Status](https://api.netlify.com/api/v1/badges/499b2c8e-7cd5-4b8d-8f5e-2585e9c33ebb/deploy-status)](https://app.netlify.com/sites/mystifying-curie-614fdc/deploys)

# Maze Monster
[www.mazemonster.com](www.mazemonster.com), a maze generator based on Jamis Buck's Mazes for Programmers

A compilation of the code from Jamis Buck's book with some changes and upgrades to suit my needs, which is generating endless mazes for my children.

## Approach
 Walls
 ```
  - -
 | | |
  - -
 | | |
  _ _
 ```
 
 Cells and walls are based on an (x,y) coordinates pattern and expressed as (row, column) or (r,c).

 Walls are expressed, like the globe, as latitude (up and down) and longitude (left and right). Latitude walls have an extra column (3 v. 2 cells). Longitude walls have an extra row
 
 ### Examples
 1. Cell `(0,0)` -> `lat(0,1)` (not `lat(0,0)` is a wall); `long(1,0)` (not `long(0,0)`; wall)
 1. Cell `(1,0)` -> `lat(1,0)` and `lat(2,0)`; `long(1,1)` (not `long(1,0)`; wall)
 1. Cell `(2,1)` -> `lat(2,1)` and `lat(3,1)`; `long(2,1)` and `long(2,2)`

## Usage

### Installation
1. Clone
1. `npm i`

### Compilation
`npm run build`
