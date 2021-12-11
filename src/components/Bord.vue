<template>
  <div class="bord">
    <div v-for="(column, y) in map" :key="y">
      <label v-for="(math, x) in column" :key="x">
        <Coin :math-stat="math" @selected="onSelected({ x: x, y: y })"> </Coin>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {
  WIDTH,
  HEIGHT,
  CONSECUTIVE_MAX,
  GameState,
} from "@/utils/constants";
import { CoordinatesPosition } from "@/utils/models";
import { Emit, Prop } from "vue-property-decorator";
import Coin from "@/components/Coin.vue"; // @ is an alias to /src

@Options({
  components: {
    Coin,
  },
})
export default class Bord extends Vue {
  @Prop() map!: number[][];
  @Prop() gameState!: GameState;
  @Prop() player!: number;
  @Prop() termCount!: number;

  private canPutCoin(position: CoordinatesPosition): boolean {
    if (position.y === HEIGHT - 1 || this.map[position.y + 1][position.x] !== -1) {
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

  private getGameState(position: CoordinatesPosition): string {
    if (
      this.checkVertical(position) ||
      this.checkHorizontal(position) ||
      this.checkDiagonalPositive(position) ||
      this.checkDiagonalNegative(position)
    ) {
      return "FINISH"
    } else if (this.termCount === (HEIGHT * WIDTH - 1)) {
      return "DRAW"
    }
    return "CONTINUE";
  }

  private onSelected(position: CoordinatesPosition): void {
    if (this.gameState !== "CONTINUE" || !this.canPutCoin(position)) {
      return;
    }
    this.map[position.y][position.x] = this.player;
    const gameState = this.getGameState(position);
    if (gameState !== "CONTINUE") {
      this.$emit("finished", gameState);
      return ;
    }
    this.$emit("incrementTerm");
    console.log(this.termCount);
    return;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.bord {
}
</style>
