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
              首頁
            </router-link>
          </li>
          <li>
            <router-link class="d-flex nav-link" to="">
              <IconUser />
              個人資料
            </router-link>
          </li>
          <li>
            <router-link class="d-flex nav-link" to="">
              <IconSetting />
              設定
            </router-link>
          </li>
        </ul>
        <button class="post-button">推文</button>
      </div>
    </div>

    <!--登出區塊-->
    <div class="logout">
      <ul>
        <li>
          <router-link class="d-flex nav-link" to="">
            <IconLogout />
            登出
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
.nav {
  border: black 2px solid;
  width: 15%;
  height: 100%;
  padding-top: 14px;
  position: fixed;
  margin-left: 10px;

  justify-content: space-between;
  //連結樣式
  .nav-link {
    //可以用scss改寫
    color: #1c1c1c;
    font-size: 18px;
    margin-bottom: 30px;
    font-style: bold;
    align-items: center;
    height: 100%;
    .nav-icon {
      width: 22.2px;
      margin-right: 21px;
    }

    //連結點按的樣式
    &:hover {
      color: #ff6600; //文字
      .nav-icon {
        .st0 {
          fill: #ff6600; //icon
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
        font-size: 18px;
        border-radius: 100px;
        font-style: bold;
        &:hover {
          transform: scale(1.1, 1.1);
        }
      }
    }
  }
  //下方區域目前沒樣式
}
</style>