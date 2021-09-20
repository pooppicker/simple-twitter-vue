<template>
  <nav class="d-flex flex-column admin-nav">
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
          <router-link class="d-flex nav-link" to="/logOut">
            <IconLogout />

            <h4>登出</h4>
          </router-link>
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
  }
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
  //連結點按的樣式
  .nav-link {
    //可以用scss改寫
    color: $color-black;
    margin-bottom: 30px;
    align-items: center;
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


//電腦版
@media screen and (min-width: 576px) {
.nav {
  height: 100vh;
}
}

}


</style>