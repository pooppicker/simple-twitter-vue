<template>
  <div class="container follower-content">
    <div class="follower">
      <div class="navbars">
        <!--navbar-->
        <NavBars />
      </div>
      <div>
        <!--middle of home-->
        <UserFollowingList
          :innitialFollowUser="followers"
          :innitialUser="user"
        />
      </div>
      <div>
        <!--popular-->
        <Popular @updatefollower="fetchfollowers" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBars from "./../components/NavBars";
import UserFollowingList from "./../components/UserFollowingList";
import Popular from "./../components/Popular";
import UserAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
// @ is an alias to /src


export default {
  name: "UserFollower",
  components: {
    NavBars,
    Popular,
    UserFollowingList,
  },
  data() {
    return {
      followers: [],
      user: "",
    };
  },

  methods: {
    async fetchfollowers(userID) {
      try {
        const response = await UserAPI.getUserfollowers({ userID });
        this.followers = {
          ...response.data,
        };
      } catch (error) {
        console.log(error);
      }
    },

    async fetchUser(userID) {
      try {
        const response = await UserAPI.getUser({ userID });
        this.user = {
          ...response.data,
        };
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "資料載入錯誤，請稍後再試",
        });
      }
    },
  },

  created() {
    const { id } = this.$route.params;
    this.fetchfollowers(id);
    this.fetchUser(id);
  },

  watch: {
    isNewPost: {
      handler: function () {
        if (this.isNewPost) {
          const { id } = this.$route.params;
          this.fetchUser(id);
          this.$store.commit("updateNewPost");
        }
      },
      deep: true,
    },
  },

  computed: {
    ...mapState(["isNewPost"]),
  },
};
</script>

<style lang="scss">
@import "../assets/scss/efficientSetting.scss";
.follower-content {
  height: 100vh;
  width: 100vw;
  //標示用
  outline: red 2px solid;
  .follower {
    @extend %views-grid;
    //標示用
    // outline: green 2px solid;
    position: relative;
  }
}

//手機
@media screen and (max-width: 768px) {
  .follower-content {
    height: 100%;
    h5 {
      font-size: 15px;
    }
    .follower {
      grid-template-columns: 1fr;
      grid-template-rows: 5fr 20fr;
    }
  }
}
</style>