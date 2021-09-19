<template>
  <div class="container middle-container">
    <HomerSpinner v-if="pageIsProcessing" />
    <!--上方使用者輸入區-->
    <template v-else>
      <h4 class="middle-h4">首頁</h4>
      <div class="user-post-part">
        <form
          class="user-post-panel d-flex flex-column"
          @submit.stop.prevent="handleSubmit"
        >
          <div class="top-part d-flex">
            <img class="current-user-imag" :src="currentUser.avatar" />

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
                v-model="description"
              />
            </div>
          </div>
          <div class="bottom-part">
            <span v-if="description.length >= 140" class="input-error"
              >字數不可超過140字</span
            >
            <button
              v-if="!isProcessing"
              class="tweet-button"
              type="submit"
              :disabled="
                description.trim().length === 0 || description.length > 140
              "
            >
              推文
            </button>
            <button class="tweet-button" disabled v-else>推文發送中...</button>
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
                  @{{ tweet.User.account }}·{{ tweet.createdAt | fromNow }}
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
      </div>
      <ReplyPostModal v-if="openModal" :onClose="handleCloseModal" :initialTweet="tweets" />
    </template>
  </div>
</template>

<script>
import IconLiked from "./icons/IconLike";
import IconHeartFilled from "./icons/IconHeartFilled";
import IconHeartEmpty from "./icons/IconHeartEmpty";
import { fromNowFilter } from "./../utils/mixins";
import { descriptionLengthFilter } from "./../utils/mixins";
import ReplyPostModal from "./modal/ReplyPostModal.vue";
import TweetAPI from "./../apis/tweets";
import { Toast } from "./../utils/helpers";
import HomerSpinner from "./HomeSpinner.vue";
import { mapState } from "vuex";
import { setInterval, clearInterval } from "timers";

export default {
  mixins: [fromNowFilter, descriptionLengthFilter],
  components: {
    IconLiked,
    IconHeartFilled,
    IconHeartEmpty,
    ReplyPostModal,
    HomerSpinner,
  },
  data() {
    return {
      tweets: [],
      description: "",
      isProcessing: false,
      openModal: false,
      pageIsProcessing: true,
      timer: 0,
    };
  },

  methods: {
    //推文載入區
    async fetchTweets() {
      try {
        const response = await TweetAPI.getTweets();
        this.tweets = {
          ...response.data,
        };
        this.pageIsProcessing = false;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "貼文載入失敗，請稍後再試",
        });
      }
    },

    //發文區
    async handleSubmit() {
      try {
        this.isProcessing = true;
        //空白不能發文
        if (!this.description) {
          Toast.fire({
            icon: "warning",
            title: "推文內容不得為空白",
          });
          this.isProcessing = false;
          return;
        }
        if (this.description.length > 140) {
          Toast.fire({
            icon: "warning",
            title: "推文字數不能超過140字",
          });
          this.isProcessing = false;
          return;
        }

        const response = await TweetAPI.PostTweet({
          description: this.description,
        });
        console.log("發文功能:", response);
        Toast.fire({
          icon: "success",
          title: "推文發送成功",
        });
        this.description = "";
        this.isProcessing = false;
        this.fetchTweets();
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "發送推文失敗，請重試一次",
        });
        this.isProcessing = false;
      }
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
    //首頁推文即時更新(5秒)
    UpDateTweet() {
      this.timer = setInterval(() => {
        this.fetchTweets();
      }, 5000);
    },
  },

  created() {
    this.fetchTweets();
    this.UpDateTweet();
  },
  computed: {
    ...mapState(["isNewPost", "currentUser"]),
  },
  watch: {
    isNewPost: {
      handler: function () {
        if (this.isNewPost) {
          this.fetchTweets();
          this.$store.commit("updateNewPost");
        }
      },
      deep: true,
    },
  },
  //換頁後即時更新銷毀
  beforeDestroy() {
    clearInterval(this.timer);
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
  .middle-h4 {
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
          word-break: break-all;
          &:hover {
            color: $color-orange;
          }
        }
        .tweet-detail-title {
          flex-wrap: wrap;
        }

        .post-time {
          font-size: 15px;
          margin-left: 5px;
          color: $color-gray;
        }
        &-text {
          color: $color-black;
          word-break: break-all;
          display: -webkit-box;

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
