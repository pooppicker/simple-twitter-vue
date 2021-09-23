<template>
  <div class="reply-list-area">
    <ReplySpinner v-if="pageIsProcessing" />
    <!-- Title -->
    <div class="title-area">
      <div class="go-back" @click.stop.prevent="previousPage">
        <LeftArrow />
      </div>
      <div class="user-title">
        <h4 class="user-profile-name">推文</h4>
      </div>
      <hr />
    </div>
    <!-- Single Comment -->
    <div class="txt-area">
      <div class="image-and-name">
        <router-link :to="{ name: 'User', params: { id: tweet.User.id } }">
          <img class="user-sm-avatar" :src="tweet.User.avatar" alt="avatar" />
        </router-link>
        <div class="name-account">
          <router-link :to="{ name: 'User', params: { id: tweet.User.id } }">
            <h4>{{ tweet.User.name }}</h4>
          </router-link>
          <span>@{{ tweet.User.account }}</span>
        </div>
      </div>
      <!-- paragraph and time -->
      <div class="para">
        <p>
          {{ tweet.description }}
        </p>
        <span>{{ tweet.createdAt | fromNow }}</span>
      </div>
      <!-- comments and likes -->
      <div class="comments-area">
        <div class="coms-amount">
          <strong>{{ tweet.RepliesCount }} </strong>回覆
        </div>
        <div class="likes-amount">
          <strong>{{ tweet.LikesCount }} </strong>喜歡次數
        </div>
      </div>
      <!-- icons -->
      <div class="icons-area">
        <div @click.stop.prevent="handleOpenModal">
          <IconReply class="ic" />
        </div>
        <div v-if="tweet.isLike" @click.stop.prevent="cancelHeart(tweet.id)">
          <IconHeartFilled class="ic ic-right" />
        </div>
        <div v-else @click.stop.prevent="addHeart(tweet.id)">
          <IconHeartEmpty class="ic ic-right" />
        </div>
      </div>
      <!-- Modal -->

      <!-- Down Part -->
      <div class="user-replylist-area">
        <div v-for="reply in tweet.Replies" :key="reply.id">
          <div class="tweet-card d-flex">
            <router-link :to="{ name: 'User', params: { id: reply.User.id } }">
              <img class="user-self-img" :src="reply.User.avatar" />
            </router-link>
            <div class="tweet-detail">
              <div class="tweet-detail-title d-flex">
                <router-link
                  :to="{ name: 'User', params: { id: reply.User.id } }"
                >
                  <h5>{{ reply.User.name }}</h5>
                </router-link>
                <p class="post-time">
                  @{{ reply.User.account }}·{{ reply.createdAt | fromNow }}
                </p>
              </div>
              <div class="user-reply-to">
                回覆
                <router-link
                  :to="{ name: 'User', params: { id: tweet.User.id } }"
                >
                  <span class="user-reply-account"
                    >@{{ tweet.User.account }}</span
                  >
                </router-link>
              </div>
              <p class="tweet-detail-text">
                {{ reply.comment }}
              </p>
            </div>
          </div>
          <hr />
        </div>
        <!--v-for結束-->
        <ReplyPostModal
          v-if="openModal"
          :onClose="handleCloseModal"
          :initialTweet="tweet"
          @closeModal="handleCloseModal"
          @renewReplyList="fetchTweets"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LeftArrow from "./../components/icons/IconBack.vue";
import IconReply from "./../components/icons/IconReply.vue";
import IconHeartEmpty from "./../components/icons/IconHeartEmpty.vue";
import { fromNowFilter } from "./../utils/mixins";
import { Toast } from "./../utils/helpers";
import ReplyPostModal from "./modal/ReplyPostModal.vue";
import TweetAPI from "./../apis/tweets";
import IconHeartFilled from "./../components/icons/IconHeartFilled.vue";
import ReplySpinner from "./ReplySpinner.vue";
//import { Toast } from "./../utils/helpers";

export default {
  mixins: [fromNowFilter],
  components: {
    LeftArrow,
    IconReply,
    IconHeartEmpty,
    ReplyPostModal,
    IconHeartFilled,
    ReplySpinner,
  },
  data() {
    return {
      tweet: [],
      openModal: false,
      pageIsProcessing: true,
    };
  },

  methods: {
    async fetchTweets(tweetId) {
      try {
        const response = await TweetAPI.getSpecificTweets({ tweetId });
        this.tweet = {
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
    handleOpenModal() {
      this.openModal = true;
    },
    handleCloseModal() {
      this.openModal = false;
    },
    previousPage() {
      this.$router.back();
    },
    //點擊愛心功能
    async addHeart(TweetId) {
      try {
        this.tweet.LikesCount = this.tweet.LikesCount + 1;
        this.tweet.isLike = !this.tweet.isLike;
        await TweetAPI.postTweetLiked({ tweetId: TweetId });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法加入喜歡的貼文，請稍後再試",
        });
        this.tweet.LikesCount = this.tweet.LikesCount - 1;
        this.tweet.isLike = !this.tweet.isLike;
      }
    },

    async cancelHeart(TweetId) {
      try {
        this.tweet.LikesCount = this.tweet.LikesCount - 1;
        this.tweet.isLike = !this.tweet.isLike;
        await TweetAPI.postTweetUnliked({ tweetId: TweetId });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取消喜歡的貼文，請稍後再試",
        });
        this.tweet.LikesCount = this.tweet.LikesCount + 1;
        this.tweet.isLike = !this.tweet.isLike;
      }
    },
  },

  created() {
    const { id } = this.$route.params;
    this.fetchTweets(id);

  },
};
</script>

<style lang="scss">
@import "../assets/scss/colorAndSize.scss";
@import "../assets/scss/efficientSetting.scss";
.reply-list-area {
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e6ecf0;
  margin-left: 2%;
  position: relative;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .title-area {
    background-color: white;
    position: fixed;
    width: 45em;
    z-index: 3;
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
        width: 90%;
        min-height: 136px;
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
      .likes-amount {
        margin-left: 2rem;
      }
    }
    .icons-area {
      display: flex;
      padding: 1.5rem 0;
      .ic {
        width: 28px;
        height: 28px;
        cursor: pointer;
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
    padding: 0.2rem 0;
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
      }
    }
  }
}

//手機板
@media screen and (max-width: 1022px) {
  .reply-list-area {
    .title-area {
      width: 35em;
    }
  }
}

@media screen and (max-width: 768px) {
  .reply-list-area {
    width: 100%;
    width: 100vw;
    border-left: white 0px solid;
    margin-left: 0px;
    margin-right: 0px;
    .title-area {
      top: 3.7em;
      width: 100%;
      background-color: $color-orange;
      .user-profile-name {
        color: white;
      }
    }
    .txt-area {
      margin-top: 7em;
      .comments-area {
        padding: 0.5rem 0;
        font-size: 15px;
      }
      .icons-area {
        padding: 0.5rem 0;
        .ic {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>