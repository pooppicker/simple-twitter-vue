<template>
  <div class="container middle-container">
    <!--上方使用者輸入區-->
    <h4>首頁</h4>
    <div class="user-post-part">
      <form class="user-post-panel d-flex flex-column">
        <div class="top-part d-flex" @submit.stop.prevent="handleSubmit">
          <img
            class="current-user-imag"
            src="https://image.flaticon.com/icons/png/512/847/847969.png"
          />
        
          <div class="input-post">
            <label class="post-label" for="post-input"></label>
            <textarea
              name="text"
              row="4"
              type="text"
              class="post-input"
               maxLength="140"
              required
              placeholder="有什麼新鮮事?"
              v-model="tweetText"
            />
          </div>
        </div>
        <div class="bottom-part">
          <span v-if="tweetText.length===140" class="input-error">字數不可超過140字</span>
          <button class="tweet-button" type="submit" :disabled="tweetText.trim().length===0">推文</button>
        </div>
      
      </form>
    </div>
    <!--下方推文區-->
    <div class="tweets-part">
      <!--v-for開始-->
      <div v-for="tweet in tweets" :key="tweet.TweetId">
        <div class="tweet-card d-flex">
          <router-link :to="{ name: 'User', params: { id: tweet.User.id } }">
            <img class="tweet-user-imag" :src="tweet.User.avatar" />
          </router-link>
          <div class="tweet-detail">
            <div class="tweet-detail-title d-flex">
              <router-link
                :to="{ name: 'User', params: { id: tweet.User.id } }"
              >
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
                
                <IconLiked />
                <div class="icon-text">{{ tweet.RepliesCount }}</div>
              </div>
              
              <div class="liked-part d-flex">
                <div @click.stop.prevent="addHeart(tweet)">
                  <IconHeartFilled v-if="tweet.isLike" />
                  <IconHeartEmpty
                    v-else
                  />
                </div>
                <div class="icon-text">{{ tweet.LikesCount }}</div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <!--v-for結束-->
    </div>
    <ReplyPostModal v-if="openModal" :onClose="handleCloseModal" />
  </div>
</template>

<script>
import IconLiked from "./icons/IconLike";
import IconHeartFilled from "./icons/IconHeartFilled";
import IconHeartEmpty from "./icons/IconHeartEmpty";
import { fromNowFilter } from "./../utils/mixins";
import ReplyPostModal from "./modal/ReplyPostModal.vue";

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
  mixins: [fromNowFilter],
  components: {
    IconLiked,
    IconHeartFilled,
    IconHeartEmpty,
    ReplyPostModal
  },
  data() {
    return {
      tweets: [],
      tweetText: "",
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

    handleSubmit() {
      this.tweets.unshift({});
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

.middle-container {
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
    z-index: 5;
    position: fixed;
    width: 40em;
    border-bottom: 1px solid #e6ecf0;
    font-size: 19px;
    padding: 0.7rem;
    background-color: white;
  }

  .user-post-panel {
    display: relative;
    padding-bottom: 10px;
    margin-top: 3.2em;
    height: 130px;
    border-bottom: solid #e6ecf0 10px;
    justify-content: space-between;
    z-index: 4;
    .top-part {
      height: 100%;
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
          padding-right: 1em;
          font-size: 18px;
          flex: 1;
          width: 100%;
          height: 100%;
          resize: none;
          //height: 4em;
          border: none;
          word-break: break-all;
        }
      }
    }
    .bottom-part {
      text-align: right;
      .input-error {
        color: #fc5a5a;
        font-size: 15px;
      }
      .tweet-button {
        @extend %main-button;
        font-size: 18px;
        margin: 0px 10px 0 20px;
        &:disabled {
          opacity: 0.6;
        }
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
        h5 {
          color: $color-black;
          &:hover {
            color: $color-orange;
          }
        }

        .post-time {
          font-size: 15px;
          margin-left: 5px;
          color: $color-gray;
        }
        .tweet-detail-text {
          color: $color-black;
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
          color: $color-gray;
        }
      }
    }
  }
}

//手機
</style>
