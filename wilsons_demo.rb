require_relative 'src/layout/grid'
require_relative 'src/algorithms/wilsons'

grid = Grid.new(40, 40)
Wilsons.on(grid)

filename = "output/wilsons.png"
grid.to_png.save(filename)
puts "saved to #{filename}"