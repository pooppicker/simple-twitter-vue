<template>
  <nav class="d-flex flex-column nav">
    <div class="nav-top">
      <!--logo區塊-->
      <div class="logo-part">
        <router-link to="/" class="text-center"
          ><img class="ac-logo" src="./../assets/ac-logo.png"
        /></router-link>
      </div>
      <!--選項區塊-->
      <div class="navigation">
        <ul>
          <li>
            <router-link class="d-flex nav-link" to="">
              <IconHome />
              <h4>首頁</h4>
            </router-link>
          </li>

          <li>
            <router-link class="d-flex nav-link" to="/twitter/user">
              <IconUser />
              <h4>個人資料</h4>
            </router-link>
          </li>

          <li>
            <router-link class="d-flex nav-link" to="/twitter/Setting">
              <IconSetting />
              <h4>設定</h4>
            </router-link>
          </li>
        </ul>
        <button class="post-button">
          <h4>推文</h4>
        </button>
      </div>
    </div>
    <!--登出區塊-->
    <div class="logout">
      <ul>
        <li>
          <router-link class="d-flex nav-link" to="">
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
import IconSetting from "./icons/IconSetting";
import IconUser from "./icons/IconUser";
export default {
  components: {
    IconLogout,
    IconHome,
    IconSetting,
    IconUser,
  },
};
</script>

<style lang="scss">
@import "../assets/scss/colorAndSize.scss";


  .nav {
  outline: black 2px solid;
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

    &:hover {
      color: #ff6600;
      .nav-icon {
        .st0 {
          fill: #ff6600;
        }
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
        width: 90%;
        height: 38px;
        background-color: #ff6600;
        color: white;
        border-radius: 100px;
        &:hover {
          transform: scale(1.1, 1.1);
        }
      }
    }
  }
  //下方區域目前沒樣式


//電腦版
@media screen and (min-width: 576px) {
.nav {
 outline: black 2px solid;
  height: 100vh;
}
}

}


</style>