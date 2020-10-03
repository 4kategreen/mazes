# Mazes
Based on Jamis Buck's Mazes for Programmers

A compilation of the code from Jamis Buck's book with some changes and upgrades to suit my needs, which is generating endless mazes for my children.

## Usage
Right now, the files all need to be run either on the command line or in some sort of Ruby GUI. I'm using command line, so I'll demo here. 

All files at the root level generate a maze. Some show different algorithms, others show off anciliary aspects of maze generation

* `*_demo.rb`: generates a maze a certain algorithm
* `dijkstra.rb`, `longest_path.rb` show the shortest and longest path in a path.
* `coloring.rb` use's Dijkstra's Algorithm to show the distance from a starting points=

In each file, you can edit the grid size (`new Grid(20,20)`). In the last two bullets, you can also edit the algorithm used by changing the `require` and class declaration. 

To generate a maze:

```
ruby -I. {file}.rb
```