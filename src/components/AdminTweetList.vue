<template>
  <div class="admintweets-container">
    <!--上方使用者輸入區-->
    <h4>推文清單</h4>
    <Spinner v-if="isProcessing" />
    <!--下方推文區-->
    <div class="admintweets-part">
      <!--v-for開始-->
      <div v-for="tweet in tweets" :key="tweet.id">
        <div class="tweet-card d-flex">
          <router-link
            :to="{ name: 'User', params: { id: tweet.User.UserId } }"
          >
            <img class="tweet-user-imag" :src="tweet.User.avatar" />
          </router-link>

          <div class="tweet-detail">
            <div class="d-flex justify-content-between">
              <div class="tweet-detail-title d-flex">
                <router-link
                  :to="{ name: 'User', params: { id: tweet.User.UserId } }"
                >
                  <h5>{{ tweet.User.name }}</h5>
                </router-link>
                <p class="post-time">
                  @{{ tweet.User.account }}·{{ tweet.createdAt | fromNow }}
                </p>
              </div>
              <div
                clas="admintweets-delete"
                @click.stop.prevent="deleteTweet(tweet)"
              >
                <IconDelete />
              </div>
            </div>
            
              <p class="tweet-detail-text">
                {{ tweet.description | nameLength}}
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
import { nameLengthFilter } from "./../utils/mixins";
import { Toast } from "../utils/helpers";
import adminAPI from "./../apis/admin";
import Spinner from "./AdminSpinner.vue"

export default {
  components: {
     IconDelete,
    Spinner
  },
  mixins: [fromNowFilter, nameLengthFilter],
  data() {
    return {
      tweets: [],
      isProcessing: true,
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    async fetchTweets() {
      try {
        const response = await adminAPI.adminGetTweets();
        this.tweets = {
          ...response.data,
        };
        this.isProcessing = false;
      } catch (error) {
        console.log(error.message);
      }
    },
    async deleteTweet(tweet) {
      try {
        await adminAPI.delete({
          tweetId: tweet.id,
        });
        Toast.fire({
          icon: "success",
          title: "刪除成功",
        });
        this.fetchTweets();
      } catch (error) {
        console.log(error.message);
        Toast.fire({
          icon: "error",
          title: "無法刪除推文，請重試",
        });
      }
    },
  },
};
</script>


<style lang="scss">
@import "../assets/scss/colorAndSize.scss";
@import "../assets/scss/efficientSetting.scss";

.admintweets-container {
  //outline: 1px solid black;
  border-left: 1px solid #e6ecf0;
  //outline: green 2px solid;
  height: 100vh;
  margin-left: 2rem;
  width: 100%;
  //width: 50em;
  overflow: scroll;
  position: relative;
  flex-shrink: 1;
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
    max-width: 98%;
    margin-top: 3.8em;
    padding-right: 1em ;
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
          word-break: break-all;
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
          //display: -webkit-box;
          //-webkit-line-clamp: 1;
          //-webkit-box-orient: vertical;
          word-break: break-all;
          margin: 6px 15px 0 0;
          width: 80%;
          line-height: 22px;
        }
      }
    }
  }
}

//手機板
@media screen and (max-width: 768px) {
  .admintweets-container {
    width: 100vw;
     margin-left: 0%;
    border-left: white 0px solid;
    h4 {
    // outline: 1px solid black;
    top:3em;
    color: white;
    background-color: $color-orange;
  }
  .admintweets-part {
    margin-top: 7.5em;
  }}}
</style>
