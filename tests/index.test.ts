import { Walls } from '../src/types';;
import { createMaze } from '../src/layout';

let percents = (x:number, y:number) => {
  let total = 0,
      locked = 0,
      closed = 0,
      open = 0,
      maze: Walls = createMaze(x,y);

  for (let line of maze.latitude) {
    for (let wall of line) {
      total++;
      switch (wall) {
        case 0:
          locked++;
          break;
        case 1:
          closed++;
          break;
        case 2:
          open++;
          break;
      }
    }
  }

  for (let line of maze.longitude) {
    for (let wall of line) {
      total++;
      switch (wall) {
        case 0:
          locked++;
          break;
        case 1:
          closed++;
          break;
        case 2:
          open++;
          break;
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

let expectedValues = [
  {
    totalClosed: 0,
    totalLocked: 0,
    totalOpen: 1,
    totalWalls: 1,
  },
  {
    totalWalls: 264,
    totalLocked: 0.1590909090909091,
    totalClosed: 0.3787878787878788,
    totalOpen: 0.4621212121212121
  },
  {
    totalWalls: 1012,
    totalLocked: 0.08498023715415019,
    totalClosed: 0.4357707509881423,
    totalOpen: 0.4792490118577075
  },
  {
    totalWalls: 2244,
    totalLocked: 0.057932263814616754,
    totalClosed: 0.4563279857397504,
    totalOpen: 0.4857397504456328
  },
  {
    totalWalls: 3960,
    totalLocked: 0.04393939393939394,
    totalClosed: 0.4669191919191919,
    totalOpen: 0.48914141414141415
  },
  {
    totalWalls: 6160,
    totalLocked: 0.03538961038961039,
    totalClosed: 0.4733766233766234,
    totalOpen: 0.49123376623376624
  },
  {
    totalWalls: 8844,
    totalLocked: 0.029624604251469924,
    totalClosed: 0.4777250113071009,
    totalOpen: 0.4926503844414292
  },
  {
    totalWalls: 12012,
    totalLocked: 0.025474525474525476,
    totalClosed: 0.48085248085248083,
    totalOpen: 0.49367299367299367
  },
  {
    totalWalls: 15664,
    totalLocked: 0.02234422880490296,
    totalClosed: 0.4832099080694586,
    totalOpen: 0.49444586312563843
  },
  {
    totalWalls: 19800,
    totalLocked: 0.0198989898989899,
    totalClosed: 0.48505050505050507,
    totalOpen: 0.4950505050505051
  }
];

describe('createMaze', () => {
  it('has a consistent percentage variance of wall types', () => {
    let allPercents: Array<{}> = [],
        i = 0;

    while (i < 10) {
      allPercents.push(percents(i*11, i*11));
      i++;
    }

    expect(allPercents).toEqual(expectedValues);
  })
})