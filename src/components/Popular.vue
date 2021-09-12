<template>
  <div class="card">
    <div class="card-content">
      <div class="card-header">
        Popular
        <hr />
      </div>

      <div class="card-body">
        <!--開始跑v-for迴圈處-->
        <div class="user-card" v-for="user in users" :key="user.id">
          <div class="user-info d-flex">
            <div class="user-detail d-flex">
              <img class="user-img" :src="user.avatar" />
              <div class="user">
                <p class="user-name">{{ user.name }}</p>
                <p class="user-account">{{ user.account }}</p>
              </div>
            </div>
            <div>
              <button v-if="user.isFollowed" class="btn btn-deletefollow">
                正在跟隨
              </button>
              <button v-else class="btn btn-addfollow">跟隨</button>
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

.card {
  border: black 2px solid;
  height: 100%;
  margin-right: 10px;
  .card-content {
    background-color: #f5f8fa;
    height: 756px;
    border-radius: 14px;
    margin: 14px;
    padding: 0 15px;
    //border: green 2px solid;
    .card-header {
      padding-top: 10px;
      margin-bottom: 10px;
      height: 45px;
      //border: purple 2px solid;
      color: $color-black;
      font-style: bold;
      font-size: 18px;
    }
    .card-body {
      flex: 1;
      height: 712px;
      //border: yellow 2px solid;
      .user-card {
        height: 10%;
        .user-info {
          justify-content: space-between;
          .user.name {
            font-size: 15px;
            font-style: bold;
            color: $color-black;
          }
          .user-account {
            font-size: 15px;
            font-style: bold;
            color: $color-gray;
          }

          .btn-addfollow,
          .btn-deletefollow {
            margin-top: 7px;
            width: 100%;
            height: 35px;
            font-size: 15px;
            background-color: $color-orange;
            color: white;
            border-radius: 100px;
            font-style: bold;

            &:hover {
              transform: scale(1.1, 1.1);
            }
          }
          .btn-addfollow {
            background-color: rgba(0, 0, 0, 0);
            border:solid 1px $color-orange;
            color: $color-orange
          }
        }
        .user-img {
          height: 50px;
          width: 50px;
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