<template>
  <div class="bord">
    <div
      v-for="(column, y) in map"
      :key="y"
    >
      <label
        v-for="(math, x) in column"
        :key="x"
      >
        <Coin
          :math-stat="math"
          :my-term="myTerm"
          @selected="onSelected({ x: x, y: y })"
        />
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { CoordinatesPosition } from "@/utils/models";
import { Prop } from "vue-property-decorator";
import Coin from "@/components/Coin.vue"; // @ is an alias to /src


@Options({
  components: {
    Coin,
  },
})
export default class Bord extends Vue {
  @Prop() map!: number[][];
  @Prop() myTerm!: boolean;

  private onSelected(position: CoordinatesPosition): void {
    this.$emit('onSelected', position);
  }
}
</script>

<style lang="scss">
.bord {
}
</style>