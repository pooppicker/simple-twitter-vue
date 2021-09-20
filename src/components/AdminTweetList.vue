<template>
  <div class="container admintweets-container">
    <!--上方使用者輸入區-->
    <h4>推文清單</h4>

    <!--下方推文區-->
    <div class="admintweets-part">
      <!--v-for開始-->
      <div v-for="tweet in tweets" :key="tweet.id">
        <div class="tweet-card d-flex">
          <router-link :to="{ name: 'User', params: { id: tweet.User.id } }">
            <img class="tweet-user-imag" :src="tweet.User.avatar" />
          </router-link>
          <div class="tweet-detail">
            <div class="d-flex justify-content-between">
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
              <div clas="admintweets-delete">
                <IconDelete />
              </div>
            </div>
            <p class="tweet-detail-text">
              {{ tweet.description }}
            </p>
          </div>
        </div>
        <hr />
      </div>
      <!--v-for結束-->
    </div>
  </div>
</template>

<script>
import IconDelete from "./../components/icons/IconDelete.vue";
import { fromNowFilter } from "./../utils/mixins";
import adminAPI from "./../apis/admin"

export default {
  components: {
    IconDelete,
  },
  mixins: [fromNowFilter],
  // props: {
  //   innitialTweets: {
  //     type: Array,
  //     required: true
  //   },
  // },
  data() {
    return {
      // tweets: this.innitialTweets,
      tweets: [],
    };
  },
  created() {
    this.fetchTweets()
  },
  methods: {
    async fetchTweets() {
      try {
        const response = await adminAPI.adminGetTweets()
        this.tweets = {
          ...response.data
        }
        console.log(response.data[0])
      } catch (error) {
        console.log(error.message)
      }
    }
  }
};
</script>


<style lang="scss">
@import "../assets/scss/colorAndSize.scss";
@import "../assets/scss/efficientSetting.scss";

.admintweets-container {
  // outline: 1px solid black;
  border-left: 1px solid #e6ecf0;
  height: 100vh;
  margin-left: 2%;
  width: 71em;
  overflow: scroll;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  h4 {
    // outline: 1px solid black;
    position: fixed;
    width: 60.1em;
    border-bottom: 1px solid #e6ecf0;
    font-size: 19px;
    padding: 0.7rem;
    background-color: white;
  }

  .admintweets-part {
    margin-top: 3.8em;
    .tweet-card {
      padding: 0.3em 0;
      margin-left: 15px;
      width: 100%;
      .tweet-user-imag {
        @extend %avatar-size;
        margin-right: 10px;
      }

      .tweet-detail {
        width: 95%;
        h5 {
          color: $color-black;
        }

        .post-time {
          font-size: 15px;
          margin-left: 5px;
          color: $color-gray;
        }
        .admin-tweets-delete-icon {
          cursor: pointer;
          margin-right: 20px;
          &:hover {
            transform: scale(1.1, 1.1);
          }
        }

        &-text {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 6px 15px 0 0;
          width: 45%;
          line-height: 22px;
        }
      }
    }
  }
}

//手機板
</style>
