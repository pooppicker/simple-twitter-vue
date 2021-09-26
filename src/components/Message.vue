<template>
  <div class="message-part">
    <MessageSpinner v-if="messageSpiner"/>
    <ChooseMessageSpiner v-if="chooseMessageSpiner"/>
    <div class="message-title">
      <h2 v-if="roomId === 1">公開聊天室</h2>
      <div v-else>
        <h2 class="message-title-name">{{ otherUser.name }}</h2>
        <div class="message-title-account">@{{ otherUser.account }}</div>
      </div>
    </div>
    
    <div class="message-show" ref="messageShowScroll">
      
      <!--上線-->
      <div v-for="message in Messages" :key="message.userId">
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
              {{ message.createdAt | fromNow }}
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
            <div class="message-self-time">
              {{ message.createdAt | fromNow }}
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-focus">
        <div v-if="messageBottom">----訊息載入中！----</div>
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
    display: flex;
    border-left: $color-message-gray 1px solid;
    align-items: center;
    padding-left: 15px;
    //padding-top: 13px;
    position: fixed;
    width: 100%;
    top: 0;
    height: 55px;
    border-bottom: $color-message-gray 1px solid;
    z-index: 6;
    background-color: white;
    &-account {
      font-size: 13px;
      color: $color-gray;
    }
  }
  .message-show {
    padding-top: 2%;
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
      margin-left: 15px;
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
      margin-right: 15px;
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
    .scroll-focus {
      position: absolute;

      width: 100%;
      height: 55px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      font-size: 13px;
      color: $color-gray;
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

//手機板
@media screen and (max-width: 768px) {
  .message-part {
    
    .message-title {
      top:59px;
      background-color: $color-orange;
      color: white;
      z-index: 8;
    }
    .message-show {
      margin: 150px 0 55px 0;
    }
    .message-input {
      &-area {
        width: 100%;
      }
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
import UserAPI from "./../apis/users";
import MessageSpinner from "./MessageSpinner.vue";
import ChooseMessageSpiner from "./ChooseMessageSpiner.vue";


export default {
  name: "Message",
  mixins: [fromNowFilter],
  props: {
    initialRoomId: {
      type: Number,
    },
  },
  components: {
    IconSendMessage,
    MessageSpinner,
    ChooseMessageSpiner
  },
  data() {
    return {
      socket: [],
      Messages: [],
      inputMessage: "",
      roomId: "",
      otherUser: "",
      messageBottom: true,
      messageSpiner: false,
      chooseMessageSpiner: false
    };
  },

  methods: {
    //建立連線
    createdSocket() {
      const tokenInLocalStorage = localStorage.getItem("token");
      this.socket = io("https://twitter-apis-demo.herokuapp.com", {
        auth: { token: tokenInLocalStorage },
      });
    },

    //確認房間
    async createRoomId() {
      try {
        
        if (this.initialRoomId === 1) {
        
          this.roomId = this.initialRoomId;
          this.enterMessage();
          this.fetchMessage(); //取得歷史訊息
         

          return;
        }
        this.chooseMessageSpiner= true

        const { id } = this.$route.params;
        if(id === "home"){
          return
        } 
        this.chooseMessageSpiner= false
        const reponse = await UserAPI.getUser({ userID: id });
        this.otherUser = reponse.data;
        if (this.otherUser.id < this.currentUser.id) {
          this.roomId = `${this.otherUser.id}0${this.currentUser.id}`;
          this.enterMessage();
          this.fetchMessage(); //取得歷史訊息
        } else {
          this.roomId = `${this.currentUser.id}0${this.otherUser.id}`;
          this.enterMessage();
          this.fetchMessage();
        }
      } catch (error) {
        console.log(error);
      }
    },

    //進去後傳房間給後端
    enterMessage() {
      this.socket.emit("join", {
        roomId: this.roomId,
      });
    },

    handleScroll() {
      this.$nextTick(() => {
        console.log("我在這裡");
        let msg = this.$refs.messageShowScroll.lastElementChild; // 获取对象
        console.log("msg", msg);
        console.log("msg.scrollTop", msg.scrollTop);
        msg.scrollIntoView({ block: "end" }); // 滚动高度
      });
    },

    //增加歷史訊息
    async fetchMessage() {
      try {
        const response = await MessageAPI.getMessage({
          roomId: this.roomId,
        });
        this.Messages = response.data.map((user) => ({
          userId: user.User.id,
          type: "message",
          avatar: user.User.avatar,
          createdAt: user.createdAt,
          text: {
            content: user.content,
          },
        }));

        this.Messages.push(response.data);
        this.handleScroll(); //滾輪
        this.messageBottom = false

      } catch (error) {
        console.log(error);
      }
    },

    //傳訊息給後端
    sendMessage() {
      if (this.inputMessage.trim().length === 0) {
        return;
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
        this.handleScroll(); //滾輪
        this.messageBottom = true;
      });
    },

    //訊息通知
    getMessage() {
      if (this.roomId === 1) {
        this.socket.on("public chat", (obj) => {
          console.log("msgobj", obj);
          console.log("有沒有收到公開訊息");
          this.Messages.push(obj);
          this.handleScroll();
          this.messageBottom = false;
        });
      } else {
        this.socket.on("private chat", (obj) => {
          console.log("有沒有收到私訊");
          this.Messages.push(obj);
          this.handleScroll();
          this.messageBottom = false;
        });
      }
    },

    //離開房間
    leaveRoom() {
      if (this.roomId === 1) {
        this.socket.emit("leave", {
          roomId: this.roomId,
        });
      } else {
        return;
      }
    },
  },

  created() {
    this.createdSocket();
    this.createRoomId();
  },

  mounted() {
    this.message();
    this.getMessage();
    this.handleScroll();
  },

  beforeDestroy() {
    this.leaveRoom();
  },

  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>