<template>
  <div class="container adminUsers-container">
    <!--上方使用者輸入區-->
    <h4>使用者列表</h4>
    <Spinner v-if="isProcessing" />
    <!--下方推文區-->
    <div class="adminUsers-part d-flex">
      <!--v-for開始-->
      <div class="adminUser-card" v-for="user in users" :key="user.id">
        <div class="adminUsers-image">
          <div class="adminUsers-avatar">
            <router-link :to="{ name: 'User', params: { id: user.id } }">
              <img :src="user.avatar" />
            </router-link>
          </div>
          <div class="adminUsers-coverimage">
            <img :src="user.cover" />
          </div>
        </div>
        <!--姓名資料-->
        <div class="adminUsers-info">
          <router-link :to="{ name: 'User', params: { id: user.id } }">
            <h5>{{ user.name | accountLength}}</h5>
          </router-link>
          <p>@{{ user.account }}</p>
        </div>
        <!--icon-->
        <div class="adminUsers-icon d-flex">
          <div class="adminUsers-message-icon d-flex">
            <IconLiked />
            <p>{{ user.TweetsCount }}</p>
          </div>
          <div class="adminUsers-heart-com d-flex">
            <IconHeartEmpty />
            <p>{{ user.LikesCount }}</p>
          </div>
        </div>

        <div class="adminUsers-follow d-flex">
          <div class="adminUsers-following">
            <router-link
              style="text-decoration: none; color: #1C1C1C"
              :to="{ name: 'User-following', params: { id: user.id } }"
            >
              {{ user.FollowingCount }}位<span>跟隨中</span>
            </router-link>
          </div>
          <div class="adminUsers-follower">
            <router-link
              style="text-decoration: none; color: #1C1C1C"
              :to="{ name: 'User-follower', params: { id: user.id } }"
            >
              {{ user.FollowersCount }}位<span>跟隨者</span>
            </router-link>
          </div>
        </div>
      </div>
      <!--v-for結束-->
    </div>
  </div>
</template>

<script>
//import IconDelete from "./../components/icons/IconDelete.vue";
import { fromNowFilter } from "./../utils/mixins";
import IconLiked from "./icons/IconLike";
import IconHeartEmpty from "./icons/IconHeartEmpty";
import adminAPI from "../apis/admin";
import Spinner from "./AdminSpinner.vue";
import { popularAccountLengthFilter } from "./../utils/mixins";

export default {
  components: {
    IconLiked,
    IconHeartEmpty,
    Spinner,
  },
  mixins: [fromNowFilter, popularAccountLengthFilter],
  data() {
    return {
      users: [],
      isProcessing: true,
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await adminAPI.adminGetUsers();
        this.users = {
          ...response.data,
        };
        this.isProcessing = false;
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>


<style lang="scss">
@import "../assets/scss/colorAndSize.scss";
@import "../assets/scss/efficientSetting.scss";

.adminUsers-container {
  border-left: 1px solid #e6ecf0;
  height: 100vh;
  margin-left: 2rem;
  //outline: black 1px solid;
  overflow: scroll;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  h4 {
    // outline: 1px solid black;
    position: fixed;
    z-index: 6;
    width: 60.1em;
    border-bottom: 1px solid #e6ecf0;
    font-size: 19px;
    padding: 0.7rem;
    background-color: white;
  }

  .adminUsers-part {
    margin-top: 3.8em;
    margin-left: 15px;
    flex-wrap: wrap;
    width: 100%;
    .adminUser-card {
      margin-bottom: 15px;
      margin-right: 15px;
      padding: 0 0 0 0;
      width: 245px;
      height: 312px;
      border-radius: 10px;
      overflow: hidden;
      background-color: #f6f7f8;
      .adminUsers-image {
        position: relative;
        width: 100%;
        .adminUsers-avatar {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 100%;
          overflow: hidden;
          border: white solid 4px;
          left: 72.5px;
          top: 68px;

          img {
            object-fit: cover;
          }
        }
        .adminUsers-coverimage {
          background-color: #c4c4c4;
          height: 140px;
          overflow: hidden;
        }
      }
      .adminUsers-info {
        width: 100%;
        margin-top: 33px;
        text-align: center;
        h5 {
          color: $color-black;
        }
        p {
          color: $color-gray;
          font-size: 15px;
        }
      }
      .adminUsers-icon {
        margin-top: 15px;
        justify-content: center;
        .adminUsers-message-icon {
          margin-right: 16px;
        }
        .home-tweets-icon {
          transform: translate(0, -3px);
          height: 19px;
        }
        p {
          font-size: 15px;
          color: $color-black;
          margin-left: 5px;
          transform: translate(0, -6px);
        }
      }
      .adminUsers-follow {
        margin-top: 20px;
        justify-content: center;
        font-size: 14px;
        color: $color-black;
        span {
          color: $color-gray;
        }
        .adminUsers-following {
          margin-right: 5px;
        }
      }
    }
  }
}

//手機板
@media screen and (max-width: 768px) {
  .adminUsers-container {
    width: 100%;
    width: 100vw;
    border-left: white 0px solid;

    margin: 0 auto;
    h4 {
      // outline: 1px solid black;
      position: fixed;
      z-index: 6;
      width: 60.1em;
      border-bottom: 1px solid #e6ecf0;
      font-size: 19px;
      padding: 0.7rem;
      background-color: $color-orange;
      color: white;
      top: 3em;
    }
    .adminUsers-part {
      margin-top: 7.5em;
      margin-left: 0px;
      padding: 0 10px;
      justify-content: center;
      .adminUser-card {
        margin: 0 10px 15px 10px;
      }
    }
  }
}
</style>
