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

const dummyTweets = [
  {
    id: 15,
    isLike: false,
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description: "Hi, this is John Doe",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "John Doe",
      avatar:
        "https://source.unsplash.com/1600x1200/?man/?random=38.46792589859454",
      account: "@heyjohn",
    },
  },
  {
    id: 15,
    isLike: false,
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description: "Hello Earth",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "user1",
      avatar:
        "https://source.unsplash.com/1600x1200/?man/?random=38.46792589859454",
      account: "@user1",
    },
  },
  {
    id: 15,
    isLike: false,
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description: "est",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "user1",
      avatar:
        "https://source.unsplash.com/1600x1200/?man/?random=38.46792589859454",
      account: "@user1",
    },
  },
  {
    id: 15,
    isLike: false,
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description: "Hi, this is John Doe",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "John Doe",
      avatar:
        "https://source.unsplash.com/1600x1200/?man/?random=38.46792589859454",
      account: "@heyjohn",
    },
  },
  {
    id: 15,
    isLike: false,
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description: "Hi, this is John Doe",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "John Doe",
      avatar:
        "https://source.unsplash.com/1600x1200/?man/?random=38.46792589859454",
      account: "@heyjohn",
    },
  },
];

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

  methods: {
    fetchTweets() {
      this.tweets = dummyTweets;
    },
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

  created() {
    this.fetchTweets();
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