<template>
  <button
    v-if="mathStat === -1"
    class="coin__brank"
    :disabled="!myTerm"
    @click="selected()"
  >
  </button>
  <button
    v-else-if="mathStat === 0"
    class="coin__user1"
  >
  </button>
  <button
    v-else-if="mathStat === 1"
    class="coin__user2"
  >
  </button>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Emit, Prop } from "vue-property-decorator";

export default class Coin extends Vue {
  @Prop() mathStat!: number;
  @Prop() myTerm!: boolean;
  @Emit()
  selected(): void {
    return;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/css/_coin.scss";
</style>
