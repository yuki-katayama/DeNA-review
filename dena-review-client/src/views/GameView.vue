<template>
  <div class="game">
    <button class="tool-button" @click=leaveRoom()>部屋を退出する</button>
    <Bord
      :map="map"
      :game-state="gameState"
      :player="player()"
      :term-count="termCount"
      :game-mode="gameMode"
      @incrementTerm="onIncrementTerm()"
      @finished="onFinished($event)"
    />
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
  GameMode,
  PLAYER_MAX,
} from "@/utils/constants";
import { PlayerDataService } from "@/service/PlayerDataService"
import { User, Room, UserRoomState } from "@/utils/models";
import Bord from "@/components/Bord.vue";

@Options({
  components: {
    Bord,
  },
})
export default class Game extends Vue {
  private dataServiceRef: PlayerDataService = <any>{}; //dummy
  private map: number[][] = new Array(HEIGHT);
  private gameState: GameState = "CONTINUE";
  private playerX = 0;
  private termCount = 0;
  private gameMode = "";
  private userRoomStates: UserRoomState[] = [];

  mounted(): void {
    this.gameMode = this.$route.query.mode!.toString() as GameMode;
    for (let i = 0; i < HEIGHT; i++) {
      this.map[i] = new Array(WIDTH).fill(-1);
    }
    if (this.gameMode === 'ONLINE') {
      const roomName = this.$route.query.roomName!.toString();
      this.dataServiceRef = this.$store.state.playerDataService;
      this.dataServiceRef.onConnected(() => this.getDataFromDataServer(roomName));
      this.dataServiceRef.onUserJoinRoom((userRoomStates: UserRoomState[]) => this.onUserJoinRoom(userRoomStates));
    }
    return;
  }

  private leaveRoom() {
    this.dataServiceRef.emitLeaveRoom();
    this.$router.push({ path: "/"});
  }

  private getDataFromDataServer(roomName: string) {
    this.dataServiceRef.emitJoinRoom(roomName);
  }

  private onUserJoinRoom(userRoomStates: UserRoomState[])
  {
    this.userRoomStates = userRoomStates;
  }

  private onIncrementTerm(): void {
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
