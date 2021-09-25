<template>
  <div class="message-part">
    <div class="message-title">
      <h2>公開聊天室</h2>
    </div>
    <div class="message-show">
      <!--上線-->
      <div v-for="message in Messages" :key="message.id">
        <div class="message-info" v-if="message.type === 'notice'">
          <p class="message-info-text">{{ message.message }}</p>
        </div>
        <div
          class="message-other"
          v-if="message.type === 'message' && message.userId !== currentUser.id"
        >
          <img class="message-other-img" :src="message.avatar" />
          <div class="message-other-content">
            <div class="message-other-content-text">
              {{ message.text.content }}
            </div>
            <div class="message-other-content-time">
              {{ message.createdAt | fromNow}}
            </div>
          </div>
        </div>
        <div
          class="message-self"
          v-if="message.type === 'message' && message.userId === currentUser.id"
        >
          <div class="message-self-content">
            <div class="message-self-text">
              {{ message.text.content }}
            </div>
            <div class="message-self-time">{{ message.createdAt }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="message-input">
      <input
        class="message-input-area"
        type="text"
        placeholder="輸入訊息..."
        required
        autofocus
        v-model="inputMessage"
        @keyup.enter="sendMessage"
      />
      <div class="message-input-icon" @click="sendMessage">
        <IconSendMessage />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/colorAndSize.scss";
@import "../assets/scss/efficientSetting.scss";
.message-part {
  position: relative;
  height: 100vh;
  border-left: $color-message-gray 1px solid;
  overflow: scroll;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  .message-title {
    padding-left: 15px;
    padding-top: 13px;
    position: fixed;
    width: 100%;
    top: 0;
    height: 55px;
    border-bottom: $color-message-gray 1px solid;
    z-index: 6;
    background-color: white;
  }
  .message-show {
    padding-top: 2%;
    padding-left: 15px;
    padding-right: 15px;
    margin: 55px 0;

    .message-info {
      margin-bottom: 15px;
      padding-bottom: 15px;

      display: flex;

      &-text {
        font-size: 15px;
        color: $color-gray;
        display: inline-block;
        margin: 0 auto;
        padding: 5px 14px;
        background-color: $color-bg-dark;
        border-radius: 50px;
      }
    }
    .message-other {
      display: flex;
      margin-top: 20px;
      align-items: flex-end;
      &-img {
        border-radius: 100%;
        object-fit: cover;
        height: 40px;
        width: 40px;
        transform: translateY(-20px);
      }
      &-content {
        max-width: 70%;
        margin-left: 12px;
        &-text {
          padding: 10px 15px;
          background-color: $color-message-gray;
          color: $color-black;
          font-size: 15px;
          border-top-right-radius: 25px;
          border-top-left-radius: 25px;
          border-bottom-right-radius: 25px;
        }
        &-time {
          font-size: 13px;
          color: $color-gray;
        }
      }
    }
    .message-self {
      display: flex;
      margin-top: 20px;
      max-width: 100%;
      padding-left: 30%;
      text-align: right;
      justify-content: flex-end;
      &-content {
      }
      &-text {
        padding: 10px 15px;
        text-align: left;
        background-color: $color-orange;
        font-size: 15px;
        border-top-right-radius: 25px;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        color: white;
      }
      &-time {
        font-size: 13px;
        color: $color-gray;
      }
    }
  }
  .message-input {
    height: 55px;
    position: fixed;
    bottom: 0;
    border-top: $color-message-gray 1px solid;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    z-index: 6;
    background-color: white;

    &-area {
      height: 32px;
      display: block;
      width: 43%;
      background-color: $color-message-gray;
      border-radius: 50px;
      margin-right: 1%;
      padding-left: 15px;
    }
  }
}
</style>





<script>
import IconSendMessage from "./../components/icons/IconSendMessage.vue";
import { io } from "socket.io-client";
import { mapState } from "vuex";
import MessageAPI from "./../apis/message";
import { fromNowFilter } from "./../utils/mixins";

export default {
  name: "Message",
  mixins: [fromNowFilter],
  props: {
    roomId: {
      required: true,
    },
  },
  components: {
    IconSendMessage,
  },
  data() {
    return {
      socket: [],
      Messages: [],
      inputMessage: "",
    };
  },

  methods: {
    // 滾輪置底
    // handleScroll() {
    //   if (window.scrollY + window.screen.height >= document.///body.scrollHeight) {
    //     this.loadMore();
    //   }
    // },

    //增加歷史訊息
    async fetchMessage() {
      try {
        const response = await MessageAPI.getMessage({
          roomId: this.roomId
        })

        console.log('getmessage',response)


      } catch(error) {
        console.log(error)
      }

    },

    

    createdSocket() {
      const tokenInLocalStorage = localStorage.getItem("token");
      this.socket = io("https://twitter-apis-demo.herokuapp.com", {
        auth: { token: tokenInLocalStorage },
      });
    },

    //進去後傳房間給後端
    enterMessage() {
      this.socket.emit("join", {
        roomId: this.roomId,
      });
    },

    //傳訊息給後端
    sendMessage() {
      if(this.inputMessage.trim().length === 0) {
        return
      }
      if (this.roomId === 1) {
        this.socket.emit("public chat", {
          UserId: this.currentUser.id,
          roomId: this.roomId,
          content: this.inputMessage,
        });
        this.inputMessage = "";
      } else {
        this.socket.emit("private chat", {
          UserId: this.currentUser.id,
          roomId: this.roomId,
          content: this.inputMessage,
        });
        this.inputMessage = "";
      }
    },

    //上下線通知
    message() {
      this.socket.on("message", (obj) => {
        this.Messages.push(obj);
      });
    },

    //訊息通知
    getMessage() {
      if (this.roomId === 1) {
        this.socket.on("public chat", (obj) => {
          console.log("msgobj", obj);
          this.Messages.push(obj);
        });
      } else {
        this.socket.on("private chat", (obj) => {
          console.log("msgobj", obj);
        });
      }
    },

    //離開房間
    leaveRoom(){
       this.socket.emit("leave", {
        roomId: this.roomId,
      });

    }
  },

  created() {
    this.createdSocket();
    this.enterMessage();
    this.fetchMessage()
   // window.addEventListener("scroll", this.handleScroll);
  },

  mounted() {
    this.message();
    this.getMessage();
  },

  beforeDestroy() {
    this.leaveRoom()
  },

  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>