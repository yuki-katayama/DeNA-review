<template>
  <div class="popup">
    <div class="popup__container">
      <div class="popup__popup-header">
        <span><slot name="header" /></span>
        <div
          class="close-button"
          @click="close"
        >
&nbsp;
        </div>
      </div>
      <div class="popup__popup-body">
        <slot name="body" />
      </div>
      <div class="popup__popup-body popup__popup-body--vertical">
        <slot name="body-vertical" />
      </div>
      <div
        class="popup__footer"
        :class="{ 'popup__footer--hidden': hideFooter }"
      >
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Component, Prop, Watch } from "vue-property-decorator";

export default class Popup extends Vue {
  @Prop() private hideFooter: boolean | undefined;
  @Prop() private isVisible!: boolean;
  @Prop() private onEnter?: () => void;
  @Prop() private init?: () => void;

  private keyUpListener: (e: KeyboardEvent) => void = this.onKeyUp;

  @Watch("isVisible")
  private onPopupVisibilityChange(isVisibleCurrently: boolean, isVisiblePrevious: boolean) {
    if (isVisibleCurrently !== isVisiblePrevious) {
      if (isVisibleCurrently) {
        window.addEventListener("keyup", this.keyUpListener);
        if (this.init) {
          this.init();
        }
      } else {
        window.removeEventListener("keyup", this.keyUpListener);
      }
    }
  }

  mounted(): void {
    if (this.isVisible) {
      window.addEventListener("keyup", this.keyUpListener);
    }
  }

  private onKeyUp(e: KeyboardEvent): void {
    e.preventDefault();
    const key = e.key || e.keyCode;
    if (key === 13 || key === "Enter") {
      if (this.onEnter) {
        this.onEnter();
      }
    } else if (key === "Escape") {
      this.close();
    }
  }

  private close(): void {
    this.$emit("close");
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/_popup.scss";
</style>
