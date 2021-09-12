<template>
  <div class="container middle-container">
    <div class="user-post-part">
      <div class="title-part">
      <div class="title">
        <h4>首頁</h4>
      </div>
      <hr />
      </div>
      <div class="user-post-panel d-flex flex-column">
        <div class="top-part d-flex">
          <img
            class="current-user-imag"
            src="https://image.flaticon.com/icons/png/512/847/847969.png"
          />
          <div class="input-post">
            <label class="post-label" for="post-input"></label>
            <input
              name="tweet"
              type="text"
              class="post-input"
              autofocus
              required
              placeholder="有什麼新鮮事?"
            />
          </div>
        </div>
        <div class="bottom-part">
          <button class="tweet-button">推文</button>
        </div>
      </div>
    </div>
    <div class="tweets-part">
      <!--v-for開始-->
      <div v-for="tweet in tweets" :key="tweet.TweetId">
        <div class="tweet-card d-flex">
          <img
            class="tweet-user-imag"
            src="https://image.flaticon.com/icons/png/512/847/847969.png"
          />
          <div class="tweet-detail">
            <div class="tweet-detail-title d-flex">
              <h5>{{ tweet.User.name }}</h5>
              <p class="post-time">{{tweet.User.account}}·{{ tweet.createdAt }}</p>
            </div>
            <p class="tweet-detail-text">
              {{tweet.description}}
            </p>
            <div class="tweet-detail-icon d-flex">
              <div class="reply-part d-flex">
                <IconLiked />
                <div class="icon-text">{{ tweet.RepliesCount }}</div>
              </div>
              <div class="liked-part d-flex">
                <IconHeartFilled v-if="tweet.isLike"/> <IconHeartEmpty v-else />
                <div class="icon-text">{{ tweet.LikesCount }}</div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <!--v-for結束-->
    </div>
  </div>
</template>

<script>
import IconLiked from "./icons/IconLike";
import IconHeartFilled from "./icons/IconHeartFilled";
import IconHeartEmpty from "./icons/IconHeartEmpty";

