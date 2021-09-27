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
          <h2>訊息</h2>
          <IconAddMessage />
        </div>
        <div class="public-users-content">
          <!--底下跑v-for迴圈-->
          <div v-for="user in users" :key="user.uuId">
            <div :class="['public-users-content-card', {'active' : user.userId === otherUser.id}]">
              <router-link
                :to="{ name: 'Private-message', params: { id: user.userId } }"
              >
                <img class="public-users-content-img" :src="user.avatar" />
              </router-link>
              <div style="width: 100%">
                <div class="public-users-content-text">
                  <div class="public-users-content-detail d-flex">
                    <router-link
                      :to="{
                        name: 'Private-message',
                        params: { id: user.userId },
                      }"
                    >
                      <div class="public-users-content-text-name">
                        {{ user.name }}
                      </div>
                    </router-link>
                    <div class="public-users-content-text-account">
                      @{{ user.account }}
                    </div>
                  </div>
                  <div class="public-users-content-text-time">
                    {{ user.createdAt | fromNow }}
                  </div>
                </div>
                <router-link
                  :to="{ name: 'Private-message', params: { id: user.userId } }"
                >
                  <div class="public-users-content-text-message">
                    {{ user.content }}
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <!--底下跑v-for迴圈結束-->
      </div>
      <!--公開聊天室-->
      <div class="public-messages">
        <Message
          :roomId="roomId"
          :initialMessage="Messages"
          :otherUser="otherUser"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NavBars from "./../components/NavBars";
import Message from "./../components/Message.vue";
import { io } from "socket.io-client";
import UserAPI from "./../apis/users";
import { mapState } from "vuex";
import MessageAPI from "./../apis/message";
import IconAddMessage from "../components/icons/IconAddMessage.vue";
import { fromNowFilter } from "./../utils/mixins";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "Private-message",

  mixins: [fromNowFilter],
  components: {
    NavBars,
    Message,
    IconAddMessage,
  },

  data() {
    return {
      socket: [],
      users: [],
      usersCount: 0,
      roomId: "",
      otherUser: {},
      Messages: [],
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

    //創建房間
    async createRoomId(id) {
      try {
        if (id === "home") {
          return;
        }
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
          uuId: uuidv4(),
          text: {
            content: user.content,
          },
        }));

        this.Messages.push(response.data);
        //this.handleScroll(); //滾輪
        this.messageBottom = false;
      } catch (error) {
        console.log(error);
      }
    },

    //使用者的房間列表
    async fetchUsers() {
      try {
        //console.log("有到這裡");
        const response = await MessageAPI.getUsers();
        //console.log("fetchUsers", response.data);
        this.users = response.data.map((user) => ({
          userId: user.user.id,
          avatar: user.user.avatar,
          account: user.user.account,
          name: user.user.name,
          content: user.content,
          createdAt: user.createdAt,
        }));
      } catch (error) {
        console.log(error);
      }
    },

    //收到訊息
    getMessage() {
      this.socket.on("private chat", (obj) => {
        // console.log("msgobj", obj);
        const newMessage = {
          ...obj,
          uuId: uuidv4(),
        };
        if(newMessage.userId === this.currentUser.id || newMessage.userId === this.otherUser.id) {
          this.Messages.push(newMessage);
        }
        
        //console.log("newMessage", newMessage);
        this.updateUserList(newMessage);
      });
    },

    updateUserList(newMessage) {
      const UserListID = []
      this.users.map((user) => {
        UserListID.push(user.userId);
        return
      });
      //console.log("UserListID", UserListID);
      //非使用者送出的信件
      if (newMessage.userId !== this.currentUser.id) {
        this.users.map((user) => {
          if (newMessage.userId === user.userId) {
            user.content = newMessage.text.content;
            user.createdAt = newMessage.createdAt;
            //console.log("傳來訊息，更新旁邊訊息即時通知");
          } else {
            return;
          }
        });
      }
      //使用者傳信件即時更新
      if (newMessage.userId === this.currentUser.id) {
        //console.log('應該會到這裡')
        if (UserListID.indexOf(this.otherUser.id) === -1) {
         // console.log('我傳給新的人唷')
          this.fetchUsers();
        } else {
         // console.log('我傳給舊的人唷')
          this.users.map((user) => {
            if (newMessage.text.receiverId === user.userId) {
              user.content = newMessage.text.content;
              user.createdAt = newMessage.createdAt;
              //console.log("傳出去訊息，更新旁邊訊息即時通知");
            } else {
              return;
            }
          });
        }
      }
    },
  },

  created() {
    const { id } = this.$route.params;
    this.createRoomId(id);
    this.createdSocket();
    this.fetchUsers();
  },

  mounted() {
    // this.debugNotice();
    this.getMessage();
    //this.NoticeUser();
  },
  computed: {
    ...mapState(["currentUser"]),
  },

  beforeRouteUpdate(to, from, next) {
    if (to.name === "Private-message") {
      const { id } = to.params;
      //console.log("toid", id);
      this.createRoomId(id);
      next();
    } else {
      next();
    }
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
  min-width: 250px;
  background-color: white;
  border-left: 1px solid #e6ecf0;
  height: 100vh;
  margin-left: 1.5em;
  //outline: black 1px solid;
  overflow: scroll;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  &-title {
    display: flex;
    background-color: white;
    z-index: 6;
    padding-left: 15px;
    padding-top: 13px;
    position: fixed;
    width: 100%;
    top: 0;
    height: 55px;
    border-bottom: $color-message-gray 1px solid;
    h2 {
      font-size: 18px;
      margin-right: 20%;
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
    .active {
      border-right: 2px solid #FF6600;
    }
    &-img {
      @extend %avatar-size;
      margin-right: 10px;
      flex-shrink: 0;
    }
    &-text {
      width: 100%;
      display: flex;
      justify-content: space-between;
      &-name {
        margin-right: 5px;
        font-size: 15px;
        color: $color-black;
      }
      &-account {
        font-size: 15px;
        color: $color-gray;
      }
      &-time {
        margin-right: 10px;
        font-size: 15px;
        color: $color-gray;
        white-space:nowrap;
      }
      &-message {
        margin-top: 1px;
        font-size: 15px;
        color: $color-gray;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        white-space: normal;
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
    z-index: 8;
    width: 100%;
    height: 120px;
    position: fixed;
    margin-left: 0em;
    margin-top: 52px;
    overflow-x: scroll;
    overflow-y: hidden;
    &::-webkit-scrollbar-button {
      display: block;
    }
    
  }
  .public-users-content {
    margin-top: 55px;

    display: flex;
    &-text {
      white-space:nowrap;
      
      flex-direction: column;
      &-account {
        font-size: 13px;
        display: inline;
        white-space:nowrap;
      }
       &-message {
      display: none;
    }
     &-time {
       font-size: 13px;
       white-space:nowrap;
     }
    }
   
  }
  .public-users-title {
    display: none;
  }
}
</style>