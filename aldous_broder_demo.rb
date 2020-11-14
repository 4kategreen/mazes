require_relative 'src/layout/grid'
require_relative 'src/algorithms/aldous_broder'

grid = Grid.new(212, 275)
AldousBroder.on(grid)

filename = "output/aldous_broder.png"
grid.to_png.save(filename)
puts "saved to #{filename}"