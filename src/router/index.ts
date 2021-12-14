import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LocalGameView from "../views/LocalGameView.vue";
import RemoteGameView from "../views/RemoteGameView.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/local",
    name: "LocalGameViewGame",
    component: LocalGameView,
  },
  {
    path: "/remote",
    name: "RemoteGameViewGame",
    component: RemoteGameView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
