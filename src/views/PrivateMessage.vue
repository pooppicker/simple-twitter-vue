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
        </div>
        <div class="public-users-content">
          <!--底下跑v-for迴圈-->
          <div v-for="user in users" :key="user.id">
            <div class="public-users-content-card">
              <img class="public-users-content-img" :src="user.avatar" />
              <div style="width: 100%">
                <div class="public-users-content-text">
                  <div class="public-users-content-detail d-flex">
                    <div class="public-users-content-text-name">
                      {{ user.name }}
                    </div>
                    <div class="public-users-content-text-account">
                      @{{ user.account }}
                    </div>
                  </div>
                  <div class="public-users-content-text-time">訊息時間</div>
                </div>
                <div class="public-users-content-text-message">
                  這裡是多多文字區
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--底下跑v-for迴圈結束-->
      </div>
      <!--公開聊天室-->
      <div class="public-messages">
        <Message :roomId="roomId" />
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
      roomId: "",
      otherUser: {},
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
        const { id } = this.$route.params;
        const reponse = await UserAPI.getUser({ userID: id });
        this.otherUser = reponse.data;
        if (this.otherUser.id < this.currentUser.id) {
          this.roomId = `${this.otherUser.id}0${this.currentUser.id}`;
          this.enterMessage();
        } else {
          this.roomId = `${this.currentUser.id}0${this.otherUser.id}`;
          this.enterMessage();
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

    //通知哪位使用者上線/離線
    // NoticeUser() {
    //   this.socket.on("active users", (obj) => {
    //     //console.log("obj", obj);
    //     this.usersCount = obj.userCount;
    //     this.users = obj.activeUsers;
    //     // console.log("message:", this.users);
    //   });
    // },

    //後端確認收到訊息通知
    debugNotice() {
      this.socket.on("debug notice", (obj) => {
        console.log(obj);
      });
    },
  },

  created() {
    this.createRoomId();
    this.createdSocket();
  },

  mounted() {
    this.debugNotice();
    //this.NoticeUser();
  },
  computed: {
    ...mapState(["currentUser"]),
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
  background-color: white ;
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
      margin-right: 10px;
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
        margin-right: 15px;
        font-size: 15px;
        color: $color-gray;
      }
      &-message {
        margin-top: 1px;
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
    z-index: 6;
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