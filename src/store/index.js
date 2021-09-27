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
      role:""
    },
    isAuthenticated: false,
    isNewPost: false,
    isNewUser: false,
    token: '',
    socket:""
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser,
      };
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
    },
    updateNewPost(state) {
      state.isNewPost = !state.isNewPost
    },
    updateNewUser(state) {
      state.isNewUser = !state.isNewUser
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token =""
      localStorage.removeItem('token')
    },
    addSocket(state, socket) {
      state.socket = socket
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
        role
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
        role
      });
      return true
    } catch (error) {
      console.log(error.message);
      commit('revokeAuthentication')
      return false
    }
  },
},
  modules: {},
});
