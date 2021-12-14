import { HEIGHT, WIDTH } from "./constants"

export function bot(map: number[][]) {
    let rowIdx = 0;
    let columnIdx = HEIGHT - 1;
    for (;;) {
      rowIdx = Math.floor(Math.random() * WIDTH);
      if (map[0][rowIdx] === -1) {
        break;
      }
    }
    for (; ; columnIdx--) {
      if (map[columnIdx][rowIdx] === -1 && columnIdx === HEIGHT - 1) {
        break;
      }
      if (
        map[columnIdx][rowIdx] === -1 &&
        map[columnIdx + 1][rowIdx] !== -1
      ) {
        break;
      }
    }
    return { x: rowIdx, y: columnIdx };
}