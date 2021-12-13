<template>
  <div class="home">
    <div class="title">４目並べ</div>
    <div class="battle-mode">
      <button type="button" @click="start('SOLO')">1人</button>
      <br />
      <button type="button" @click="start('OFFLINE')">2人</button>
      <br />
      <button type="button" @click="showAddModal()">オンライン対戦</button>
    </div>
    <div v-for="(room, i) in roomsState"
    :key="i"
    class="rooms">
    {{room.name}}
    </div>
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

  private get userId(): string {
    return this.$store.state.user.id;
  }

  mounted(): void {
    this.dataServiceRef = this.$store.state.playerDataService
    this.dataServiceRef.onceConnected(() => this.getDataFromDataServer());
    this.dataServiceRef.onUpdateRoomsState((roomsState: Room[]) => this.onUpdateRoomsState(roomsState));
    // this.dataServiceRef.emitAddRoom(() => this.onAddRoom());
    return ;
  }

  /* ---- Event ----*/
  private onUpdateRoomsState(roomsState: Room[]): void {
    this.roomsState = roomsState;
  }

  private showAddModal(): void {
    this.isAddModalVisible = true;
  }

  private hideAddModal(): void {
    this.isAddModalVisible = false;
  }

  private start(mode: string) {
    this.$router.push({ path: "/game" , query: { mode: mode}});
  }
  private getDataFromDataServer(): void{
    this.dataServiceRef.emitAccessedUser(this.userId);
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/_home-view.scss";
</style>
