<template>
  <div class="game">
    <h1>{{ roomName }}</h1>
    <h2>あなたの色 {{ color }}</h2>
    <button
      class="tool-button"
      @click="leaveRoom()"
    >
      部屋を退出する
    </button>
    <Bord
      :map="map"
      :my-term="myTerm"
      @onSelected="onSelected($event)"
    />
    <button @click="reset">
      リセット
    </button>
    <div
      v-if="gameState === 'FINISH'"
      class="bord__result"
    >
      {{ resultDispPlayer() }}: winner
    </div>
    <div
      v-else-if="gameState === 'DRAW'"
      class="bord__result"
    >
      引き分けです。
    </div>
    <div
      v-else
      class="game__player"
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
export default class RemoteGameView extends Vue {
  private dataServiceRef: PlayerDataService = <any>{}; //dummy
  private map: number[][] = new Array(HEIGHT);
  private gameState: GameState = "CONTINUE";
  private myTerm = false;
  private gameMode = "";
  private roomName = "";
  private userRoomStates: UserRoomState[] = [];
  private secondPlayer = false;
  private color = "赤";

  mounted(): void {
	  console.log("adwadwa");
    this.gameMode = this.$route.query.mode!.toString() as GameMode;
    for (let i = 0; i < HEIGHT; i++) {
      this.map[i] = new Array(WIDTH).fill(-1);
    }
    this.roomName = this.$route.query.roomName!.toString();
    this.dataServiceRef = this.$store.state.playerDataService;
    this.dataServiceRef.onConnected(() => this.getDataFromDataServer(this.roomName));
    this.dataServiceRef.onUserJoinRoom((userRoomStates: UserRoomState[]) => this.onUserJoinRoom(userRoomStates));
    this.dataServiceRef.onSecondUserJoinRoom(() => this.onSecondUserJoinRoom());
	this.dataServiceRef.onUserFinish(() => this.onUserFinish());
    this.dataServiceRef.onUserPutCoin((position: CoordinatesPosition) => this.onUserPutCoin(position));
    return;
  }
  private onUserPutCoin(position: CoordinatesPosition) {
	  if (this.myTerm === false) {
		  if (this.secondPlayer) {
			  this.map[position.y][position.x] = 1;
		  } else {
			  this.map[position.y][position.x] = 0;
		  }
	  }
	  this.myTerm = !this.myTerm;
  }
  private onUserJoinRoom(userRoomStates: UserRoomState[]) {
	this.userRoomStates = userRoomStates;
	console.log(this.userRoomStates);
	this.myTerm = false;
  }

  private onSecondUserJoinRoom(): void {
	  this.color = "青"
	  this.secondPlayer = true;
	  this.myTerm = true;
  }

  private onSelected(position: CoordinatesPosition): void {
    this.defineGameState(position)
  }

  private onUserFinish(): void {
	  this.gameState = "FINISH"
  }

  private defineGameState(position: CoordinatesPosition): void {
    if (this.gameState !== "CONTINUE" || !canPutCoin(this.map, position)) {
      return;
    }
    if (this.secondPlayer) {
      this.map[position.y][position.x] = 0;
    } else {
      this.map[position.y][position.x] = 1;
    }
    this.gameState = getGameState(this.map, position)
    if (this.gameState !== "CONTINUE") {
		  this.dataServiceRef.emitPutCoin(position);
		  this.dataServiceRef.emitFinish();
    } else {
		  this.dataServiceRef.emitPutCoin(position);
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

  private dispPlayer(): string {
    return (this.myTerm) ? "あなた" : "相手"
  }

  /* putOnCoinしてからresultなので、逆にしないといけない */
  private resultDispPlayer(): string {
    return (this.myTerm) ? "相手" : "あなた"
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/css/_utils.scss";
@import "../assets/css/_game-view.scss";
</style>
