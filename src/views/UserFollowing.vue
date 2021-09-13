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
      :innitialFollowUser ="followingUser"
       :innitialUser ="user" />
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
    "isFollowed": true,
    "followingId": 6,
    "name": "user6",
    "avatar": "https://source.unsplash.com/1600x1200/?man/?random=38.46792589859454",
    "introduction": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a faucibus quam, a dictum arcu. Ut a dictum orci. Vestibulum malesuada dui non magna porta, at eleifend ligula iaculis. Nam venenatis sollicitudin justo. Nulla lacinia felis vitae consectetur congue. Proin in sapien lectus. Fusce sed mauris vitae sem faucibus viverra. Phasellus dolor eros, rhoncus et neque at, tincidunt accumsan ligula. Vestibulum sed metus velit. Proin lacus mauris, hendrerit in semper ut, laoreet id arcu. Integer tincidunt massa ac maximus tempus. Aenean eget diam vel eros congue dignissim. Nulla posuere varius nulla sit amet vestibulum. Vestibulum dapibus aliquet magna vel eleifend. Sed egestas molestie elit, sed fringilla mauris.",
    "account": "@user6"
  },
    {
    "isFollowed": false,
    "followingId": 5,
    "name": "user5",
    "avatar": "https://image.flaticon.com/icons/png/512/528/528098.png",
    "introduction": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a faucibus quam, a dictum arcu. Ut a dictum orci. Vestibulum malesuada dui non magna porta, at eleifend ligula iaculis. Nam venenatis sollicitudin justo. ",
    "account": "@user5"
  },{
    "isFollowed": true,
    "followingId": 5,
    "name": "user5",
    "avatar": "https://image.flaticon.com/icons/png/512/528/528098.png",
    "introduction": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a faucibus quam, a dictum arcu. Ut a dictum orci. Vestibulum malesuada dui non magna porta, at eleifend ligula iaculis. Nam venenatis sollicitudin justo. ",
    "account": "@user5"
  },{
    "isFollowed": false,
    "followingId": 5,
    "name": "user5",
    "avatar": "https://image.flaticon.com/icons/png/512/528/528098.png",
    "introduction": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a faucibus quam, a dictum arcu. Ut a dictum orci. Vestibulum malesuada dui non magna porta, at eleifend ligula iaculis. Nam venenatis sollicitudin justo. ",
    "account": "@user5"
  },{
    "isFollowed": true,
    "followingId": 5,
    "name": "user5",
    "avatar": "https://image.flaticon.com/icons/png/512/528/528098.png",
    "introduction": null,
    "account": "@user5"
  },{
    "isFollowed": false,
    "followingId": 5,
    "name": "user5",
    "avatar": "https://image.flaticon.com/icons/png/512/528/528098.png",
    "introduction": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a faucibus quam, a dictum arcu. Ut a dictum orci. Vestibulum malesuada dui non magna porta, at eleifend ligula iaculis. Nam venenatis sollicitudin justo. ",
    "account": "@user5"
  },{
    "isFollowed": true,
    "followingId": 5,
    "name": "user5",
    "avatar": "https://image.flaticon.com/icons/png/512/528/528098.png",
    "introduction": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a faucibus quam, a dictum arcu. Ut a dictum orci. Vestibulum malesuada dui non magna porta, at eleifend ligula iaculis. Nam venenatis sollicitudin justo. ",
    "account": "@user5"
  },{
    "isFollowed": true,
    "followingId": 5,
    "name": "user5",
    "avatar": "https://image.flaticon.com/icons/png/512/528/528098.png",
    "introduction": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a faucibus quam, a dictum arcu. Ut a dictum orci. Vestibulum malesuada dui non magna porta, at eleifend ligula iaculis. Nam venenatis sollicitudin justo. ",
    "account": "@user5"
  },{
    "isFollowed": false,
    "followingId": 5,
    "name": "user5",
    "avatar": "https://image.flaticon.com/icons/png/512/528/528098.png",
    "introduction": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a faucibus quam, a dictum arcu. Ut a dictum orci. Vestibulum malesuada dui non magna porta, at eleifend ligula iaculis. Nam venenatis sollicitudin justo. ",
    "account": "@user5"
  },{
    "isFollowed": false,
    "followingId": 5,
    "name": "user5",
    "avatar": "https://image.flaticon.com/icons/png/512/528/528098.png",
    "introduction": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a faucibus quam, a dictum arcu. Ut a dictum orci. Vestibulum malesuada dui non magna porta, at eleifend ligula iaculis. Nam venenatis sollicitudin justo. ",
    "account": "@user5"
  },

]

const dummyUser = {
  "id": 3,
  "email": "user2@example.com",
  "password": "secretpassword",
  "name": "user2",
  "avatar": "https://i2.kknews.cc/SIG=t4a6t5/4r5r0002r2qo665o5699.jpg",
  "introduction":" nul",
  "role": "user",
  "account": "user2",
  "cover": "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  "createdAt": "2021-07-04T17:03:01.000Z",
  "updatedAt": "2021-07-04T17:03:01.000Z"
}


export default {
  name: "UserFollowing",
  components: {
    NavBars,
    Popular,
    UserFollowingList
  },
  data() {
    return {
      followingUser:[],
      user:"",
    }

  },

  methods: {
    fetchData() {
      this.followingUser = dummyData
      this.user = dummyUser

    }
  },

  created() {
    this.fetchData()
  }
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