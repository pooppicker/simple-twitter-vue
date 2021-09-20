<template>
  <div class="container adminUsers-container">
    <!--上方使用者輸入區-->
    <h4>使用者列表</h4>

    <!--下方推文區-->
    <div class="adminUsers-part d-flex">
      <!--v-for開始-->
      <div class="card adminUser-card" v-for="user in users" :key="user.id">
        <div class="adminUsers-image">
          <div class="adminUsers-avatar">
            <img
              :src="user.avatar"
            />
          </div>
          <div class="adminUsers-coverimage">
            <img
              :src="user.cover"
            />
          </div>
        </div>
        <!--姓名資料-->
        <div class="adminUsers-info">
          <h5>{{ user.name }}</h5>
          <p>{{ user.account }}</p>
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
            {{ user.FollowingCount }}位<span>跟隨中</span>
          </div>
          <div class="adminUsers-follower">
            {{ user.FollowersCount }}位<span>跟隨者</span>
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
import adminAPI from "../apis/admin"

export default {
  components: {
    IconLiked,
    IconHeartEmpty,
  },
  mixins: [fromNowFilter],
  // props: {
  //   innitialUsers: {
  //     type: Array,
  //   },
  // },
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      const response = await adminAPI.adminGetUsers()
      this.users = {
        ...response.data
      }
      console.log(response.data)
    }
  }
};
</script>


<style lang="scss">
@import "../assets/scss/colorAndSize.scss";
@import "../assets/scss/efficientSetting.scss";

.adminUsers-container {
  border-left: 1px solid #e6ecf0;
  height: 100vh;
  margin-left: 2%;
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
</style>
