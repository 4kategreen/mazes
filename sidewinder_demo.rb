require 'grid'
require 'sidewinder'

grid = Grid.new(10,10)
Sidewinder.on(grid)

img = grid.to_png
img.save "sidewinder.png"

puts grid