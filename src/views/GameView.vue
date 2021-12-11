<template>
  <div class="game">
    <Bord />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Bord from "@/components/Bord.vue"; // @ is an alias to /src

@Options({
  components: {
    Bord,
  },
})
export default class GameView extends Vue {}
</script>
