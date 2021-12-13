<template>
  <popup @close="hidePopup" :is-visible="isVisible" :on-enter="addRoom" :init="init">
    <template v-slot:header>部屋の追加</template>
    <template v-slot:body-vertical>
      <div class="popup__popup-dropdown">
        <span class="popup__popup-dropdown--title">部屋の名前</span>
        <input ref="popupInputRef" v-model="newRoomName" :placeholder="'部屋の名前'" @keyup.enter="onNewRoomInputEnterClick()" class="home-settings-modal__info-input--server" @input="parseNewRoomInput()" />
      </div>

      <div class="error" v-if="addingRoomErrorMessage !== ''">
        {{ addingRoomErrorMessage }}
      </div>
    </template>
    <template v-slot:footer>
      <button class="popup__popup-button" @click="hidePopup()">
        キャンセル
      </button>
      <button class="popup__popup-button button--orange" @click="addRoom()" :disabled="!isNewRoomReadyToAdd" v-bind:class="{ 'zawa-button--disabled': !isNewRoomReadyToAdd }">
        部屋を追加する
      </button>
    </template>
  </popup>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Popup from "@/components/utils/Popup.vue";
import { PlayerDataService } from "@/service/PlayerDataService";
import { Room } from "@/utils/models";

@Options({
  components: {
    Popup,
  },
})
export default class AddRoomPopup extends Vue {
  @Prop() private dataServiceRef!: PlayerDataService;
  @Prop() private rooms!: Room[];
  @Prop() private isVisible!: boolean;

  private addingRoomErrorMessage = "";
  private newRoomName = "";
  private isNewRoomReadyToAdd = false;
  private init(): void {
    this.clearAddingRoomErrorMessage();
    this.clearNewRoomInput();
    this.isNewRoomReadyToAdd = false;
  }

  private clearAddingRoomErrorMessage(): void {
    this.addingRoomErrorMessage = "";
  }

  private clearNewRoomInput(): void {
    this.newRoomName = "";
  }

  private onNewRoomInputEnterClick(): void {

    this.parseNewRoomInput();
    this.addRoom();
  }

  private addRoom(): void {
    if (this.isNewRoomReadyToAdd) {
		console.log("wadaw");

      const convertedRoomName = this.getConvertedRoomName();
      this.dataServiceRef.emitAddRoom(convertedRoomName);
      this.hidePopup();
    }
  }

  private getConvertedRoomName(): string {
    return this.newRoomName.toLowerCase().replace("+", "");
  }

  private isSpaceOrRoomNameOk(roomOrSpaceName: string): boolean {
  	if (roomOrSpaceName.includes(" ")) {
  	  return false;
  	}
	return true;
  }

  private parseNewRoomInput(): void {

    const convertedRoomName = this.getConvertedRoomName();

    const isRoomNameOk = this.isSpaceOrRoomNameOk(convertedRoomName);
    if (!isRoomNameOk) {
      this.addingRoomErrorMessage = "部屋の名前はスペースを含めることができません。";
      this.isNewRoomReadyToAdd = false;
      return;
    }
    const isRoomAlreadyAdded = !!this.rooms.find((room) => room.name === convertedRoomName);
    if (isRoomAlreadyAdded) {
      this.isNewRoomReadyToAdd = false;
      this.addingRoomErrorMessage = "同じスペース名が存在します。";
    } else if (convertedRoomName !== "") {
      this.clearAddingRoomErrorMessage();
      this.isNewRoomReadyToAdd = true;
    } else {
      this.addingRoomErrorMessage = "スペースの名前を空にすることはできません。";
      this.isNewRoomReadyToAdd = false;
    }
  }

  private hidePopup(): void {
    this.$emit("close");
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/_popup.scss";
</style>
