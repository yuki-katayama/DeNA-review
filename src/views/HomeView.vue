<template>
  <div class="home">
    <div class="title">４目並べ</div>
    <div class="battle-mode">
      <button type="button" disabled="true">1人</button>
      <br />
      <button type="button" @click="start()">2人</button>
      <br />
      <button type="button" disabled="true">オンライン対戦</button>
    </div>
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
export default class HomeView extends Vue {
  private start() {
    this.$router.push({ path: "/game" });
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/_home_view.scss";
</style>
