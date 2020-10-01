require 'grid'
require 'binary_tree'

grid = Grid.new(10,10)
BinaryTree.on(grid)

img = grid.to_png
img.save "binary_tree.png"

puts grid