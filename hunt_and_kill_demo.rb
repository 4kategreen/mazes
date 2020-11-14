require 'src/layout/grid'
require 'src/algorithms/hunt_and_kill'

grid = Grid.new(20,40)
HuntAndKill.on(grid)

filename = "output/hunt_and_kill.png"
grid.to_png.save(filename)
puts "saved to #{filename}"