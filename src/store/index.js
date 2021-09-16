import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: "",
      account: "",
      email: "",
      avatar: "",
      cover: "",
      introduction: "",
      TweetsCount: "",
      FollowersCount: "",
      FollowingCount: "",
    },
    isAuthenticated: false,
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser,
      };
      state.isAuthenticated = true;
    },
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser();
        if (data.status === "error") {
          throw new Error(data.message);
        }
        const {
          id,
          name,
          account,
          email,
          avatar,
          cover,
          introduction,
          TweetsCount,
          FollowersCount,
          FollowingCount,
        } = data;
        commit("setCurrentUser", {
          id,
          name,
          account,
          email,
          avatar,
          cover,
          introduction,
          TweetsCount,
          FollowersCount,
          FollowingCount,
        });
        console.log("data", data);
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  modules: {},
});
