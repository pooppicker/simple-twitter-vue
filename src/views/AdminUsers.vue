<template>
  <div class="container adminmain-content">
    <div class="adminmain">
      <div class="navbars">
        <!--navbar-->
        <AdminNavBars />
      </div>
      <div>
        <!--middle of home-->
        <AdminUsersList />
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavBars from "./../components/AdminNavBars";
import AdminUsersList from "./../components/AdminUsersList";
//import Popular from "./../components/Popular";
// @ is an alias to /src

// const dummyUsers = [
//     {
//         "id": 2,
//         "name": "user1",
//         "account": "@user1",
//         "avatar": "https://image.flaticon.com/icons/png/512/847/847969.png",
//         "cover": "https://images.unsplash.com/27/perspective.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 0,
//         "FollowersCount": 0,
//         "FollowingsCount": 0
//     },
//     {
//         "id": 3,
//         "name": "user2",
//         "account": "@user2",
//         "avatar": "https://i2.kknews.cc/SIG=t4a6t5/4r5r0002r2qo665o5699.jpg",
//         "cover": "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 2,
//         "FollowersCount": 3,
//         "FollowingsCount": 2
//     },
//     {
//         "id": 2,
//         "name": "user1",
//         "account": "@user1",
//         "avatar": "https://image.flaticon.com/icons/png/512/847/847969.png",
//         "cover": "https://images.unsplash.com/27/perspective.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 0,
//         "FollowersCount": 0,
//         "FollowingsCount": 0
//     },
//     {
//         "id": 3,
//         "name": "user2",
//         "account": "@user2",
//         "avatar": "https://i2.kknews.cc/SIG=t4a6t5/4r5r0002r2qo665o5699.jpg",
//         "cover": "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 2,
//         "FollowersCount": 3,
//         "FollowingsCount": 2
//     },
//     {
//         "id": 2,
//         "name": "user1",
//         "account": "@user1",
//         "avatar": "https://image.flaticon.com/icons/png/512/847/847969.png",
//         "cover": "https://images.unsplash.com/27/perspective.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 0,
//         "FollowersCount": 0,
//         "FollowingsCount": 0
//     },
//     {
//         "id": 3,
//         "name": "user2",
//         "account": "@user2",
//         "avatar": "https://i2.kknews.cc/SIG=t4a6t5/4r5r0002r2qo665o5699.jpg",
//         "cover": "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 2,
//         "FollowersCount": 3,
//         "FollowingsCount": 2
//     },
//     {
//         "id": 2,
//         "name": "user1",
//         "account": "@user1",
//         "avatar": "https://image.flaticon.com/icons/png/512/847/847969.png",
//         "cover": "https://images.unsplash.com/27/perspective.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 0,
//         "FollowersCount": 0,
//         "FollowingsCount": 0
//     },
//     {
//         "id": 3,
//         "name": "user2",
//         "account": "@user2",
//         "avatar": "https://i2.kknews.cc/SIG=t4a6t5/4r5r0002r2qo665o5699.jpg",
//         "cover": "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 2,
//         "FollowersCount": 3,
//         "FollowingsCount": 2
//     },
//     {
//         "id": 2,
//         "name": "user1",
//         "account": "@user1",
//         "avatar": "https://image.flaticon.com/icons/png/512/847/847969.png",
//         "cover": "https://images.unsplash.com/27/perspective.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 0,
//         "FollowersCount": 0,
//         "FollowingsCount": 0
//     },
//     {
//         "id": 3,
//         "name": "user2",
//         "account": "@user2",
//         "avatar": "https://i2.kknews.cc/SIG=t4a6t5/4r5r0002r2qo665o5699.jpg",
//         "cover": "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 2,
//         "FollowersCount": 3,
//         "FollowingsCount": 2
//     },
//     {
//         "id": 2,
//         "name": "user1",
//         "account": "@user1",
//         "avatar": "https://image.flaticon.com/icons/png/512/847/847969.png",
//         "cover": "https://images.unsplash.com/27/perspective.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 0,
//         "FollowersCount": 0,
//         "FollowingsCount": 0
//     },
//     {
//         "id": 3,
//         "name": "user2",
//         "account": "@user2",
//         "avatar": "https://i2.kknews.cc/SIG=t4a6t5/4r5r0002r2qo665o5699.jpg",
//         "cover": "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 2,
//         "FollowersCount": 3,
//         "FollowingsCount": 2
//     },
//     {
//         "id": 2,
//         "name": "user1",
//         "account": "@user1",
//         "avatar": "https://image.flaticon.com/icons/png/512/847/847969.png",
//         "cover": "https://images.unsplash.com/27/perspective.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 0,
//         "FollowersCount": 0,
//         "FollowingsCount": 0
//     },
//     {
//         "id": 3,
//         "name": "user2",
//         "account": "@user2",
//         "avatar": "https://i2.kknews.cc/SIG=t4a6t5/4r5r0002r2qo665o5699.jpg",
//         "cover": "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 2,
//         "FollowersCount": 3,
//         "FollowingsCount": 2
//     },
//     {
//         "id": 2,
//         "name": "user1",
//         "account": "@user1",
//         "avatar": "https://image.flaticon.com/icons/png/512/847/847969.png",
//         "cover": "https://images.unsplash.com/27/perspective.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 0,
//         "FollowersCount": 0,
//         "FollowingsCount": 0
//     },
    
