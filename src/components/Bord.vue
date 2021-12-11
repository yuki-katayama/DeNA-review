<template>
  <div class="bord">
    <div v-for="(column, y) in map" :key="y">
      <label v-for="(math, x) in column" :key="x">
        <Coin :math-stat="math" @selected="onSelected({ x: x, y: y })"> </Coin>
      </label>
    </div>
    <button @click="reset">リセット</button>
    <div v-if="finishGame === 'FINISH'" class="bord__result">
      player {{ playerX + 1 }}: winner
    </div>
    <div v-else-if="finishGame === 'DRAW'" class="bord__result">
      引き分けです。
    </div>
    <div v-else class="bord__player">player {{ playerX + 1 }}のターンです</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {
  WIDTH,
  HEIGHT,
  CONSECUTIVE_MAX,
  PLAYER_MAX,
  GameState,
} from "@/utils/constants";
import { CoordinatesPosition } from "@/utils/models";
import Coin from "@/components/Coin.vue"; // @ is an alias to /src

@Options({
  components: {
    Coin,
  },
})
export default class Bord extends Vue {
  private map: number[][] = new Array(HEIGHT);
  private termCount = 0;
  private playerX = 0;
  private finishGame: GameState = "CONTINUE";

  mounted(): void {
    for (let i = 0; i < HEIGHT; i++) {
      this.map[i] = new Array(WIDTH).fill(-1);
    }
    return;
  }

  private canPutCoin(position: CoordinatesPosition): boolean {
    if (
      position.y === HEIGHT - 1 ||
      this.map[position.y + 1][position.x] !== -1
    ) {
      return true;
    }
    return false;
  }

  private getConsecutiveNum(
    PosX: number,
    PosY: number,
    dirX: number,
    dirY: number
  ): number {
    let ret = 0;
    const mathState = this.map[PosY][PosX];
    for (;;) {
      PosX += dirX;
      PosY += dirY;
      if (
        !(PosX < WIDTH && PosX >= 0) ||
        !(PosY < HEIGHT && PosY >= 0) ||
        this.map[PosY][PosX] !== mathState
      ) {
        break;
      }
      ret++;
    }
    return ret;
  }

  private isVictory(
    PosX: number,
    PosY: number,
    dirX: number,
    dirY: number
  ): boolean {
    let consecutiveNum = 1;
    consecutiveNum += this.getConsecutiveNum(PosX, PosY, dirX, dirY);
    consecutiveNum += this.getConsecutiveNum(PosX, PosY, dirX * -1, dirY * -1);
    if (consecutiveNum === CONSECUTIVE_MAX) {
      return true;
    }
    return false;
  }

  private checkVertical(position: CoordinatesPosition): boolean {
    return this.isVictory(position.x, position.y, 0, 1);
  }

  private checkHorizontal(position: CoordinatesPosition): boolean {
    return this.isVictory(position.x, position.y, 1, 0);
  }

  private checkDiagonalNegative(position: CoordinatesPosition): boolean {
    return this.isVictory(position.x, position.y, 1, 1);
  }

  private checkDiagonalPositive(position: CoordinatesPosition): boolean {
    return this.isVictory(position.x, position.y, 1, -1);
  }

  private isFinishGame(position: CoordinatesPosition): boolean {
    if (
      this.checkVertical(position) ||
      this.checkHorizontal(position) ||
      this.checkDiagonalPositive(position) ||
      this.checkDiagonalNegative(position)
    ) {
      this.finishGame = "FINISH";
    } else if (this.termCount === HEIGHT * WIDTH) {
      this.finishGame = "DRAW";
    }
    if (this.finishGame === "CONTINUE") {
      return false;
    }
    return true;
  }

  private onSelected(position: CoordinatesPosition): void {
    if (this.finishGame !== "CONTINUE" || !this.canPutCoin(position)) {
      return;
    }
    this.termCount++;
    this.map[position.y][position.x] = this.playerX;
    if (!this.isFinishGame(position)) {
      this.playerX = this.termCount % PLAYER_MAX;
    }
  }

  private reset() {
    this.termCount = 0;
    this.playerX = 0;
    this.finishGame = "CONTINUE";
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        this.map[y][x] = -1;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.bord {
}
</style>
