<template>
  <div class="container user-container">
    <div class="user-content">
      <div class="navbars">
        <!--navbar-->
        <NavBars />
      </div>
      <div class="user-top">
        <UserSpinner v-if="isProcessing" />
        <template v-else>
          <div class="title-area">
            <div class="go-back" @click.stop.prevent="previousPage">
              <LeftArrow />
            </div>
            <div class="user-title">
              <h4 class="user-profile-name">{{ profile.name }}</h4>
              <span class="span-setting">{{ profile.TweetsCount }} 推文</span>
            </div>
            <hr />
          </div>
          <!-- Cover Photo -->
          <div class="cover-area">
            <img class="cover-photo" :src="profile.cover" alt="cover" />
            <img class="user-avatar" :src="profile.avatar" alt="avatar" />
          </div>
          <!-- Buttons -->
          <div class="edit-area">
            <button
              v-if="profile.isCurrent"
              id="show-modal"
              @click="handleOpenModal"
              type="submit"
              class="user-edit-btn"
            >
              編輯個人資料
            </button>
            <template v-else>
              <IconMsg class="other-user-btn" />
              <div
                v-if="!profile.isNotified"
                @click.stop.prevent="ChangeNotified"
              >
                <IconNotify class="other-user-btn" />
              </div>
              <div v-else @click.stop.prevent="ChangeNotified">
                <IconNotified class="other-user-btn" />
              </div>
              <button
                v-if="profile.isFollowed"
                class="btn btn-deletefollow"
                @click.prevent.stop="cancelFollow(profile)"
              >
                <h5>正在跟隨</h5>
              </button>
              <button
                v-else
                class="btn btn-addfollow"
                @click.prevent.stop="addFollow(profile)"
              >
                <h5>跟隨</h5>
              </button>
            </template>
          </div>

          <!-- Modal -->

          <CreateEditModal
            v-if="openModal"
            :onClose="handleCloseModal"
            @closeModal="handleCloseModal()"
            @after-submit="handleAfterSubmit"
          />

          <!-- Description -->
          <div class="desc-area">
            <h4 class="user-profile-name">{{ profile.name }}</h4>
            <span class="span-setting">@{{ profile.account }}</span>
            <p>
              {{ profile.introduction }}
            </p>
            <!-- followers -->
            <div class="follow-area">
              <router-link
                :to="{ name: 'User-following', params: { id: profile.id } }"
                class="user-follows"
                ><strong>{{ profile.FollowingCount }} 個</strong
                >跟隨中</router-link
              >
              <router-link
                :to="{ name: 'User-follower', params: { id: profile.id } }"
                class="user-followers"
                ><strong>{{ profile.FollowersCount }} 位</strong
                >跟隨者</router-link
              >
            </div>
          </div>
          <!-- Tabs -->
          <div class="user-tabs">
            <router-link
              :to="{ name: 'profile' }"
              active-class="tab-a"
              class="tab"
            >
              推文
            </router-link>
            <router-link
              :to="{ name: 'Tweets' }"
              active-class="tab-a"
              class="tab"
            >
              推文與回覆
            </router-link>
            <router-link
              :to="{ name: 'Liked' }"
              active-class="tab-a"
              class="tab"
            >
              喜歡的內容
            </router-link>
          </div>
          <!-- user bottom area -->
          <router-view />
        </template>
      </div>
      <div>
        <!--popular-->
        <Popular @updatefollower="fetchUser" />
        <p>hello</p>
      </div>
    </div>
  </div>
</template>