//     {
//         "id": 3,
//         "name": "user2",
//         "account": "@user2",
//         "avatar": "https://i2.kknews.cc/SIG=t4a6t5/4r5r0002r2qo665o5699.jpg",
//         "cover": "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 2,
//         "FollowersCount": 3,
//         "FollowingsCount": 2
//     },
//     {
//         "id": 2,
//         "name": "user1",
//         "account": "@user1",
//         "avatar": "https://image.flaticon.com/icons/png/512/847/847969.png",
//         "cover": "https://images.unsplash.com/27/perspective.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 0,
//         "FollowersCount": 0,
//         "FollowingsCount": 0
//     },
//     {
//         "id": 3,
//         "name": "user2",
//         "account": "@user2",
//         "avatar": "https://i2.kknews.cc/SIG=t4a6t5/4r5r0002r2qo665o5699.jpg",
//         "cover": "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 2,
//         "FollowersCount": 3,
//         "FollowingsCount": 2
//     },
//     {
//         "id": 2,
//         "name": "user1",
//         "account": "@user1",
//         "avatar": "https://image.flaticon.com/icons/png/512/847/847969.png",
//         "cover": "https://images.unsplash.com/27/perspective.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 0,
//         "FollowersCount": 0,
//         "FollowingsCount": 0
//     },
//     {
//         "id": 3,
//         "name": "user2",
//         "account": "@user2",
//         "avatar": "https://i2.kknews.cc/SIG=t4a6t5/4r5r0002r2qo665o5699.jpg",
//         "cover": "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 2,
//         "FollowersCount": 3,
//         "FollowingsCount": 2
//     },
//     {
//         "id": 2,
//         "name": "user1",
//         "account": "@user1",
//         "avatar": "https://image.flaticon.com/icons/png/512/847/847969.png",
//         "cover": "https://images.unsplash.com/27/perspective.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 0,
//         "FollowersCount": 0,
//         "FollowingsCount": 0
//     },
//     {
//         "id": 3,
//         "name": "user2",
//         "account": "@user2",
//         "avatar": "https://i2.kknews.cc/SIG=t4a6t5/4r5r0002r2qo665o5699.jpg",
//         "cover": "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "TweetsCount": 10,
//         "LikesCount": 2,
//         "FollowersCount": 3,
//         "FollowingsCount": 2
//     },
// ]

export default {
  name: "AdminUsers",
  components: {
    AdminNavBars,
    AdminUsersList,
  },
  // data() {
  //   return {
  //     users: [],
  //   };
  // },

  // methods: {
  //   fetchUsers() {
  //     this.users = dummyUsers;
  //   },
  // },

  // created() {
  //   this.fetchUsers();
  // },
};
</script>

<style lang="scss">
@import "../assets/scss/efficientSetting.scss";
.adminmain-content {
  height: 100vh;
  width: 100vw;
  //標示用
  outline: red 2px solid;
  .adminmain {
    @extend %views-grid;
    grid-template-columns: 5fr 21.3fr;
    //標示用
    // outline: green 2px solid;
    position: relative;
  }
}
</style>
