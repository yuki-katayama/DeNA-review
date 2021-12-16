<template>
  <div class="game">
    <h1>{{ roomName }}</h1>
    <h2>あなたの色 青</h2>
    <button
      class="tool-button"
      @click="leaveRoom()"
    >
      部屋を退出する
    </button>
    <Bord
      :map="map"
      :my-term="(gameMode === 'OFFLINE') ? true : myTerm"
      @onSelected="onSelected($event)"
    />
    <button @click="reset">
      リセット
    </button>
    <div
      v-if="gameState === 'FINISH'"
      class="bord__result"
    >
      {{ dispPlayer() }}: winner
    </div>
    <div
      v-else-if="gameState === 'DRAW'"
      class="bord__result"
    >
      引き分けです。
    </div>
    <div
      v-else
      class="bord__player"
    >
      {{ dispPlayer() }}のターンです
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {
  WIDTH,
  HEIGHT,
  GameState,
  GameMode,
  PLAYER_MAX,
} from "@/utils/constants";
import { PlayerDataService } from "@/service/PlayerDataService"
import { CoordinatesPosition, UserRoomState } from "@/utils/models";
import Bord from "@/components/Bord.vue";
import { canPutCoin, getGameState} from "@/utils/game"; // @ is an alias to /src
import { bot } from "@/utils/bot"; // @ is an alias to /src


@Options({
  components: {
    Bord,
  },
})
export default class LocalGameView extends Vue {
  private dataServiceRef: PlayerDataService = <any>{}; //dummy
  private map: number[][] = new Array(HEIGHT);
  private gameState: GameState = "CONTINUE";
  private myTerm = true;
  private gameMode = "";
  private roomName = "";
  private userRoomStates: UserRoomState[] = [];

  mounted(): void {
    this.gameMode = this.$route.query.mode!.toString() as GameMode;
    for (let i = 0; i < HEIGHT; i++) {
      this.map[i] = new Array(WIDTH).fill(-1);
    }
    this.roomName = this.$route.query.roomName!.toString();
    return;
  }

  private onSelected(position: CoordinatesPosition): void {
    this.onDefineGameState(position)
  }

  private onDefineGameState(position: CoordinatesPosition): void {
    if (this.gameState !== "CONTINUE" || !canPutCoin(this.map, position)) {
      return;
    }
    if (this.myTerm) {
      this.map[position.y][position.x] = 0;
    } else {
      this.map[position.y][position.x] = 1;
    }
    this.gameState = getGameState(this.map, position)
    if (this.gameState === "CONTINUE") {
      this.nextTerm()
    }
    return;
  }

  private nextTerm() {
    this.myTerm = !this.myTerm
    if (this.myTerm === false && this.gameMode === "SOLO") {
      const position = bot(this.map);
      this.onDefineGameState(position);
    }
  }

  private leaveRoom() {
    this.$router.push({ path: "/"});
  }

  private getDataFromDataServer(roomName: string) {
    this.dataServiceRef.emitJoinRoom(roomName);
  }

  private onUserJoinRoom(userRoomStates: UserRoomState[])
  {
    this.userRoomStates = userRoomStates;
  }

  private dispPlayer(): string {
    return (this.myTerm) ? "あなた" : "相手"
  }

  private reset(): void {
    this.myTerm = true;
    this.gameState = "CONTINUE";
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
@import "../assets/css/_utils.scss";
@import "../assets/css/_game-view.scss";

</style>
