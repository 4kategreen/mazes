require_relative 'src/layout/colored_grid'
require_relative 'src/algorithms/sidewinder'

grid = ColoredGrid.new(25,25)
Sidewinder.on(grid)

start = grid[grid.rows / 2, grid.columns / 2]

grid.distances = start.distances

filename = "output/colorized.png"
grid.to_png.save(filename)
puts "saved to #{filename}"