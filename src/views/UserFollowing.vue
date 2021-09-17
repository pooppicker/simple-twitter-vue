<template>
  <div class="container following-content">
    <div class="following">
      <div class="navbars">
        <!--navbar-->
        <NavBars />
      </div>
      <div>
        <!--middle of home-->
        <UserFollowingList
          :innitialFollowUser="followingUsers"
          :innitialUser="user"
        />
      </div>
      <div>
        <!--popular-->
        <Popular />
      </div>
    </div>
  </div>
</template>

<script>
import NavBars from "./../components/NavBars";
import UserFollowingList from "./../components/UserFollowingList";
import Popular from "./../components/Popular";
import UserAPI from "./../apis/users";
// @ is an alias to /src


export default {
  name: "UserFollowing",
  components: {
    NavBars,
    Popular,
    UserFollowingList,
  },
  data() {
    return {
      followingUsers: [],
      user: "",
    };
  },

  methods: {
    async fetchfollowingUsers(userID) {
      try {
        const response = await UserAPI.getUserfollowings({ userID });
        this.followingUsers = {
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
        console.log(error);
      }
    },
  },

  created() {
    const { id } = this.$route.params;
    this.fetchfollowingUsers(id);
    this.fetchUser(id);
  },
};
</script>

<style lang="scss">
@import "../assets/scss/efficientSetting.scss";
.following-content {
  height: 100vh;
  width: 100vw;
  //標示用
  outline: red 2px solid;
  .following {
    @extend %views-grid;
    //標示用
    // outline: green 2px solid;
    position: relative;
  }
}
</style>