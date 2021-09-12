<template>
  <div class="container setting-content">
    <div class="setting">
      <div class="navbars">
        <!--navbar-->
        <NavBars />
      </div>
      <div class="setting-container">
        <h4>帳戶設定</h4>
        <hr />
        <form class="d-flex flex-column align-items-start">
          <div class="input-style mb-2">
            <label class="setting-label" for="account">帳號</label>
            <input
              class="setting-input"
              id="account"
              type="text"
              autofocus
              required
            />
          </div>

          <div class="input-style mb-2">
            <label class="setting-label" for="name">名稱</label>
            <input
              class="setting-input"
              id="name"
              name="name"
              type="text"
              autofocus
              required
            />
          </div>

          <div class="input-style mb-2">
            <label class="setting-label" for="email">Email</label>
            <input
              class="setting-input"
              id="email"
              type="email"
              autofocus
              required
            />
          </div>

          <div class="input-style mb-2">
            <label class="setting-label" for="password">密碼</label>
            <input
              class="setting-input"
              id="password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
            />
          </div>

          <div class="input-style mb-2">
            <label class="setting-label" for="checkPassword">密碼確認</label>
            <input
              class="setting-input"
              id="checkPassword"
              name="checkPassword"
              type="password"
              autocomplete="new-password"
              required
            />
          </div>

          <button type="submit" class="setting-btn mb-3">註冊</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NavBars from "./../components/NavBars.vue";

export default {
  components: {
    NavBars,
  },
};
</script>

<style lang="scss">
.setting-content {
  height: 100vh;
  width: 100vw;
  .setting {
    display: grid;
    grid-template-columns: 5fr 14fr 8.3fr; //已調成grid，比例在這裡喔！
    grid-gap: 1fr; //每個區塊中間的gap
    grid-template-areas: "nav sets sets sets";
    height: 100%; //9/12新增這裡唷！
    max-width: 1440px;
    background-color: white;
    margin: 0 auto;
    //標示用
    // position: relative;
  }
  .navbars {
    grid-area: nav;
  }
  .setting-container {
    grid-area: sets;
    border-left: 1px solid #e6ecf0;
    h4 {
      font-size: 19px;
      padding: 1rem;
    }
  }
}
</style>
