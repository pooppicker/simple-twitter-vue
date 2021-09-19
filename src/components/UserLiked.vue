<template>
  <!--下方推文區-->
  <div class="user-profile-area">
    <div v-for="tweet in tweets" :key="tweet.TweetId">
      <div class="tweet-card d-flex">
        <router-link :to="{ name: 'User', params: { id: tweet.Likes.UserId } }">
          <img class="user-self-img" :src="tweet.User.avatar" />
        </router-link>
        <div class="tweet-detail">
          <div class="tweet-detail-title d-flex">
            <router-link :to="{ name: 'User', params: { id: tweet.User.id } }">
              <h5>{{ tweet.User.name }}</h5>
            </router-link>
            <p class="post-time">
              {{ tweet.User.account }}·{{ tweet.createdAt | fromNow }}
            </p>
          </div>
          <router-link
            :to="{ name: 'Reply-list', params: { id: tweet.TweetId } }"
          >
          <p class="tweet-detail-text">
            {{ tweet.description }}
          </p>
          </router-link>
          <div class="tweet-detail-icon d-flex">
            <div class="reply-part d-flex" @click="handleOpenModal">
              <IconReply />
              <div class="icon-text">{{ tweet.RepliesCount }}</div>
            </div>
            <div class="liked-part d-flex">
              <div v-if="tweet.isLike" @click.stop.prevent="cancelHeart(tweet)">
                <IconHeartFilled />
              </div>
              <div v-else @click.stop.prevent="addHeart(tweet)">
                <IconHeartEmpty />
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
import IconHeartEmpty from "./icons/IconHeartEmpty.vue";
import IconHeartFilled from "./icons/IconHeartFilled.vue";
import { fromNowFilter } from "./../utils/mixins";
import ReplyPostModal from "./modal/ReplyPostModal.vue";
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";
import TweetAPI from "./../apis/tweets";

export default {
  mixins: [fromNowFilter],
  components: {
    IconReply,
    IconHeartEmpty,
    IconHeartFilled,
    ReplyPostModal,
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
    async fetchTweets(userID) {
      try {
        const response = await userAPI.getUserLiked({ userID });
        this.tweets = {
          ...response.data,
        };
      } catch (error) {
        console.log(error.message);
        Toast.fire({
          icon: "error",
          title: "找不到喜歡的內容",
        });
      }
    },
     //點擊愛心功能
    async addHeart(tweet) {
      try {
        const { TweetId } = tweet;
        tweet.LikesCount = tweet.LikesCount + 1;
        tweet.isLike = !tweet.isLike;
        await TweetAPI.postTweetLiked({ tweetId: TweetId });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法加入喜歡的貼文，請稍後再試",
        });
        tweet.LikesCount = tweet.LikesCount - 1;
        tweet.isLike = !tweet.isLike;
      }
    },

    async cancelHeart(tweet) {
      try {
        const { TweetId } = tweet;
        tweet.LikesCount = tweet.LikesCount - 1;
        tweet.isLike = !tweet.isLike;
        await TweetAPI.postTweetUnliked({ tweetId: TweetId });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取消喜歡的貼文，請稍後再試",
        });
        tweet.LikesCount = tweet.LikesCount + 1;
        tweet.isLike = !tweet.isLike;
      }
    },
    handleOpenModal() {
      this.openModal = true;
    },
    handleCloseModal() {
      this.openModal = false;
    },
  },
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
        word-break: break-all;
      }

      .post-time {
        font-size: 15px;
        margin-left: 5px;
        color: $color-gray;
      }
      &-text {
        word-break: break-all;
        color: $color-black;
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

