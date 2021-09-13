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
          :innitialFollowUser="followingUser"
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
// @ is an alias to /src

const dummyData = [
  {
    isFollowed: true,
    followerId: 6,
    name: "user6",
    avatar: "https://source.unsplash.com/1600x1200/?man",
    introduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a faucibus quam, a dictum arcu. Ut a dictum orci. Vestibulum malesuada dui non magna porta, at eleifend ligula iaculis. Nam venenatis sollicitudin justo. Nulla lacinia felis vitae consectetur congue. Proin in sapien lectus. Fusce sed mauris vitae sem faucibus viverra. Phasellus dolor eros, rhoncus et neque at, tincidunt accumsan ligula. Vestibulum sed metus velit. Proin lacus mauris, hendrerit in semper ut, laoreet id arcu. Integer tincidunt massa ac maximus tempus. Aenean eget diam vel eros congue dignissim. Nulla posuere varius nulla sit amet vestibulum. Vestibulum dapibus aliquet magna vel eleifend. Sed egestas molestie elit, sed fringilla mauris.",
    account: "@user6",
  },
  {
    isFollowed: true,
    followerId: 6,
    name: "user6",
    avatar: "https://source.unsplash.com/1600x1200/?man",
    introduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a faucibus quam, a dictum arcu. Ut a dictum orci. Vestibulum malesuada dui non magna porta, at eleifend ligula iaculis. Nam venenatis sollicitudin justo. Nulla lacinia felis vitae consectetur congue. Proin in sapien lectus. Fusce sed mauris vitae sem faucibus viverra. Phasellus dolor eros, rhoncus et neque at, tincidunt accumsan ligula. Vestibulum sed metus velit. Proin lacus mauris, hendrerit in semper ut, laoreet id arcu. Integer tincidunt massa ac maximus tempus. Aenean eget diam vel eros congue dignissim. Nulla posuere varius nulla sit amet vestibulum. Vestibulum dapibus aliquet magna vel eleifend. Sed egestas molestie elit, sed fringilla mauris.",
    account: "@user6",
  },
  {
    isFollowed: true,
    followerId: 6,
    name: "user6",
    avatar: "https://source.unsplash.com/1600x1200/?man",
    introduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a faucibus quam, a dictum arcu. Ut a dictum orci. Vestibulum malesuada dui non magna porta, at eleifend ligula iaculis. Nam venenatis sollicitudin justo. Nulla lacinia felis vitae consectetur congue. Proin in sapien lectus. Fusce sed mauris vitae sem faucibus viverra. Phasellus dolor eros, rhoncus et neque at, tincidunt accumsan ligula. Vestibulum sed metus velit. Proin lacus mauris, hendrerit in semper ut, laoreet id arcu. Integer tincidunt massa ac maximus tempus. Aenean eget diam vel eros congue dignissim. Nulla posuere varius nulla sit amet vestibulum. Vestibulum dapibus aliquet magna vel eleifend. Sed egestas molestie elit, sed fringilla mauris.",
    account: "@user6",
  },
  {
    isFollowed: true,
    followerId: 6,
    name: "user6",
    avatar: "https://source.unsplash.com/1600x1200/?man",
    introduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a faucibus quam, a dictum arcu. Ut a dictum orci. Vestibulum malesuada dui non magna porta, at eleifend ligula iaculis. Nam venenatis sollicitudin justo. Nulla lacinia felis vitae consectetur congue. Proin in sapien lectus. Fusce sed mauris vitae sem faucibus viverra. Phasellus dolor eros, rhoncus et neque at, tincidunt accumsan ligula. Vestibulum sed metus velit. Proin lacus mauris, hendrerit in semper ut, laoreet id arcu. Integer tincidunt massa ac maximus tempus. Aenean eget diam vel eros congue dignissim. Nulla posuere varius nulla sit amet vestibulum. Vestibulum dapibus aliquet magna vel eleifend. Sed egestas molestie elit, sed fringilla mauris.",
    account: "@user6",
  },
  {
    isFollowed: true,
    followerId: 6,
    name: "user6",
    avatar: "https://source.unsplash.com/1600x1200/?man",
    introduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a faucibus quam, a dictum arcu. Ut a dictum orci. Vestibulum malesuada dui non magna porta, at eleifend ligula iaculis. Nam venenatis sollicitudin justo. Nulla lacinia felis vitae consectetur congue. Proin in sapien lectus. Fusce sed mauris vitae sem faucibus viverra. Phasellus dolor eros, rhoncus et neque at, tincidunt accumsan ligula. Vestibulum sed metus velit. Proin lacus mauris, hendrerit in semper ut, laoreet id arcu. Integer tincidunt massa ac maximus tempus. Aenean eget diam vel eros congue dignissim. Nulla posuere varius nulla sit amet vestibulum. Vestibulum dapibus aliquet magna vel eleifend. Sed egestas molestie elit, sed fringilla mauris.",
    account: "@user6",
  },
  {
    isFollowed: true,
    followerId: 6,
    name: "user6",
    avatar: "https://source.unsplash.com/1600x1200/?man",
    introduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a faucibus quam, a dictum arcu. Ut a dictum orci. Vestibulum malesuada dui non magna porta, at eleifend ligula iaculis. Nam venenatis sollicitudin justo. Nulla lacinia felis vitae consectetur congue. Proin in sapien lectus. Fusce sed mauris vitae sem faucibus viverra. Phasellus dolor eros, rhoncus et neque at, tincidunt accumsan ligula. Vestibulum sed metus velit. Proin lacus mauris, hendrerit in semper ut, laoreet id arcu. Integer tincidunt massa ac maximus tempus. Aenean eget diam vel eros congue dignissim. Nulla posuere varius nulla sit amet vestibulum. Vestibulum dapibus aliquet magna vel eleifend. Sed egestas molestie elit, sed fringilla mauris.",
    account: "@user6",
  },
  {
    isFollowed: true,
    followerId: 6,
    name: "user6",
    avatar: "https://source.unsplash.com/1600x1200/",
    introduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a faucibus quam, a dictum arcu. Ut a dictum orci. Vestibulum malesuada dui non magna porta, at eleifend ligula iaculis. Nam venenatis sollicitudin justo. Nulla lacinia felis vitae consectetur congue. Proin in sapien lectus. Fusce sed mauris vitae sem faucibus viverra. Phasellus dolor eros, rhoncus et neque at, tincidunt accumsan ligula. Vestibulum sed metus velit. Proin lacus mauris, hendrerit in semper ut, laoreet id arcu. Integer tincidunt massa ac maximus tempus. Aenean eget diam vel eros congue dignissim. Nulla posuere varius nulla sit amet vestibulum. Vestibulum dapibus aliquet magna vel eleifend. Sed egestas molestie elit, sed fringilla mauris.",
    account: "@user6",
  },
];
const dummyUser = {
  id: 3,
  email: "user2@example.com",
  password: "secretpassword",
  name: "John Doe",
  avatar:
    "https://source.unsplash.com/1600x1200/?man/?random=38.46792589859454",
  introduction:
    "Amet minim mollit non deserunt ullamco est sit aliqua dolor do ametsint.",
  role: "user",
  account: "@heyjohn",
  cover:
    "https://source.unsplash.com/1600x900/?nature/?random=79.00129583279121",
  createdAt: "2021-07-04T17:03:01.000Z",
  updatedAt: "2021-07-04T17:03:01.000Z",
};

export default {
  name: "UserFollower",
  components: {
    NavBars,
    Popular,
    UserFollowingList,
  },
  data() {
    return {
      followingUser: [],
      user: "",
    };
  },

  methods: {
    fetchData() {
      this.followingUser = dummyData;
      this.user = dummyUser;
    },
  },

  created() {
    this.fetchData();
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
</style>