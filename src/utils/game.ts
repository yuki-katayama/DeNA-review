import { CoordinatesPosition,  } from "./models";
import { HEIGHT, WIDTH, CONSECUTIVE_MAX, GameState } from "./constants";

export function canPutCoin(map: number[][], position: CoordinatesPosition): boolean {
    if (
      position.y === HEIGHT - 1 ||
      map[position.y + 1][position.x] !== -1
    ) {
      return true;
    }
    return false;
  }

function isDraw(map: number[][])
{
	for(let y = 0; y < HEIGHT; y++) {
		for (let x = 0; x < WIDTH; x++) {
			if (map[y][x] === -1)
				return false
		}
	}
	return true;
}

function getConsecutiveNum(
	map: number[][],
    PosX: number,
    PosY: number,
    dirX: number,
    dirY: number
  ): number {
    let ret = 0;
    const mathState = map[PosY][PosX];
    for (;;) {
      PosX += dirX;
      PosY += dirY;
      if (
        !(PosX < WIDTH && PosX >= 0) ||
        !(PosY < HEIGHT && PosY >= 0) ||
        map[PosY][PosX] !== mathState
      ) {
        break;
      }
      ret++;
    }
    return ret;
  }

function isVictory(
	map: number[][],
    PosX: number,
    PosY: number,
    dirX: number,
    dirY: number
  ): boolean {
    let consecutiveNum = 1;
    consecutiveNum += getConsecutiveNum(map, PosX, PosY, dirX, dirY);
    consecutiveNum += getConsecutiveNum(map, PosX, PosY, dirX * -1, dirY * -1);
    if (consecutiveNum === CONSECUTIVE_MAX) {
      return true;
    }
    return false;
  }

  function checkVertical(map: number[][], position: CoordinatesPosition): boolean {
    return isVictory(map, position.x, position.y, 0, 1);
  }

  function checkHorizontal(map: number[][], position: CoordinatesPosition): boolean {
    return isVictory(map, position.x, position.y, 1, 0);
  }

  function checkDiagonalNegative(map: number[][], position: CoordinatesPosition): boolean {
    return isVictory(map, position.x, position.y, 1, 1);
  }

  function checkDiagonalPositive(map: number[][], position: CoordinatesPosition): boolean {
    return isVictory(map, position.x, position.y, 1, -1);
  }

  export function getGameState(map:number[][], position: CoordinatesPosition): GameState {
    if (
      checkVertical(map, position) ||
      checkHorizontal(map, position) ||
      checkDiagonalPositive(map, position) ||
      checkDiagonalNegative(map, position)
    ) {
      return "FINISH";
    } else if (isDraw(map)) {
      return "DRAW";
    }
    return "CONTINUE";
  }
