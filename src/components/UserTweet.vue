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
          <div class="user-reply-to">回覆 <span class="user-reply-account">{{ tweet.Tweet.User.account }}</span></div>
          <p class="tweet-detail-text">
            {{ tweet.comment }}
          </p>
        </div>
      </div>
      <hr />
    </div>
    <!--v-for結束-->
  </div>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";

const dummyTweets = [
  {
    id: 10,
    TweetId: 4,
    comment: "sequi",
    createdAt: "2021-07-07T19:31:27.000Z",
    User: {
      id: 5,
      name: "user4",
      avatar: "https://source.unsplash.com/1600x1200/?man/?random=40.46792589859454",
      account: "@user4",
    },
    Tweet: {
      description: "fugiat",
      User: {
        id: 2,
        account: "@user",
      },
    },
  },
  {
    id: 10,
    TweetId: 4,
    comment: "sequi",
    createdAt: "2021-07-07T19:31:27.000Z",
    LikesCount: 99,
    RepliesCount: 40,
    isLike: false,
    User: {
      id: 5,
      name: "user4",
      avatar: "https://source.unsplash.com/1600x1200/?man/?random=40.46792589859454",
      account: "@user4",
    },
    Tweet: {
      description: "fugiat",
      User: {
        id: 2,
        account: "user1",
      },
    },
  },
  {
    id: 10,
    TweetId: 4,
    comment: "sequi",
    createdAt: "2021-07-07T19:31:27.000Z",
    LikesCount: 99,
    RepliesCount: 40,
    isLike: true,
    User: {
      id: 5,
      name: "user4",
      avatar: "https://source.unsplash.com/1600x1200/?man/?random=40.46792589859454",
      account: "@user4",
    },
    Tweet: {
      description: "fugiat",
      User: {
        id: 2,
        account: "user1",
      },
    },
  },
  {
    id: 10,
    TweetId: 4,
    comment: "sequi",
    createdAt: "2021-07-07T19:31:27.000Z",
    LikesCount: 99,
    RepliesCount: 40,
    isLike: false,
    User: {
      id: 5,
      name: "user4",
      avatar: "https://source.unsplash.com/1600x1200/?man/?random=40.46792589859454",
      account: "@user4",
    },
    Tweet: {
      description: "fugiat",
      User: {
        id: 2,
        account: "user1",
      },
    },
  },
  {
    id: 10,
    TweetId: 4,
    comment: "sequi",
    createdAt: "2021-07-07T19:31:27.000Z",
    LikesCount: 99,
    RepliesCount: 40,
    isLike: false,
    User: {
      id: 5,
      name: "user4",
      avatar: "https://source.unsplash.com/1600x1200/?man/?random=40.46792589859454",
      account: "@user4",
    },
    Tweet: {
      description: "fugiat",
      User: {
        id: 2,
        account: "user1",
      },
    },
  },
];

export default {
  mixins: [fromNowFilter],
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