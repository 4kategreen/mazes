require_relative 'src/layout/grid'

if ARGV.length != 3
	puts "We need width, height, and algorithm"
	exit
end

algorithm = ARGV[2]
grid = Grid.new(ARGV[0].to_i, ARGV[1].to_i)

require_relative "src/algorithms/#{algorithm}"

case algorithm
when "aldous_broder"
	AldousBroder.on(grid)
when "binary_tree"
	BinaryTree.on(grid)
when "hunt_and_kill"
	HuntAndKill.on(grid)
when "recursive_backtracker"
	RecursiveBacktracker.on(grid)
when "sidewinder"
	Sidewinder.on(grid)
when "wilsons"
	Wilsons.on(grid)
else
	puts "We don't know that algorithm"
	exit
end

deadends = grid.deadends
puts "Number of dead ends: #{deadends.count}"

filename = "output/#{algorithm}.png"
grid.to_png.save(filename)
puts "saved to #{filename}"