const dummyTweets = [
  {
    isLike: false,
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut maximus est. Phasellus placerat magna vitae iaculis blandit. Praesent luctus, lectus in blandit volutpat, neque lectus dictum erat, nec gravida nisl lectus ut turpis. Vivamus eget odio est. Nullam a neque eros. Nam molestie blandit erat nec ultricies. Nam eget velit cursus, ultrices elit quis, pellentesque nibh. Pellentesque sed leo dolor. Pellentesque porta aliquam ex vitae laoreet. Vestibulum bibendum auctor facilisis. Nullam faucibus lobortis ipsum quis ornare. Cras commodo nibh purus, in efficitur nunc interdum nec. Donec dignissim aliquam egestas. Ut sed erat leo.",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "user1",
      avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
      account: "@user1",
    },
  },
  {
    isLike: false,
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut maximus est. Phasellus placerat magna vitae iaculis blandit. Praesent luctus, lectus in blandit volutpat, neque lectus dictum erat, nec gravida nisl lectus ut turpis. Vivamus eget odio est. Nullam a neque eros. Nam molestie blandit erat nec ultricies. Nam eget velit cursus, ultrices elit quis, pellentesque nibh. Pellentesque sed leo dolor. Pellentesque porta aliquam ex vitae laoreet. Vestibulum bibendum auctor facilisis. Nullam faucibus lobortis ipsum quis ornare. Cras commodo nibh purus, in efficitur nunc interdum nec. Donec dignissim aliquam egestas. Ut sed erat leo.",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "user1",
      avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
      account: "@user1",
    },
  },
  {
    isLike: true,
    TweetId: 3,
    createdAt: "2021-07-07T19:31:27.000Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut maximus est. Phasellus placerat magna vitae iaculis blandit. Praesent luctus, lectus in blandit volutpat, neque lectus dictum erat, nec gravida nisl lectus ut turpis. Vivamus eget odio est. Nullam a neque eros. Nam molestie blandit erat nec ultricies. Nam eget velit cursus, ultrices elit quis, pellentesque nibh. Pellentesque sed leo dolor. Pellentesque porta aliquam ex vitae laoreet. Vestibulum bibendum auctor facilisis. Nullam faucibus lobortis ipsum quis ornare. Cras commodo nibh purus, in efficitur nunc interdum nec. Donec dignissim aliquam egestas. Ut sed erat leo.",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "user1",
      avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
      account: "@user1",
    },
  },
  {
    isLike: false,
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut maximus est. Phasellus placerat magna vitae iaculis blandit. Praesent luctus, lectus in blandit volutpat, neque lectus dictum erat, nec gravida nisl lectus ut turpis. Vivamus eget odio est. Nullam a neque eros. Nam molestie blandit erat nec ultricies. Nam eget velit cursus, ultrices elit quis, pellentesque nibh. Pellentesque sed leo dolor. Pellentesque porta aliquam ex vitae laoreet. Vestibulum bibendum auctor facilisis. Nullam faucibus lobortis ipsum quis ornare. Cras commodo nibh purus, in efficitur nunc interdum nec. Donec dignissim aliquam egestas. Ut sed erat leo.",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "user1",
      avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
      account: "@user1",
    },
  },
  {
    isLike: false,
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut maximus est. Phasellus placerat magna vitae iaculis blandit. Praesent luctus, lectus in blandit volutpat, neque lectus dictum erat, nec gravida nisl lectus ut turpis. Vivamus eget odio est. Nullam a neque eros. Nam molestie blandit erat nec ultricies. Nam eget velit cursus, ultrices elit quis, pellentesque nibh. Pellentesque sed leo dolor. Pellentesque porta aliquam ex vitae laoreet. Vestibulum bibendum auctor facilisis. Nullam faucibus lobortis ipsum quis ornare. Cras commodo nibh purus, in efficitur nunc interdum nec. Donec dignissim aliquam egestas. Ut sed erat leo.",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "user1",
      avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
      account: "@user1",
    },
  },
  {
    isLike: false,
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut maximus est. Phasellus placerat magna vitae iaculis blandit. Praesent luctus, lectus in blandit volutpat, neque lectus dictum erat, nec gravida nisl lectus ut turpis. Vivamus eget odio est. Nullam a neque eros. Nam molestie blandit erat nec ultricies. Nam eget velit cursus, ultrices elit quis, pellentesque nibh. Pellentesque sed leo dolor. Pellentesque porta aliquam ex vitae laoreet. Vestibulum bibendum auctor facilisis. Nullam faucibus lobortis ipsum quis ornare. Cras commodo nibh purus, in efficitur nunc interdum nec. Donec dignissim aliquam egestas. Ut sed erat leo.",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "user1",
      avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
      account: "@user1",
    },
  },
];

export default {
  components: {
    IconLiked,
    IconHeartFilled,
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

.middle-container {
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
  height: 100%;
  margin: 0 2%;
  padding-top: 14px;
  //outline: black 1px solid;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  position: relative;
  .title-part{

  .title {
    margin-left: 10px;
  }
  }
  .user-post-panel {
    height: 120px;
    border-bottom: solid #e6ecf0 10px;
    justify-content: space-between;
    z-index: 5;
    .top-part {
      .current-user-imag {
        margin-top: 9px;
        margin-left: 15px;
        @extend %avatar-size;
      }
      .input-post {
        flex: 1;
        margin-left: 10px;
        margin-top: 20px;
        .post-input {
          font-size: 18px;
          flex: 1;
          width: 100%;
        }
      }
    }
    .bottom-part {
      text-align: right;
      .tweet-button {
        @extend %main-button;
        font-size: 18px;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
  }
  .tweets-part {
    margin-top: 20px;
    .tweet-card {
      margin-left: 15px;
      .tweet-user-imag {
        @extend %avatar-size;
        margin-right: 10px;
      }
      .tweet-detail {
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
}

//電腦版
@media screen and (min-width: 576px) {
  .middle-container {
    //outline: black 2px solid;
    height: 100vh;
  }
}
</style>
