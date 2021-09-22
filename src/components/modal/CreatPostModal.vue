<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <div class="modal">
        <form @submit.stop.prevent="handleSubmit">
          <slot name="head">
            <div class="create-title-area">
              <div class="go-close" @click="onClose">
                <IconCloseOrange class="icon-close" />
              </div>
              <hr />
            </div>
          </slot>
          <slot name="body">
            <div class="create-tweet-area">
              <div class="img-create-area">
                <img class="create-user-avatar" :src="currentUser.avatar" />
              </div>
              <div class="input-create">
                <label class="create-label" for="txtarea-input"></label>
                <textarea
                  name="text"
                  row="5"
                  type="text"
                  class="txtarea-input"
                  maxLength="140"
                  autofocus
                  required
                  placeholder="有什麼新鮮事?"
                  v-model="description"
                />
              </div>
            </div>
          </slot>
          <slot name="footer">
            <div class="create-tweet-btn">
              <span v-if="description.length >= 140" class="input-error">
                字數不可超過140字
              </span>
              <span v-if="isDescriptionEmpty" class="input-error">
                內容不可空白
              </span>
              <span v-if="isSubmitError" class="input-error">
                發送失敗，請重新發送一次
              </span>
              <button
                v-if="!isProcessing"
                class="click-to-create"
                type="submit"
                :disabled="
                  description.trim().length === 0 || description.length > 140
                "
              >
                推文
              </button>
              <button v-else class="click-to-create" type="submit" disabled>
                發送中
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
import TweetAPI from "./../../apis/tweets";
import { Toast } from "./../../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    IconCloseOrange,
  },
  props: {
    onClose: {
      types: Function,
      required: true,
    },
  },
  data() {
    return {
      description: "",
      isProcessing: false,
      isDescriptionEmpty: false,
      isSubmitError: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.isProcessing = true;
        //空白不能發文
        if (this.description.trim().length === 0) {
          this.isDescriptionEmpty = true;
          this.isProcessing = false;
          return;
        }
        //發文長度限制
        if (this.description.length > 140) {
          this.isProcessing = false;
          return;
        }

        await TweetAPI.PostTweet({
          description: this.description,
        });

        this.$emit("closeModal");
        //console.log(this.$route);
        //更新vuex資料
        this.$store.commit("updateNewPost");

        Toast.fire({
          icon: "success",
          title: "推文發送成功",
        });
        this.description = "";
        this.isProcessing = false;
      } catch (error) {
        console.log(error);
        this.isSubmitError = true;
        this.isProcessing = false;
      }
    },
  },

  watch: {
    description: {
      handler: function () {
        if (this.description.trim().length > 0) {
          this.isDescriptionEmpty = false;
          this.isSubmitError = false;
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>

<style lang="scss" >
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  .input-error {
    color: #fc5a5a;
    font-size: 15px;
    margin-right: 10px;
    padding-top: 8px;
  }
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
    &:disabled {
      opacity: 0.6;
    }
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

//手機

@media screen and (max-width: 768px) {
  .modal {
   width: 80%;
  }
  .create-tweet-area {
    .txtarea-input {
      width: 80%;
    }

  }

}
</style>