<script>
import NavBars from "./../components/NavBars.vue";
import Popular from "./../components/Popular.vue";
import LeftArrow from "./../components/icons/IconBack.vue";
import IconMsg from "./../components/icons/IconMsg.vue";
import IconNotify from "./../components/icons/IconNotify.vue";
import IconNotified from "./../components/icons/IconNotified.vue";
//import IconFollowing from "./../components/icons/IconFollowing.vue";
import CreateEditModal from "../components/modal/CreateEditModal.vue";
import UserSpinner from "../components/Userspinner.vue";
import UserAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    NavBars,
    Popular,
    LeftArrow,
    IconMsg,
    IconNotify,
    IconNotified,
    //IconFollowing,
    CreateEditModal,
    UserSpinner,
  },
  data() {
    return {
      profile: {
        id: -1,
        name: "",
        avatar: "",
        introduction: "",
        account: "",
        cover: "",
        TweetsCount: "",
        FollowersCount: "",
        FollowingCount: "",
        isCurrent: "",
        isFollowed: 0,
        isNotified: false, //這個應該要包在profile裡面，但目前還沒開放進階功能，所以資料結構沒有這個項目
      },
      isProcessing: true,
      openModal: false,
    };
  },

  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchUser(id);
    next();
  },
  methods: {
    async fetchUser(userID) {
      try {
        const response = await UserAPI.getUser({ userID });
        console.log(response);
        const {
          id,
          name,
          avatar,
          introduction,
          account,
          cover,
          TweetsCount,
          FollowersCount,
          FollowingCount,
          isCurrent,
          isFollowed,
        } = response.data;

        this.profile = {
          ...this.profile,
          id,
          name,
          avatar,
          introduction,
          account,
          cover,
          TweetsCount,
          FollowersCount,
          FollowingCount,
          isCurrent,
          isFollowed,
        };
        this.isProcessing = false;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法找到該使用者",
        });
      }
    },
    // 這個部分要找問題！
    async handleAfterSubmit(formData) {
      // 透過 API 將表單資料送到伺服器
      try {
        this.isProcessing = true;
        const response = await UserAPI.update({
          userId: this.profile.id,
          formData,
        });
        console.log("response", response);
        this.ChangePopularInfo();
        Toast.fire({
          icon: "success",
          title: "成功更新資料",
        });
        this.isProcessing = false;
        const { id } = this.$route.params;
        this.fetchUser(id); //重新更新使用者資料
        this.$store.dispatch("fetchCurrentUser"); //vuex同步更新
        this.handleCloseModal(); //關modal
        //this.$router.push({ name: 'Home'})
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法更新資料，請重試",
        });
      }
    },
    previousPage() {
      this.$router.back();
    },
    handleOpenModal() {
      this.openModal = true;
    },
    handleCloseModal() {
      this.openModal = false;
    },
    ChangeNotified() {
      this.profile.isNotified = !this.profile.isNotified;
    },
    async addFollow(profile) {
      try {
        profile.isFollowed = true;
        await UserAPI.postFollowships({
          id: profile.id,
        });
        this.ChangePopularInfo();
        const { id } = this.$route.params;
        this.fetchUser(id); //重新更新使用者資料
      } catch (error) {
        profile.isFollowed = false;
        console.log(error);
        Toast.fire({
          icon: "warning",
          title: "追蹤失敗，請稍後再試",
        });
      }
    },
    async cancelFollow(profile) {
      try {
        profile.isFollowed = false;
        await UserAPI.deleteFollowships({
          followingId: profile.id,
        });
        this.ChangePopularInfo();
        const { id } = this.$route.params;
        this.fetchUser(id); //重新更新使用者資料
      } catch (error) {
        profile.isFollowed = true;
        console.log(error);
        Toast.fire({
          icon: "warning",
          title: "取消追蹤失敗，請稍後再試",
        });
      }
    },
    ChangePopularInfo() {
      this.$store.commit("updateNewUser");
    },
  },
  watch: {
    isNewPost: {
      handler: function () {
        if (this.isNewPost) {
          const { id } = this.$route.params;
          this.fetchUser(id);
          this.$store.commit("updateNewPost");
        }
      },
      deep: true,
    },
  },

  computed: {
    ...mapState(["isNewPost"]),
  },
};
</script>

<style lang="scss">
@import "../assets/scss/colorAndSize.scss";
@import "../assets/scss/efficientSetting.scss";

