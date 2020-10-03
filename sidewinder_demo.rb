require_relative 'src/layout/grid'
require_relative 'src/algorithms/sidewinder'

grid = Grid.new(85,110)
Sidewinder.on(grid)

img = grid.to_png
img.save "sidewinder.png"

puts grid