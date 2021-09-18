<template>
  <!--下方推文區-->
  <div class="user-profile-area">
    <div v-for="tweet in tweets" :key="tweet.id">
      <div class="tweet-card d-flex">
        <router-link :to="{ name: 'User', params: { id: tweet.id } }">
          <img class="user-self-img" :src="tweet.User.avatar" />
        </router-link>
        <div class="tweet-detail">
          <div class="tweet-detail-title d-flex">
            <router-link :to="{ name: 'User', params: { id: tweet.id } }">
              <h5>{{ tweet.User.name }}</h5>
            </router-link>
            <p class="post-time">
              {{ tweet.User.account }}·{{ tweet.createdAt | fromNow }}
            </p>
          </div>
          <p class="tweet-detail-text">
            {{ tweet.description }}
          </p>
          <div class="tweet-detail-icon d-flex">
            <div class="reply-part d-flex" @click="handleOpenModal">
              <IconReply />
              <div class="icon-text">{{ tweet.RepliesCount }}</div>
            </div>
            <div class="liked-part d-flex">
              <div @click.stop.prevent="addHeart(tweet)">
                <IconHeartFilled v-if="tweet.isLike" />
                <IconHeartEmpty v-else />
              </div>
              <div class="icon-text">{{ tweet.LikesCount }}</div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <!--v-for結束-->
    <ReplyPostModal v-if="openModal" :onClose="handleCloseModal" />
  </div>
</template>

<script>
import IconReply from "./icons/IconReply.vue";
import IconHeartFilled from "./icons/IconHeartFilled.vue"
import IconHeartEmpty from "./icons/IconHeartEmpty.vue";
import { fromNowFilter } from "./../utils/mixins";
import ReplyPostModal from "./modal/ReplyPostModal.vue";
import userAPI from "../apis/users"
import { Toast } from "../utils/helpers"
import { mapState } from "vuex";


export default {
  mixins: [fromNowFilter],
  components: {
    IconReply,
    IconHeartEmpty,
    ReplyPostModal,
    IconHeartFilled
  },
  data() {
    return {
      tweets: [],
      openModal: false,
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchTweets(id);
  },
  methods: {
    //使用者的部分
    async fetchTweets(userID) {
      try {
        const response = await userAPI.getUserTweets({userID})
        this.tweets = {
          ...response.data
        };
        console.log('response',response)
      } catch (error) {
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '找不到使用者推文'
        })
      }
    },
    //點擊愛心功能
    addHeart(tweet) {
      tweet.isLike = !tweet.isLike;
    },
    handleOpenModal() {
      this.openModal = true;
    },
    handleCloseModal() {
      this.openModal = false;
    },
  },
  computed: {
    ...mapState(["currentUser"])
  }
};
</script>

<style lang="scss">
@import "../assets/scss/colorAndSize.scss";
@import "../assets/scss/efficientSetting.scss";

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
        &:hover {
          cursor: pointer;
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
</style>