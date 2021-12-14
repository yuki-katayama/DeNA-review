<template>
  <div class="home">
    <div class="title">４目並べ</div>
    <div class="battle-mode">
      <button class="tool-button" @click="start('SOLO', 'BOTと対戦')">BOTと対戦</button>
      <br />
      <button class="tool-button" @click="start('OFFLINE', '2人で対戦')">2人で対戦</button>
      <br />
      <button class="tool-button" @click="showAddModal()">オンライン対戦</button>
    </div>
    <div class="rooms">
      対戦する部屋を選択してください
      <div v-for="(room, i) in roomsState"
      :key="i"
      class="rooms">
        <button class="tool-button" @click="clickedRoom(room.id)">{{room.name}}</button>
      </div>
    </div>
    <button class="tool-button"
      v-bind:class="{ 'tool-button--disabled': !canJoin }"
      :disabled="!canJoin"
      @click="start('ONLINE')">参加する</button>

    <AddRoomPopup v-show="isAddModalVisible" @close="hideAddModal"
    :data-service-ref="dataServiceRef"
    :rooms="roomsState"
    :is-visible="isAddModalVisible" />
  </div>

</template>

<script lang="ts">
import { PlayerDataService } from "@/service/PlayerDataService"
import { Options, Vue } from "vue-class-component";
import  Bord from "@/components/Bord.vue";
import AddRoomPopup from "@/components/popup/AddRoomPopup.vue";
import Popup from "@/components/utils/Popup.vue";
import  { Room, User } from "@/utils/models";


@Options({
  components: {
    Bord,
    AddRoomPopup,
    Popup,
  },
})
export default class HomeView extends Vue {
  private dataServiceRef: PlayerDataService = <any>{}; //dummy
  private isAddModalVisible = false;
  private roomsState: Room[] = [];
  private selectedRoomId = "";
  private canJoin = false;

  private get userId(): string {
    return this.$store.state.user.id;
  }

  private get selectedRoom(): Room | undefined {
    return this.roomsState.find((r) => r.id === this.selectedRoomId);
  }

  mounted(): void {
    this.dataServiceRef = this.$store.state.playerDataService
    this.dataServiceRef.onceConnected(() => this.getDataFromDataServer());
    this.dataServiceRef.onUpdateRoomsState((roomsState: Room[]) => this.onUpdateRoomsState(roomsState));
    return ;
  }

  private onUpdateRoomsState(roomsState: Room[]): void {
    this.roomsState = roomsState;
  }

  private showAddModal(): void {
    this.isAddModalVisible = true;
  }

  private hideAddModal(): void {
    this.isAddModalVisible = false;
  }
  private clickedRoom(roomId: string): void {
    this.selectedRoomId = roomId;
    if(this.selectedRoom) {
      this.canJoin = true
    }
  }

  private start(mode: string, roomName?: string) {
    if (mode === "ONLINE") {
      this.$router.push({ path: "/remote" , query: { mode: mode, roomName: this.selectedRoom!.name}});
    } else {
      this.$router.push({ path: "/local" , query: { mode: mode, roomName: roomName}});
    }
  }

  private getDataFromDataServer(): void{
    this.dataServiceRef.emitAccessedUser(this.userId);
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/_home-view.scss";
</style>
