<template>
  <div class="card">
    <div class="card-content">
      <div class="card-header">
        <h4 class="card-title">Popular</h4>
        <hr />
      </div>

      <div class="card-body">
        <!--開始跑v-for迴圈處-->
        <div class="user-card" v-for="user in users" :key="user.id">
          <div class="user-info d-flex">
            <div class="user-detail d-flex">
              <img class="user-img" :src="user.avatar" />
              <div class="user">
                <h5 class="user-name">{{ user.name }}</h5>
                <h5 class="user-account">{{ user.account }}</h5>
              </div>
            </div>
            <div>
              <button v-if="user.isFollowed" class="btn btn-deletefollow">
                <h5>正在跟隨</h5>
              </button>
              <button v-else class="btn btn-addfollow">
                <h5>跟隨</h5>
              </button>
            </div>
          </div>
          <hr v-if="user.id !== users[users.length - 1].id" />
        </div>
        <!--v-for迴圈結束處-->
      </div>
    </div>
  </div>
</template>

<style lang="scss" >
@import "../assets/scss/colorAndSize.scss";
@import "../assets/scss/efficientSetting.scss";

.card {
  outline: black 2px solid;
  height: 100%;
  margin-right: 20px;
  padding-top: 14px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .card-content {
    background-color: #f5f8fa;
    height: 770px;
    border-radius: 14px;
    padding-top: 14px;
    margin: 0 14px;
    // padding: 0 15px;
    //border: green 2px solid;
    .card-header {
      padding-top: 10px;
      margin-bottom: 10px;
      height: 45px;
      //border: purple 2px solid;
      color: $color-black;
      .card-title {
        margin-left: 15px;
        
      }
    }
    .card-body {
      flex: 1;
      height: 712px;
      //border: yellow 2px solid;
      .user-card {
        height: 10%;
        .user-info {
          margin: 0 15px;
          justify-content: space-between;
          .user.name {
            color: $color-black;
          }
          .user-account {
            color: $color-gray;
          }
          .btn-addfollow,
          .btn-deletefollow {
            margin-top: 7px;
            @extend %main-button;
          }
          .btn-addfollow {
            background-color: rgba(0, 0, 0, 0);
            border: solid 1px $color-orange;
            color: $color-orange;
          }
        }
        .user-img {
          @extend %avatar-size;
          margin-right: 15px;
        }
      }
    }
  }
}

hr {
  background-color: #e6ecf0;
  height: 1px;
  border: none;
}

//電腦版
@media screen and (min-width: 576px) {
.card {
 outline: black 2px solid;
  height: 100vh;
}
}
</style>

<script>
const dummyUsers = [
  {
    id: 3,
    name: "user2",
    account: "@user2",
    avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
    introduction: null,
    isFollowed: true,
    FollowerCount: 1,
  },
  {
    id: 4,
    name: "user3",
    account: "@user3",
    avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
    introduction: null,
    isFollowed: false,
    FollowerCount: 1,
  },
  {
    id: 4,
    name: "user3",
    account: "@user3",
    avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
    introduction: null,
    isFollowed: false,
    FollowerCount: 1,
  },
  {
    id: 4,
    name: "user3",
    account: "@user3",
    avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
    introduction: null,
    isFollowed: false,
    FollowerCount: 1,
  },
  {
    id: 4,
    name: "user3",
    account: "@user3",
    avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
    introduction: null,
    isFollowed: false,
    FollowerCount: 1,
  },
  {
    id: 4,
    name: "user3",
    account: "@user3",
    avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
    introduction: null,
    isFollowed: false,
    FollowerCount: 1,
  },
  {
    id: 4,
    name: "user3",
    account: "@user3",
    avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
    introduction: null,
    isFollowed: false,
    FollowerCount: 1,
  },
  {
    id: 4,
    name: "user3",
    account: "@user3",
    avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
    introduction: null,
    isFollowed: false,
    FollowerCount: 1,
  },
  {
    id: 4,
    name: "user3",
    account: "@user3",
    avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
    introduction: null,
    isFollowed: false,
    FollowerCount: 1,
  },
  {
    id: 8,
    name: "user3",
    account: "@user3",
    avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
    introduction: null,
    isFollowed: false,
    FollowerCount: 1,
  },
];

export default {
  data() {
    return {
      users: [],
    };
  },

  methods: {
    fetchUser() {
      this.users = dummyUsers;
    },
  },

  created() {
    this.fetchUser();
  },
};
</script>