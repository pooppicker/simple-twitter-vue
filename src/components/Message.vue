<template>
  <div class="message-part">
    <ChooseMessageSpiner v-if="roomId!==1 && chooseMessageSpiner" />
    <div class="message-title">
      <h2 v-if="roomId === 1">公開聊天室</h2>
      <div v-else>
        <h2 class="message-title-name">
          {{ otherUser.name ? otherUser.account : "私人聊天室" }}
        </h2>
        <div class="message-title-account">
          @{{ otherUser.account ? otherUser.account : "請點選使用者" }}
        </div>
      </div>
    </div>

    <div class="message-show" ref="messageShowScroll">
      <!--上線-->
      <div v-for="message in Messages" :key="message.uuId">
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
      // &-content {
      // }
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
    flex-shrink:2;
    .message-title {
      top: 59px;
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
//import MessageAPI from "./../apis/message";
import { fromNowFilter } from "./../utils/mixins";
//import UserAPI from "./../apis/users";
//import MessageSpinner from "./MessageSpinner.vue";
import ChooseMessageSpiner from "./ChooseMessageSpiner.vue";
import { v4 as uuidv4 } from "uuid"


export default {
  name: "Message",
  mixins: [fromNowFilter],
  props: {
    roomId: {
      required: true,
    },
    initialMessage:{
      required: true
    },
    otherUser: {
      type: Object
    }
  },
  components: {
    IconSendMessage,
   // MessageSpinner,
    ChooseMessageSpiner,
  },
  data() {
    return {
      socket: [],
      Messages: [],
      inputMessage: "",
      messageBottom: true,
     // messageSpiner: true,
      chooseMessageSpiner: true,
    };
  },

  methods: {
   // 建立連線
    createdSocket() {
      const tokenInLocalStorage = localStorage.getItem("token");
      this.socket = io("https://twitter-apis-demo.herokuapp.com", {
        auth: { token: tokenInLocalStorage },
      });
    },

    

    handleScroll() {
      this.$nextTick(() => {
        let msg = this.$refs.messageShowScroll.lastElementChild;
        msg.scrollIntoView({ block: "end" }); 
      });
    },

    //增加歷史訊息
     fetchMessage() {
       this.Messages =  this.initialMessage.map((user) => ({
         ...user,
         uuId: uuidv4(),

       }))
       
       
       
     
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
          receiverId: this.otherUser.id,
          UserId: this.currentUser.id,
          roomId: this.roomId,
          content: this.inputMessage,
        });
        this.inputMessage = "";
      }
    },

  },
  
  created() {
    //const { id } = this.$route.params;
    this.createdSocket();
     this.fetchMessage()
    //this.createRoomId(id);
  },

  mounted() {
    this.handleScroll();
  },

  watch: {
  initialMessage: {
    handler: function () {
      this.fetchMessage()
      this.handleScroll()
      this. messageBottom = false
      this.chooseMessageSpiner = false
      

    },
    deep: true, 
  },


},

 

 
 



  computed: {
    ...mapState(["currentUser","socket"]),
  },
};
</script>