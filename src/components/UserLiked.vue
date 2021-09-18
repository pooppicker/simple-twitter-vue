<template>
  <!--下方推文區-->
  <div class="user-profile-area">
    <div v-for="tweet in tweets" :key="tweet.id">
      <div class="tweet-card d-flex">
        <router-link :to="{ name: 'User', params: { id: tweet.User.id } }">
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
import IconHeartEmpty from "./icons/IconHeartEmpty.vue";
import IconHeartFilled from "./icons/IconHeartFilled.vue";
import { fromNowFilter } from "./../utils/mixins";
import ReplyPostModal from "./modal/ReplyPostModal.vue";
import userAPI from "../apis/users"
import { Toast } from "../utils/helpers"

export default {
  mixins: [fromNowFilter],
  components: {
    IconReply,
    IconHeartEmpty,
    IconHeartFilled,
    ReplyPostModal
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
        const response = await userAPI.getUserLiked({userID})
        this.tweets = {
          ...response.data
        };
      } catch (error) {
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '找不到使用者留言'
        })
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
  },
};
</script>
