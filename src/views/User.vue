<template>
  <div class="container user-container">
    <div class="user-content">
      <div class="navbars">
        <!--navbar-->
        <NavBars />
      </div>
      <div class="user-top">
        <div class="title-area">
          <router-link to="/"><LeftArrow /></router-link>
          <div class="user-title">
            <h4 class="user-profile-name">{{ profile.name }}</h4>
            <span class="span-setting">25 推文</span>
          </div>
          <hr />
        </div>
        <!-- Cover Photo -->
        <div class="cover-area">
          <img class="cover-photo" :src="profile.cover" alt="cover" />
          <img class="user-avatar" :src="profile.avatar" alt="avatar" />
        </div>
        <!-- Images & btn-->
        <div class="edit-area">
          <button type="submit" class="user-edit-btn">編輯個人資料</button>
        </div>
        <!-- Description -->
        <div class="desc-area">
          <h4 class="user-profile-name">{{ profile.name }}</h4>
          <span class="span-setting">{{ profile.account }}</span>
          <p>
            {{ profile.introduction }}
          </p>
          <!-- followers -->
          <div class="follow-area">
            <router-link :to="{ name: 'User-following',params: {id: profile.id }}" class="user-follows"><strong>34 個</strong>跟隨中</router-link>
            <router-link :to="{ name: 'User-follower',params: {id: profile.id }}" class="user-followers"><strong>59 位</strong>跟隨者</router-link>
          </div>
        </div>
        <!-- Tabs -->
        <div class="user-tabs">
          <router-link :to="{ name: 'profile' }" active-class="tab-a" class="tab">
            推文
          </router-link>
          <router-link :to="{ name: 'Tweets' }" active-class="tab-a" class="tab">
            推文與回覆
          </router-link>
          <router-link :to="{ name: 'Liked' }" active-class="tab-a" class="tab">
            喜歡的內容
          </router-link>
        </div>
        <!-- user bottom area -->
        <router-view />
      </div>
      <div>
        <!--popular-->
        <Popular />
      </div>
    </div>
  </div>
</template>

<script>
import NavBars from "./../components/NavBars.vue";
import Popular from "./../components/Popular.vue";
import LeftArrow from "./../components/icons/IconBack.vue";

const dummyData = {
  profile: {
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
  },
};

export default {
  components: {
    NavBars,
    Popular,
    LeftArrow,
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
      },
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
  },
  methods: {
    fetchUser() {
      const { id, name, avatar, introduction, account, cover } =
        dummyData.profile;
      this.profile = {
        ...this.profile,
        id,
        name,
        avatar,
        introduction,
        account,
        cover,
      };
    },
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
    .user-edit-btn {
      margin: 1rem 1rem;
      border: solid 1px $color-orange;
      color: $color-orange;
      border-radius: 100px;
      width: 120px;
      height: 35px;
      font-weight: bold;
      font-size: 15px;
    }
  }
  .desc-area {
    margin: 1rem;
    p {
      margin: 0.5rem 0;
      color: $color-black;
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
    }
  }

  //電腦版
  @media screen and (min-width: 576px) {
    .middle-container {
      //outline: black 2px solid;
      height: 100vh;
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
</style>
