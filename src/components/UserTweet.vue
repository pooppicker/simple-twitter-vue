<template>
  <!--下方推文區-->
  <div class="user-profile-area">
    <div v-for="reply in replies" :key="reply.id">
      <div class="tweet-card d-flex">
          <img class="user-self-img" :src="reply.User.avatar" />
        <div class="tweet-detail">
          <div class="tweet-detail-title d-flex">
              <h5>{{ reply.User.name }}</h5>
            <p class="post-time">
              @{{ reply.User.account }}·{{ reply.createdAt | fromNow }}
            </p>
          </div>
          <div class="user-reply-to">回覆 
            <router-link :to="{ name: 'User', params: { id: reply.Tweet.User.id } }">
            <span class="user-reply-account">@{{ reply.Tweet.User.account }}</span> </router-link>
           </div>
          <p class="tweet-detail-text">
            {{ reply.comment }}
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
import userAPI from "../apis/users"
import { Toast } from "../utils/helpers"

export default {
  mixins: [fromNowFilter],
  data() {
    return {
      replies: [],
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchReplies(id);
  },
  methods: {
    async fetchReplies(userID) {
      try {
        const response = await userAPI.getUserReply({userID})
        this.replies = {
          ...response.data
        };
        console.log(response)
      } catch (error) {
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '找不到使用者留言'
        })
      }
    },
  },
};
</script>

