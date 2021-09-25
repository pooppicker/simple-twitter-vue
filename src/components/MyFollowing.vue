<template>
  <div class="card">
    <div class="card-content">
      <div class="card-header">
        <h4 class="card-title">跟隨誰</h4>
        <hr />
      </div>

      <div class="card-body">
        <!--開始跑v-for迴圈處-->
        <div class="user-card" v-for="user in users" :key="user.id">
          <div class="user-info d-flex">
            <div class="user-detail d-flex">
              <router-link :to="{ name: 'User', params: { id: user.id } }">
                <img class="user-img" :src="user.avatar" />
              </router-link>
              <div class="user">
                <router-link :to="{ name: 'User', params: { id: user.id } }">
                  <h5 class="user-name">{{ user.name | nameLength }}</h5>
                  <h5 class="user-account">
                    @{{ user.account | accountLength }}
                  </h5>
                </router-link>
              </div>
            </div>
            <div v-if="user.id !== currentUser.id">
              <button
                v-if="user.isFollowed"
                class="btn btn-deletefollow"
                @click.prevent.stop="cancelFollow(user)"
              >
                <h5>正在跟隨</h5>
              </button>
              <button
                v-else
                class="btn btn-addfollow"
                @click.prevent.stop="addFollow(user)"
              >
                <h5>跟隨</h5>
              </button>
            </div>
          </div>
          <hr v-if="user.id !== users[9].id" />
        </div>
        <!--v-for迴圈結束處-->
      </div>
    </div>
  </div>
</template>

<script>
import UserAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
import { popularNameLengthFilter } from "./../utils/mixins";
import { popularAccountLengthFilter } from "./../utils/mixins";

export default {
  mixins: [popularNameLengthFilter, popularAccountLengthFilter],
  data() {
    return {
      users: [],
    };
  },

  methods: {
    async fetchUser() {
      try {
        const response = await UserAPI.getTopUsers();
        this.users = {
          ...response.data,
        };
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "warning",
          title: "資料載入錯誤，請稍後再試",
        });
      }
    },

    async cancelFollow(user) {
      try {
        user.isFollowed = false;

        await UserAPI.deleteFollowships({
          followingId: user.id,
        });
        this.fetchUser();

        const { id } = this.$route.params;
        this.$emit("updatefollower", id);
      } catch (error) {
        user.isFollowed = true;
        console.log(error);
        Toast.fire({
          icon: "warning",
          title: "取消追蹤失敗，請稍後再試",
        });
      }
    },

    async addFollow(user) {
      try {
        user.isFollowed = true;
        await UserAPI.postFollowships({
          id: user.id,
        });
        this.fetchUser();
        const { id } = this.$route.params;
        this.$emit("updatefollower", id);
      } catch (error) {
        user.isFollowed = false;
        console.log(error);
        Toast.fire({
          icon: "warning",
          title: "追蹤失敗，請稍後再試",
        });
      }
    },
  },

  created() {
    this.fetchUser();
  },
  computed: {
    ...mapState(["currentUser", "isNewUser"]),
  },
  watch: {
    //監聽使用者資料有沒有改變
    isNewUser: {
      handler: function () {
        if (this.isNewUser) {
          this.fetchUser();
          this.$store.commit("updateNewUser");
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/colorAndSize.scss";
@import "../assets/scss/efficientSetting.scss";

.card {
  // outline: black 2px solid;
  border-left: 1px solid #e6ecf0;
  position: relative;
  background-color: white;
  z-index: 5;
  height: 100vh;
  margin-right: 20px;
  padding-left: 2%;
  padding-top: 14px;
  overflow: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  .card-content {
    background-color: #f5f8fa;
    min-height: 770px;
    border-radius: 14px;
    padding-top: 14px;
    margin: 0 14px;
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
        min-height: 10%;

        .user-info {
          margin: 0 15px;
          justify-content: space-between;
          .user {
            //width: 50%;
            .user-name {
              width: 100%;

              color: $color-black;
              word-break: break-all;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .user-account {
              color: $color-gray;
              word-break: break-all;
            }
          }

          .btn-addfollow,
          .btn-deletefollow {
            margin-top: 7px;
            @extend %main-button;
            white-space: nowrap;
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

//手機版

@media screen and (max-width: 1200px) {
  .card {
    .btn {
      display: none;
    }
  }
}
@media screen and (max-width: 768px) {
  .card {
    display: none;
  }
}
</style>