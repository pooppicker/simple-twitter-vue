<template>
  <nav class="d-flex  admin-nav">
    <div class="nav-top">
      <!--logo區塊-->
      <div class="logo-part">
        <router-link :to="{name: 'admin-main'}" class="text-center"
          ><img class="ac-logo" src="./../assets/ac-logo.png"
        /></router-link>
      </div>
      <!--選項區塊-->
      <div class="navigation">
        <ul>
          <li>
            <router-link class="d-flex nav-link" :to="{name: 'admin-main'}">
              <IconHome />
              <h4>推文清單</h4>
            </router-link>
          </li>

          <li>
            <router-link class="d-flex nav-link" :to="{name: 'admin-users'}">
              <IconUser />
              <h4>使用者列表</h4>
            </router-link>
          </li>

        </ul>

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
//import IconSetting from "./icons/IconSetting";
import IconUser from "./icons/IconUser";

const dummtCurretUser ={ 
  "id": 15,
  "email": "user1@example.com",
  "name": "user1",
  "avatar": "https://image.flaticon.com/icons/png/512/847/847969.png",
  "introduction": null,
  "role": "user",
  "account": "user1",
  "cover": "https://images.unsplash.com/27/perspective.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  "createdAt": "2021-07-05T11:04:52.000Z",
  "updatedAt": "2021-07-05T11:04:52.000Z",
  "Followers": [],
  "Followings": [],
  "Likes": []
}

export default {
  components: {
    IconLogout,
    IconHome,
    //IconSetting,
    IconUser,
  },

  data() {
    return {
      curretUser: dummtCurretUser
    }
  },
  methods: {
  logout(){
        localStorage.removeItem('admin-token')
    this.$router.push('/admin/signin')
  }}
};



</script>




<style lang="scss">
@import "../assets/scss/colorAndSize.scss";

  .admin-nav {
  //outline: black 2px solid;
  height: 100%;
  padding-top: 14px;
  margin-left: 20px;
  justify-content: space-between;
  flex-direction: column;
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

    &:hover,.router-link-exact-active {
      color: #ff6600;
      .nav-icon {
        .st0 {
          fill: #ff6600;
        }
      }
    }
  }
  .router-link-exact-active {
      color: $color-orange;
      .nav-icon {
        .st0 {
          fill:$color-orange;
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
  }
  }
  //下方區域目前沒樣式

}

//手機版

@media screen and (max-width: 768px) {
  .admin-nav {
    flex-direction: row;
    border-bottom: 1px solid #e6ecf0;
    height: 60px;
    position: fixed;
    width: 100vw;
    background-color: white;
    top: 0;
    z-index: 6;
    padding-left: 1em;
    margin: 0 0 0 0;
    justify-content: stretch;
    .nav-top,
    .logout {
      display: flex;
      flex-direction: row;
      .navigation {
        margin: 0 0 0 20px;
        display: flex;
      }

      .ac-logo {
        transform: translate(0, 6px);
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
        width: 50px;
        height: 50px;
        margin: 0 30% 0 20%;
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