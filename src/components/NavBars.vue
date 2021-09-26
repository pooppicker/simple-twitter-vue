<template>
  <nav class="d-flex nav">
    <div class="nav-top">
      <!--logo區塊-->
      <div class="logo-part">
        <router-link to="/twitter/home" class="text-center"
          ><img class="ac-logo" src="./../assets/ac-logo.png"
        /></router-link>
      </div>
      <!--選項區塊-->
      <div class="navigation">
        <ul>
          <li>
            <router-link class="d-flex nav-link" to="/twitter/home">
              <IconHome />
              <h4>首頁</h4>
            </router-link>
          </li>

          <li>
            <router-link class="d-flex nav-link" to="/twitter/notification">
              <IconBell />
              <h4>通知</h4>
            </router-link>
          </li>

          <li>
            <router-link class="d-flex nav-link" to="/twitter/message/public">
              <IconPublic />
              <h4>公開聊天室</h4>
            </router-link>
          </li>
          
          <li>
            <router-link class="d-flex nav-link" to="/twitter/message/private/home">
            <div class="message-notce"></div>
              <IconPublic />
              <h4>私人訊息</h4>
            </router-link>
          </li>

          <li>
            <router-link
              class="d-flex nav-link"
              :to="{ name: 'User', params: { id: currentUser.id } }"
            >
              <IconUser />
              <h4>個人資料</h4>
            </router-link>
          </li>

          <li>
            <router-link class="d-flex nav-link" :to="{ name: 'Setting'}">
              <IconSetting />
              <h4>設定</h4>
            </router-link>
          </li>
        </ul>
        <button class="post-button" @click="handleOpenModal">
          <h4>推文</h4>
        </button>
        <CreatePostModal v-if="openModal" :onClose="handleCloseModal" 
        @closeModal="handleCloseModal()" />
      </div>
    </div>
    <!--登出區塊-->
    <div class="logout">
      <ul>
        <li>
          <div class="d-flex nav-link" @click.stop.prevent="logout">
            <IconLogout />

            <h4>登出</h4>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import IconLogout from "./icons/IconLogout";
import IconHome from "./icons/IconHome";
import IconBell from "./icons/IconBell.vue"
import IconPublic from "./icons/IconPublic.vue"
import IconSetting from "./icons/IconSetting";
import IconUser from "./icons/IconUser";
import CreatePostModal from "./modal/CreatPostModal.vue";
import { mapState } from "vuex";


export default {
  components: {
    IconLogout,
    IconHome,
    IconSetting,
    IconUser,
    IconBell,
    IconPublic,
    CreatePostModal,
  },

  data() {
    return {
      openModal: false,
    };
  },
  methods: {
    handleOpenModal() {
      this.openModal = true;
    },
    handleCloseModal() {
      this.openModal = false;
    },
    logout () {
      this.$store.commit('revokeAuthentication')
      this.$router.push('/signin')
    }
    
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>




<style lang="scss">
@import "../assets/scss/colorAndSize.scss";

.nav {
  //outline: black 2px solid;
  flex-direction: column;
  height: 100%;
  padding-top: 14px;
  margin-left: 20px;
  justify-content: space-between;
  //連結點按的樣式
  .nav-link {
    //可以用scss改寫
    color: $color-black;
    margin-bottom: 30px;
    align-items: center;
    cursor: pointer;
    height: 100%;
    .nav-icon {
      width: 22.2px;
      margin-right: 21px;
    }

    &:hover,
    .router-link-active {
      color: $color-orange;
      .nav-icon {
        .st0 {
          fill:$color-orange;
        }
      }
    }
  }
  .router-link-active {
    color: $color-orange;
    .nav-icon {
      .st0 {
        fill: $color-orange;
      }
    }
  }
  //上方區域
  .nav-top {
    .ac-logo {
      height: 30px;
      width: 30px;
      &:hover {
        transform: scale(1.1, 1.1);
      }
    }
    .navigation {
      margin-top: 48px;
      .post-button {
        width: 80%;
        height: 38px;
        background-color: $color-orange;
        color: white;
        border-radius: 100px;
        &:hover {
          transform: scale(1.1, 1.1);
        }
      }
    }
  }
}
//手機版
@media screen and (max-width: 768px) {
  .nav {
    border-bottom: 1px solid #e6ecf0;
    height: 60px;
    flex-direction: row;
    position: fixed;
    width: 100vw;
    background-color: white;
    top: 0;
    z-index: 9;
    padding-left: 0em;
    margin: 0 0 0 0;
    justify-content: stretch;
    .nav-top,
    .logout {
      display: flex;
      flex-direction: row;
      margin-right: 2%;
      .navigation {
        margin: 0 0 0 10px;
        display: flex;
      }

      .ac-logo {
        margin-right: 0px;
        transform: translate(0, 6px);
        display: none;
      }
      .nav-link {
        width: 100%;
        margin: 0px 0px 0px 0px;
      }
      ul {
        display: flex;
        h4 {
          display: none;
        }
      }
      .nav-icon {
        width: 35px;
        height:350px;
        margin: 0 20% 0 0;
        transform: translate(0, -1px);
      }
    }
    .nav-top {
      flex: 1;
      .navigation {
        width: 100%;
        
        justify-content: space-between;
        .post-button {
          background-color: rgba(0, 0, 0, 0);
          border: solid 1px $color-orange;
          color: $color-orange;
          margin-right: 2%;

          width: 20%;
          h4 {
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>