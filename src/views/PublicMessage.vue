<template>
  <div class="container public-message-content">
    <div class="public-message">
      <div class="navbars">
        <!--navbar-->
        <NavBars />
      </div>
      <!--上線使用者-->
      <div class="public-users">
        <div class="public-users-title">
          <h2>上線使用者({{ usersCount }})</h2>
        </div>
        <div class="public-users-content">
          <!--底下跑v-for迴圈-->
          <div v-for="user in users" :key="user.id">
            <div class="public-users-content-card">
              <router-link :to="{ name: 'User', params: { id: user.id } }">
                <img class="public-users-content-img" :src="user.avatar" />
              </router-link>

              <div class="public-users-content-text">
                <router-link :to="{ name: 'User', params: { id: user.id } }">
                  <div class="public-users-content-text-name">
                    {{ user.name }}
                  </div>
                </router-link>
                <div class="public-users-content-text-account">
                  @{{ user.account }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--底下跑v-for迴圈結束-->
      </div>
      <!--公開聊天室-->
      <div class="public-messages">
        <Message :roomId="roomId" :initialMessage="Messages" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBars from "./../components/NavBars";
import Message from "./../components/Message.vue";
import { io } from "socket.io-client";
import MessageAPI from "./../apis/message";
//import UserAPI from "./../apis/users";

export default {
  name: "Public-message",
  components: {
    NavBars,
    Message,
  },

  data() {
    return {
      socket: [],
      users: [],
      usersCount: 0,
      roomId: 1,
      Messages: [],
    };
  },

  methods: {
    createdSocket() {
      const tokenInLocalStorage = localStorage.getItem("token");
      this.socket = io("https://twitter-apis-demo.herokuapp.com", {
        auth: { token: tokenInLocalStorage },
      });
    },

    //進去後傳房間給後端
    enterMessage() {
      this.socket.emit("join", {
        roomId: 1,
      });
    },

    //通知哪位使用者上線
    NoticeUser() {
      this.socket.on("active users", (obj) => {
        //console.log("obj", obj);
        this.usersCount = obj.userCount;
        this.users = obj.activeUsers;
        // console.log("message:", this.users);
      });
    },

    //訊息通知
    getMessage() {
        this.socket.on("public chat", (obj) => {
          console.log("msgobj", obj);
          console.log("有沒有收到公開訊息");
          this.Messages.push(obj);
          this.handleScroll();
          this.messageBottom = false;
        });
      
    },

    //後端確認收到訊息通知
    debugNotice() {
      this.socket.on("debug notice", (obj) => {
        console.log(obj);
      });
    },

    //取得歷史訊息
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
        this.messageBottom = false;
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.createdSocket();
    this.enterMessage();
  },

  mounted() {
    this.debugNotice();
    this.NoticeUser();
    this.fetchMessage();
     this.getMessage()
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/colorAndSize.scss";
@import "../assets/scss/efficientSetting.scss";
.public-message-content {
  height: 100vh;
  width: 100vw;
  //標示用
  // outline: red 2px solid;
  .public-message {
    @extend %views-grid;
    grid-template-columns: 5fr 8fr 12.5fr;
    //標示用
    // outline: green 2px solid;
    position: relative;
  }
}

.public-users {
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
  height: 100vh;
  margin-left: 1.5em;
  background-color: white;
  z-index: 5;
  //outline: black 1px solid;
  overflow: scroll;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  &-title {
    padding-left: 15px;
    padding-top: 13px;
    position: fixed;
    width: 100%;
    top: 0;
    height: 55px;
    border-bottom: $color-message-gray 1px solid;
    h2 {
      font-size: 18px;
    }
  }
  &-content {
    margin-top: 55px;

    &-card {
      align-items: center;
      padding-left: 15px;
      display: flex;
      height: 75px;
      border-bottom: $color-message-gray 1px solid;
    }

    &-img {
      @extend %avatar-size;
    }
    &-text {
      margin-left: 10px;
      display: flex;
      flex-direction: row;
      &-name {
        margin-right: 5px;
        font-size: 15px;
        color: $color-black;
      }
      &-account {
        font-size: 15px;
        color: $color-gray;
      }
    }
  }
}

//手機板
@media screen and (max-width: 768px) {
  .public-message-content {
    height: 100%;
    h5 {
      font-size: 15px;
    }
    .public-message {
      grid-template-columns: 1fr;
      grid-template-rows: 5fr 20fr;
    }
  }
  .public-users {
    border-bottom: $color-message-gray 2px solid;

    z-index: 7;
    width: 100%;
    height: 120px;
    position: fixed;
    margin-left: 0em;
    margin-top: 52px;
    overflow-y: scroll;
  }
  .public-users-content {
    margin-top: 55px;

    display: flex;
    &-text {
      flex-direction: column;
      &-account {
        font-size: 13px;
      }
    }
  }
  .public-users-title {
    display: none;
  }
}
</style>