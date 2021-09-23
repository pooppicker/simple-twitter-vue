<template>
  <div class="middle-of-follow">
    <div class="title-area">
      <div class="go-back" @click.stop.prevent="previousPage">
        <LeftArrow />
      </div>
      <div class="user-title">
        <h4 class="user-profile-name">{{ user.name  | accountLength}}</h4>
        <span class="span-setting">{{ user.TweetsCount }} 推文</span>
      </div>
      <hr />
    </div>

    <!-- Tabs -->
    <div class="follow-tabs">
      <router-link
        class="tab-follower-link"
        :to="{ name: 'User-follower', params: { id: user.id } }"
      >
        <div class="tab tab-follower">跟隨者</div>
      </router-link>
      <router-link
        class="tab-follower-link"
        :to="{ name: 'User-following', params: { id: user.id } }"
        ><div class="tab tab-following">正在跟隨</div></router-link
      >
    </div>

    <!-- 列表 -->

    <div class="tweets-part">
      <!--v-for開始-->
      <div
        v-for="followUser in followUsers"
        :key="
          followUser.followerId ? followUser.followerId : followUser.followingId
        "
      >
        <div class="tweet-card">
          <div class="follow-card-top d-flex">
            <!--照片-->
            <div>
              <router-link
                :to="{
                  name: 'User',
                  params: {
                    id: followUser.followerId
                      ? followUser.followerId
                      : followUser.followingId,
                  },
                }"
              >
                <img class="tweet-user-imag" :src="followUser.avatar" />
              </router-link>
            </div>
            <!--使用者資料-->
            <div class="follow-info">
              <div class="tweet-detail d-flex">
                <div class="tweet-detail-title">
                  <router-link
                    :to="{
                      name: 'User',
                      params: {
                        id: followUser.followerId
                          ? followUser.followerId
                          : followUser.followingId,
                      },
                    }"
                  >
                    <h5>{{ followUser.name }}</h5>
                  </router-link>
                  <p class="post-time">
                    @{{ followUser.account }}
                  </p>
                </div>
                <template
                  v-if="
                    currentUser.id !== followUser.followerId &&
                    currentUser.id !== followUser.followingId
                  "
                >
                  <button
                    v-if="followUser.isFollowed"
                    class="delete-follow-btn"
                    @click="cancelFollow(followUser)"
                  >
                    正在跟隨
                  </button>
                  <button
                    v-else
                    class="add-follow-btn"
                    @click="addFollow(followUser)"
                  >
                    跟隨
                  </button>
                </template>
              </div>
              <!--使用者內文-->

              <p class="tweet-detail-text">
                {{ followUser.introduction ? followUser.introduction : "" }}
              </p>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <!--v-for結束-->
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/scss/colorAndSize.scss";
@import "../assets/scss/efficientSetting.scss";

.middle-of-follow {
  height: 100vh;
  //outline: black 1px solid;
  overflow: scroll;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e6ecf0;
  //border-right: 1px solid #e6ecf0;
  margin-left: 2%;
  .title-area {
    z-index: 1;
    background-color: white;
    width: 100%;
    display: flex;
    padding: 0.7rem;
    position: fixed;
    .user-title {
      display: block;
      margin-left: 2rem;
      line-height: 1;
      .user-profile-name {
        font-size: 19px;
        color: $color-black;
      }
      .span-setting {
        font-size: 13px;
        color: $color-gray;
      }
    }
  }

  .follow-tabs {
    background-color: white;
    z-index: 1;
    width: 50%;
    top: 2em;
    padding-top: 1em;
    position: fixed;
    display: flex;
    border-bottom: 1px solid #e6ecf0;
    margin-top: 1.5rem;
    .tab {
      // outline: 1px solid black;
      padding: 0 2rem;
      padding-bottom: 0.5rem;
      font-weight: 700;
      font-size: 15px;
      color: $color-gray;
    }
    .tab-follower {
      padding-left: 3rem;
      font-weight: 700;
    }
    .router-link-exact-active {
      .tab {
        color: $color-orange;
      }

      border-bottom: 2px solid $color-orange;
    }
  }

  .tweets-part {
    margin-top: 7em;
    .tweet-card {
      margin-left: 15px;
      .follow-card-top {
        .tweet-user-imag {
          @extend %avatar-size;
          margin-right: 10px;
        }
        .follow-info {
          width: 100%;
          .tweet-detail {
            padding-right: 2%;
            width: 100%;
            // outline: black solid 1px;
            justify-content: space-between;
            h5 {
              color: $color-black;
            }
            .post-time {
              font-size: 15px;
              color: $color-gray;
              line-height: 15px;
            }

            .delete-follow-btn,
            .add-follow-btn {
              @extend %main-button;
              height: 25px;
              padding: 8px 15px;
              transform: translate(0, 0px);
            }
            .add-follow-btn {
              color: $color-orange;
              background-color: rgba(0, 0, 0, 0);
              border: $color-orange 1px solid;
            }
          }
          .tweet-detail-text {
            padding-bottom: 0.2em;
          }
        }
      }
    }
    .tweet-detail {
      &-text {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 6px 15px 0 0;
        line-height: 22px;
      }
    }
  }
}

//手機
@media screen and (max-width: 768px) {
  .middle-of-follow {
    width: 100%;
    width: 100vw;
    border-left: white 0px solid;
    margin-left: 0px;
    margin-right: 0px;
    .title-area {
      top: 3.7em;
      width: 100%;
      background-color: $color-orange;
  
    }
    .follow-tabs {
      width: 100%;
      top: 5.5em;
    }
    .tweets-part{
      margin-top: 11em;

    }
  }
}
</style>

<script>
import LeftArrow from "./../components/icons/IconBack.vue";
import UserAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex"; //新增這裡
import { popularAccountLengthFilter } from "./../utils/mixins";

export default {
  mixins: [popularAccountLengthFilter],
  props: {
    innitialFollowUser: {
      required: true,
    },
    innitialUser: {
      required: true,
    },
  },
  components: {
    LeftArrow,
  },

  data() {
    return {
      followUsers: [],
      user: "",
    };
  },

  methods: {
    fetchData() {
      this.followUsers = {
        ...this.innitialFollowUser,
      };
      this.user = {
        ...this.innitialUser,
      };
      console.log("this.followUsers", this.followUsers);
    },

    previousPage() {
      this.$router.back();
    },

    async addFollow(followUser) {
      try {
        followUser.isFollowed = true;
        await UserAPI.postFollowships({
          id: followUser.followerId
            ? followUser.followerId
            : followUser.followingId,
        });
        this.$store.commit("updateNewUser");
      } catch (error) {
        followUser.isFollowed = false;
        console.log(error);
        Toast.fire({
          icon: "warning",
          title: "追蹤失敗，請稍後再試",
        });
      }
    },
    async cancelFollow(followUser) {
      try {
        followUser.isFollowed = false;
        await UserAPI.deleteFollowships({
          followingId: followUser.followerId
            ? followUser.followerId
            : followUser.followingId,
        });
        this.$store.commit("updateNewUser");
        const { id } = this.$route.params;
        this.$emit("updateList", id);
      } catch (error) {
        followUser.isFollowed = true;
        console.log(error);
        Toast.fire({
          icon: "warning",
          title: "取消追蹤失敗，請稍後再試",
        });
      }
    },
  },

  created() {
    this.fetchData();
  },
  watch: {
    innitialFollowUser: {
      handler: function () {
        this.fetchData();
      },
      deep: true,
    },
    innitialUser: {
      handler: function () {
        this.fetchData();
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>