<template>
  <div class="game">
	<Bord :map="map"
        :game-state="gameState"
        :player="player()"
        :term-count="termCount"
        @incrementTerm="onIncrementTerm()"
        @finished="onFinished($event)"/>
    <button @click="reset">リセット</button>
    <div v-if="gameState === 'FINISH'" class="bord__result">
      player {{ player() + 1 }}: winner
    </div>
    <div v-else-if="gameState === 'DRAW'" class="bord__result">
      引き分けです。
    </div>
    <div v-else class="bord__player">player {{ player() + 1 }}のターンです</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {
  WIDTH,
  HEIGHT,
  GameState,
  PLAYER_MAX,
} from "@/utils/constants";
import { CoordinatesPosition } from "@/utils/models";
import Bord from "@/components/Bord.vue"; // @ is an alias to /src

@Options({
  components: {
    Bord,
  },
})
export default class Game extends Vue {
	private map: number[][] = new Array(HEIGHT);
  private gameState: GameState = "CONTINUE";
  private playerX = 0;
  private termCount = 0;

  mounted(): void {
    for (let i = 0; i < HEIGHT; i++) {
      this.map[i] = new Array(WIDTH).fill(-1);
    }
    return;
  }

  private onIncrementTerm():void {
    this.termCount++;
  }

  private player(): number {
    return this.termCount % PLAYER_MAX;
  }

  private reset(): void {
    this.termCount = 0;
    this.playerX = 0;
    this.gameState = "CONTINUE";
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        this.map[y][x] = -1;
      }
    }
  }

  private onFinished(event: GameState): void {
    this.playerX = 0;
    this.gameState = event;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.game {
}
</style>
