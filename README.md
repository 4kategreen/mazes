# Mazes
Based on Jamis Buck's Mazes for Programmers

A compilation of the code from Jamis Buck's book with some changes and upgrades to suit my needs, which is generating endless mazes for my children.

## Usage

### Big Block Maze
To generate a maze:

```
ruby create_maze.rb {width} {height} {algorithm}
```

where algorithm is one of:
* `binary_tree`
* `sidewinder`
* `aldous_broder`
* `wilsons`
* `hunt_and_kill`

It will output to an `output/` directory. If that fails, `mkdir output` to make the directory in the same place as `create_maze.rb`

### Maze With Masks
To generate a masked maze, you can use ascii maps, like in the `masks/` directory or a black and white png. 

```
ruby masked_maze.rb {file}
```