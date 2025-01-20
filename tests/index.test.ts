import expectedValues from './fixtures';

import { Walls } from '../src/types';;
import { createMaze } from '../src/layout';

let percents = (x:number, y:number) => {
  let total = 0,
      locked = 0,
      closed = 0,
      open = 0,
      maze: Walls = createMaze(x,y);

  for (let orientation of [maze.latitude, maze.longitude]) {
    for (let line of orientation) {
      for (let wall of line) {
        total++;
        if (wall.isLocked) {
          locked++;
        } else {
          if (wall.isOpen) {
            open++;
          } else closed++;
        }
      }
    }
  }

  return {
    totalWalls: total,
    totalLocked: locked/total,
    totalClosed: closed/total,
    totalOpen: open/total,
  }
}

describe('createMaze', () => {
  it('has a consistent percentage variance of wall types', () => {
    let allPercents: Array<{}> = [],
        i = 1;

    while (i < 10) {
      allPercents.push(percents(i*11, i*11));
      i++;
    }
    
    expect(allPercents).toEqual(expectedValues);
  })
})