<template>
  <div class="reply-list-area">
    <!-- Title -->
    <div class="title-area">
      <router-link to="/"><LeftArrow /></router-link>
      <div class="user-title">
        <h4 class="user-profile-name">推文</h4>
      </div>
      <hr />
    </div>
    <!-- Single Comment -->
    <div class="txt-area">
      <div class="image-and-name">
        <img
          class="user-sm-avatar"
          src="https://source.unsplash.com/1600x1200/?man/?random=15.46792589859454"
          alt="avatar"
        />
        <div class="name-account">
          <h4>Apple</h4>
          <span>@apple</span>
        </div>
      </div>
      <!-- paragraph and time -->
      <div class="para">
        <p>
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum.
        </p>
        <span>上午 10:05・2020年6月10日</span>
      </div>
      <!-- comments and likes -->
      <div class="comments-area">
        <div class="coms-amount"><strong>30 </strong>回覆</div>
        <div class="likes-amount"><strong>808 </strong>喜歡次數</div>
      </div>
      <!-- icons -->
      <div class="icons-area">
        <IconReply class="ic" />
        <IconHeartEmpty class="ic ic-right" />
      </div>
      <!-- Down Part -->
      <div class="user-replylist-area">
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
              <div class="user-reply-to">
                回覆
                <span class="user-reply-account">{{
                  tweet.Tweet.User.account
                }}</span>
              </div>
              <p class="tweet-detail-text">
                {{ tweet.comment }}
              </p>
            </div>
          </div>
          <hr />
        </div>
        <!--v-for結束-->
      </div>
    </div>
  </div>
</template>

<script>
import LeftArrow from "./../components/icons/IconBack.vue";
import IconReply from "./../components/icons/IconReply.vue";
import IconHeartEmpty from "./../components/icons/IconHeartEmpty.vue";
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
      avatar:
        "https://source.unsplash.com/1600x1200/?man/?random=40.46792589859454",
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
      avatar:
        "https://source.unsplash.com/1600x1200/?man/?random=40.46792589859454",
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
      avatar:
        "https://source.unsplash.com/1600x1200/?man/?random=40.46792589859454",
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
      avatar:
        "https://source.unsplash.com/1600x1200/?man/?random=40.46792589859454",
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
      avatar:
        "https://source.unsplash.com/1600x1200/?man/?random=40.46792589859454",
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
  components: {
    LeftArrow,
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

<style lang="scss">
@import "../assets/scss/colorAndSize.scss";
@import "../assets/scss/efficientSetting.scss";
.reply-list-area {
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
    padding: 0.7rem;
    display: flex;
    border-bottom: 1px solid #e6ecf0;
    .user-title {
      margin-left: 2rem;
    }
  }
  .txt-area {
    display: flex;
    flex-direction: column;
    margin-top: 3.2rem;
    padding: 1rem;
    .image-and-name {
      display: flex;
      img {
        margin-right: 1rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
      }
      h4 {
        font-size: 15px;
        font-weight: 700;
        color: $color-black;
      }
      span {
        font-size: 15px;
        color: $color-gray;
      }
    }
    .para {
      border-bottom: 1px solid #e6ecf0;
      padding-bottom: 1rem;
      p {
        margin: 1rem 0;
        width: 80%;
        height: 136px;
        font-size: 25px;
        line-height: 34px;
        color: $color-black;
      }
      span {
        font-size: 15px;
        color: $color-gray;
        padding-bottom: 1rem;
      }
    }
    .comments-area {
      display: flex;
      padding: 1.5rem 0;
      border-bottom: 1px solid #e6ecf0;
      color: $color-gray;
      font-size: 19px;
      strong {
        color: $color-black;
      }
      .coms-amount {
        cursor: pointer;
      }
      .likes-amount {
        margin-left: 2rem;
        cursor: pointer;
      }
    }
    .icons-area {
      display: flex;
      padding: 1.5rem 0;
      .ic {
        width: 28px;
        height: 28px;
      }
      .ic-right {
        margin-left: 10rem;
      }
    }
  }
}
.user-replylist-area {
  padding: 1rem 0;
  border-top: 1px solid #e6ecf0;
  // outline: 1px solid black;
  .tweet-card {
    margin-left: 15px;
    padding: .2rem 0;
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

//電腦版
@media screen and (min-width: 576px) {
  .middle-container {
    //outline: black 2px solid;
    height: 100vh;
  }
}
.user-profile-name {
  font-size: 18px;
  color: $color-black;
}
.span-setting {
  font-size: 13px;
  color: $color-gray;
}
</style>