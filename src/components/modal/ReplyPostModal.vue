<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <div class="modal">
        <form>
          <slot name="head">
            <div class="create-title-area">
              <div class="go-close" @click="onClose">
                <IconCloseOrange class="icon-close" />
              </div>
              <hr />
            </div>
          </slot>
          <slot name="body">
            <div class="single-reply-area">
              <div class="img-create-area">
                <img class="create-user-avatar" :src="tweet.User.avatar" />
                <div class="vl"></div>
              </div>
              <div class="single-reply-info">
                <div class="single-name-account">
                  <h5>{{ tweet.User.name }}</h5>
                  <span
                    >@{{ tweet.User.account }}・{{
                      tweet.createdAt | fromNow
                    }}</span
                  >
                </div>
                <div class="paragraph">
                  <p>
                    {{ tweet.description }}
                  </p>
                  <span class="reply-to">回覆給 </span
                  ><span class="reply-to orange"
                    >@{{ tweet.User.account }}</span
                  >
                </div>
              </div>
            </div>
            <div class="create-tweet-area">
              <div class="img-create-area">
                <img class="create-user-avatar" :src="currentUser.avatar" />
              </div>
              <div class="input-create">
                <label class="create-label" for="txtarea-input"></label>
                <textarea
                  v-model="description"
                  name="text"
                  row="5"
                  type="text"
                  class="txtarea-input"
                  autofocus
                  required
                  placeholder="推你的回覆"
                />
              </div>
            </div>
          </slot>
          <slot name="footer">
            <div class="create-tweet-btn">
              <button
                class="click-to-create"
                type="submit"
                @click.stop.prevent="handleSubmit"
              >
                回覆
              </button>
            </div>
          </slot>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import IconCloseOrange from "./../icons/IconClose.vue";
import { fromNowFilter } from "../../utils/mixins";
// import { Toast } from "../../utils/helpers";
import { mapState } from "vuex";
import TweetAPI from "./../../apis/tweets";
import { Toast } from "./../../utils/helpers";

export default {
  mixins: [fromNowFilter],
  components: {
    IconCloseOrange,
  },
  props: {
    onClose: {
      type: Function,
      required: true,
    },
    initialTweet: {
      required: true,
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  data() {
    return {
      tweet: this.initialTweet,
      description: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
          if (this.description.trim().length === 0) {
          Toast.fire({
            icon: "warning",
            title: "回覆不得為空白！",
          });
          this.isProcessing = false;
          this.$emit("closeModal");
          return;
        }
        await TweetAPI.addReplies({
          tweetId: this.tweet.TweetId ? this.tweet.TweetId : this.tweet.id,
          comment: this.description,
        });
        this.tweet.RepliesCount += 1; //這裡是用來即時呈現首頁的推文數，不用重新刷新首頁
        this.$emit("closeModal");
        const TweetId = this.tweet.id;
        this.$emit("renewReplyList", TweetId);
        Toast.fire({
          icon: "success",
          title: "回覆成功！",
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "warning",
          title: "回覆發生錯誤，請稍後再次試",
        });
        this.$emit("closeModal");
      }
    },
  },
};
</script>

<style lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
}
.modal-container {
  position: relative;
  display: grid;
  place-items: start center;
  width: 100%;
  height: 100%;
}
.modal {
  padding: 14px 0;
  background-color: #fff;
  border-radius: 14px;
  // min-height: 300px;
  width: 600px;
  margin: 2%;
  animation: scale-in 0.1s linear;
}
.create-title-area {
  width: 100%;
  // outline: 1px solid black;
  .go-close {
    padding-left: 0.7rem;
    cursor: pointer;
  }
}
.single-reply-area {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  // outline: 1px solid black;
  padding: 0.5rem 1rem;
  .create-user-avatar {
    margin-top: 0.2rem;
    margin-bottom: 0.5rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  .vl {
    margin-left: 1.5rem;
    height: 80px;
    border-left: 2px solid #ccd6dd;
  }
}
.single-reply-info {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  .single-name-account {
    margin-bottom: 0.5rem;
    // outline: 1px solid black;
    display: flex;
    flex-direction: row;
    h5 {
      font-weight: 700;
    }
    span {
      padding-left: 0.2rem;
      font-size: 15px;
      color: #657786;
    }
  }
  .paragraph {
    p {
      margin-bottom: 0.5rem;
      font-size: 16px;
      color: #1c1c1c;
    }
    .reply-to {
      color: #657786;
      font-size: 14px;
    }
    .orange {
      color: #ff6600;
    }
  }
}
.create-tweet-area {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  // outline: 1px solid black;
  padding: 0 1rem;
  .create-user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  .txtarea-input {
    width: 400px;
    height: 150px;
    font-size: 18px;
    resize: none;
    margin-top: 0.7rem;
    margin-left: 0.7rem;
    // outline: 1px solid black;
  }
}
.create-tweet-btn {
  // outline: 1px solid black;
  display: flex;
  justify-content: end;
  .click-to-create {
    width: 66px;
    height: 38px;
    background: #ff6600;
    border-radius: 100px;
    color: #ffffff;
    font-size: 18px;
    margin-right: 0.7rem;
  }
}
@keyframes scale-in {
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
}
@import "/src/assets/scss/efficientSetting.scss";

@media screen and (max-width: 768px) {
  .modal {
    width: 80%;
  }
  .create-tweet-area {
    .txtarea-input {
      width: 80%;
    }
  }
  .single-reply-info {
    .single-name-account {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>