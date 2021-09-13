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
            {{ tweet.comment }}
          </p>
          <div class="tweet-detail-icon d-flex">
            <div class="reply-part d-flex">
              <IconReply />
              <div class="icon-text">{{ tweet.RepliesCount }}</div>
            </div>
            <div class="liked-part d-flex">
              <IconHeartFilled v-if="tweet.isLike" />
              <IconHeartEmpty v-else />
              <div class="icon-text">{{ tweet.LikesCount }}</div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <!--v-for結束-->
  </div>
</template>

<script>
import IconReply from "./icons/IconReply.vue";
import IconHeartEmpty from "./icons/IconHeartEmpty.vue";
import IconHeartFilled from "./icons/IconHeartFilled.vue";
import { fromNowFilter } from "./../utils/mixins";

const dummyTweets = [
  {
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    LikesCount: 2,
    RepliesCount: 2,
    isLike: true,
    User: {
      id: 2,
      name: "Devon Lane",
      avatar: "https://source.unsplash.com/1600x1200/?man/?random=10.46792589859454",
      account: "@user1",
    },
  },
  {
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    LikesCount: 2,
    RepliesCount: 2,
    isLike: true,
    User: {
      id: 2,
      name: "Devon Lane",
      avatar: "https://source.unsplash.com/1600x1200/?man/?random=10.46792589859454",
      account: "@user1",
    },
  },
  {
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    LikesCount: 2,
    RepliesCount: 2,
    isLike: true,
    User: {
      id: 2,
      name: "Devon Lane",
      avatar: "https://source.unsplash.com/1600x1200/?man/?random=10.46792589859454",
      account: "@user1",
    },
  },
];
export default {
  mixins: [fromNowFilter],
  components: {
    IconReply,
    IconHeartEmpty,
    IconHeartFilled,
  },
  data() {
    return {
      tweets: [],
    };
  },

  methods: {
    fetchTweets() {
      this.tweets = dummyTweets;
    },
  },

  created() {
    this.fetchTweets();
  },
};
</script>
