<template>
  <div class="middle-of-follow">
    <div class="title-area">
      <LeftArrow />
      <div class="user-title">
        <h4 class="user-profile-name">John Doe</h4>
        <span class="span-setting">25 推文</span>
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
                    {{ followUser.account }}
                  </p>
                </div>
                <button v-if="followUser.isFollowed" class="delete-follow-btn">
                  正在跟隨
                </button>
                <button v-else class="add-follow-btn">跟蹤</button>
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
  margin: 0 0 0 2%;
  .title-area {
     z-index: 1;
    background-color:white;
    width: 100%;
    display: flex;
    padding: 0.7rem;
    position:fixed;
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
    background-color:white;
    z-index: 1;
    width:50%;
    top:2em;
    position:fixed;
    display: flex;
    border-bottom: 1px solid #e6ecf0;
    margin-top: 1.5rem;
    .tab {
      // outline: 1px solid black;
      padding: 0 2rem;
      padding-bottom: 0.5rem;
      font-weight: 700;
      font-size: 15px;
    }
    .tab-follower {
      padding: 0 3rem;
      font-weight: 700;
      color: $color-gray;
    }
    .router-link-exact-active {
      color: $color-orange;
      border-bottom: 2px solid $color-orange;
    }
  }

  .tweets-part {
    margin-top: 6em;
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
        }
      }
    }
    .tweet-detail {
      &-text {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 6px 15px 0 0;
        line-height: 22px;
      }
    }
  }
}
</style>

<script>
import LeftArrow from "./../components/icons/IconBack.vue";

export default {
  props: {
    innitialFollowUser: {
      type: Array,
      required: true,
    },
    innitialUser: {
      type: Object,
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
    fetchUser() {
      this.followUsers = this.innitialFollowUser;
      this.user = this.innitialUser;
    },
  },

  created() {
    this.fetchUser();
  },
};
</script>