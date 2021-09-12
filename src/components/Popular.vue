<template>
  <div class="card">
    <div class="card-content">
      <div class="card-header">popular</div>
      <hr />
      <div class="card-body">
        <!--開始跑v-for迴圈處-->
        <div v-for="user in users" :key="user.id">
          <div class="user-card d-flex">
            <div class="user-info d-flex">
              <img class="user-img" :src="user.avatar" />
              <div class="user-name">
                <p class="user-name">{{ user.name }}</p>
                <p class="user-account">{{ user.account }}</p>
              </div>
            </div>
            <div>
              <button v-if="user.isFollowed" class="btn btn-addfollow">
                正在跟隨
              </button>
              <button v-else class="btn btn-addfollow">跟隨</button>
            </div>
          </div>
          <hr />
        </div>
        <!--v-for迴圈結束處-->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  border: black 2px solid;
  height: 100%;
  margin-right: 10px;
  .card-content {
    background-color: #f5f8fa;
    height: 100%;
    border-radius: 14px;
    margin-top: 14px;
    .user-card {
      height: 70px;
      .user-img {
        height: 50px;
        width: 50px;
      }
    }
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
    id: 4,
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