.user-container {
  height: 100vh;
  width: 100vw;
  .user-content {
    @extend %views-grid;
  }
}
.user-top {
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e6ecf0;
  margin-left: 2%;
  overflow: scroll;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  .title-area {
    background-color: white;
    position: fixed;
    z-index: 3;
    width: 100%;
    display: flex;
    padding: 0.7rem;
    .user-title {
      display: block;
      margin-left: 2rem;
      line-height: 1;
      .user-profile-name {
        word-break: break-all;
      }
    }
  }
  .cover-area {
    margin-top: 3.5em;
    height: 250px;
    position: relative;
    cursor: pointer;
    img {
      object-fit: cover;
    }
    .user-avatar {
      position: absolute;
      top: 70%;
      left: 2%;
      width: 140px;
      height: 140px;
      border: 4px solid #ffffff;
      border-radius: 50%;
    }
  }
  .edit-area {
    display: flex;
    justify-content: end;
    margin: 1rem 1rem;

    .user-edit-btn {
      border: solid 1px $color-orange;
      color: $color-orange;
      border-radius: 100px;
      width: 120px;
      height: 35px;
      font-weight: bold;
      font-size: 15px;
      cursor: pointer;
    }
    .other-user-btn {
      margin-left: 0.6rem;
      cursor: pointer;
    }
    .btn-addfollow,
    .btn-deletefollow {
      margin-left: 0.6rem;
      @extend %main-button;
    }
    .btn-addfollow {
      background-color: rgba(0, 0, 0, 0);
      border: solid 1px $color-orange;
      color: $color-orange;
    }
  }
  .desc-area {
    margin: 1rem;
    p {
      margin: 0.5rem 0;
      color: $color-black;
    }
    .user-profile-name {
      word-break: break-all;
    }
    .follow-area {
      display: flex;
      cursor: pointer;
      .user-followers {
        margin-left: 1rem;
      }
      strong {
        color: $color-black;
        font-weight: 600;
      }
      .user-followers,
      .user-follows {
        color: $color-gray;
        font-weight: 500;
        font-size: 14px;
      }
    }
  }
  .user-tabs {
    display: flex;
    border-bottom: 1px solid #e6ecf0;
    .tab {
      // outline: 1px solid black;
      cursor: pointer;
      padding: 0 2rem;
      padding-bottom: 0.5rem;
      color: $color-gray;
      font-weight: 700;
      font-size: 15px;
    }
    .tab-a {
      color: $color-orange;
      border-bottom: 2px solid $color-orange;
      font-weight: 700;
    }
  }
  .user-profile-area {
    margin-top: 20px;
    .tweet-card {
      margin-left: 15px;
      .user-self-img {
        @extend %avatar-size;
        border-radius: 50%;
        margin-right: 10px;
      }
      .tweet-detail {
        h5 {
          word-break: break-all;
          color: $color-black;
        }

        .post-time {
          font-size: 15px;
          margin-left: 5px;
          color: $color-gray;
        }
        &-text {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 6px 15px 0 0;
        }
        &-icon {
          font-size: 13px;
          color: $color-gray;
          margin-top: 14px;
          .reply-part {
            margin-right: 51px;
          }
        }
        .icon-text {
          transform: translate(0, -3px);
          margin-left: 11px;
        }
      }
      .user-reply-to {
        color: $color-gray;
        .user-reply-account {
          color: $color-orange;
          cursor: pointer;
        }
      }
    }
  }
}
.user-profile-name {
  font-size: 19px;
  color: $color-black;
}
.span-setting {
  font-size: 13px;
  color: $color-gray;
}

//手機板
@media screen and (max-width: 768px) {
  .user-container {
    .user-content {
      grid-template-columns: 0fr 1fr 0fr;
    }
  }
  .user-top {
    margin-left: 0%;
    .cover-area {
      margin-top: 6em;
    }
    .title-area {
      top: 3.7em;
      width: 100%;
      background-color: $color-orange;
      color: white;
      position: fixed;
      z-index: 3;
      width: 100%;
      padding: 0.7rem;
      .user-title {
        display: block;
        margin-left: 2rem;
        line-height: 1;
      }
    }
  }
}
</style>
