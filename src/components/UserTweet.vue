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
            <div class="reply-part d-flex">
              <IconReply />
              <div class="icon-text">{{ tweet.RepliesCount }}</div>
            </div>
            <div class="liked-part d-flex">
              <IconHeartEmpty />
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
import IconReply from "./icons/IconReply";
import IconHeartEmpty from "./icons/IconHeartEmpty";
import { fromNowFilter } from "./../utils/mixins";

const dummyTweets = [
  {
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description: "est",
    LikesCount: 2,
    RepliesCount: 2,
    isLike: true,
    User: {
      id: 2,
      name: "user1",
      avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
      account: "@user1",
    },
  },
];

export default {
  mixins: [fromNowFilter],
  components: {
    IconReply,
    IconHeartEmpty,
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