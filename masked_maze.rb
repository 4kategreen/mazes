require_relative 'src/layout/mask'
require_relative 'src/layout/masked_grid'
require_relative 'src/algorithms/recursive_backtracker'

abort "Please specify a text file to use as a template" if ARGV.empty?
mask = Mask.from_txt(ARGV.first)
grid = MaskedGrid.new(mask)
RecursiveBacktracker.on(grid)

filename = "output/masked.png"
grid.to_png.save(filename)
puts "saved image to #{filename}"