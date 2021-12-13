import { createStore } from "vuex";
import { PlayerDataService } from "../service/PlayerDataService";
import { User } from "../utils/models";

export default createStore({
  state: {
    playerDataService: (<any>null) as PlayerDataService,
    user: {} as User,
  },
  mutations: {
    SetPlayerDataService(state: any, dataService: PlayerDataService) {
      state.playerDataService = dataService;
    },
    SetUser(state, user: User) {
      state.user = user;
    },
  },
  actions: {},
  modules: {},
});
