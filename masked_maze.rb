require_relative 'src/layout/mask'
require_relative 'src/layout/masked_grid'
require_relative 'src/algorithms/recursive_backtracker'

abort "Please specify a text file to use as a template" if ARGV.empty?

input_file_parts = ARGV.first.split('.')
input_ext = input_file_parts.last
input_name = input_file_parts.first.split('/').last

case input_ext # file ext
when "txt"
	mask = Mask.from_txt(ARGV.first)
when "png"
	mask = Mask.from_png(ARGV.first)
else
	abort "Unknown file type"
end

grid = MaskedGrid.new(mask)
RecursiveBacktracker.on(grid)

output_name = "output/#{input_name}.png"
grid.to_png.save(output_name)
puts "saved image to #{output_name}"