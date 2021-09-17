import Vue from "vue";
import Vuex from "vuex";
import UserAPI from "./../apis/users";

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
      isCurrent: true,
    },
    isAuthenticated: false,
    isNewPost: false,
    isEdited: false
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser,
      };
      state.isAuthenticated = true
    },
    updateNewPost(state) {
      state.isNewPost = !state.isNewPost
    },
    updateEdited(state) {
      state.isEdited = !state.isEdited
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await UserAPI.getCurrentUser();
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
