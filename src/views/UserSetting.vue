<template>
  <div class="container setting-content">
    <div class="setting">
      <div class="setting-navbars">
        <!--navbar-->
        <NavBars />
      </div>
      <div class="setting-container">
        <h4>帳戶設定</h4>
        <hr />
        <form class="d-flex flex-column align-items-start">
          <div class="set-input mb-2">
            <label class="setting-label" for="account">帳號</label>
            <input
              class="setting-input"
              id="account"
              type="text"
              autofocus
              required
            />
          </div>

          <div class="set-input mb-2">
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

          <div class="set-input mb-2">
            <label class="setting-label" for="email">Email</label>
            <input
              class="setting-input"
              id="email"
              type="email"
              autofocus
              required
            />
          </div>

          <div class="set-input mb-2">
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

          <div class="set-input mb-2">
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
          <div class="set-btn">
            <button type="submit" class="setting-btn mb-3">儲存</button>
          </div>
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
    grid-template-columns: 5fr 14fr 8.3fr;
    grid-gap: 1fr;
    grid-template-areas: "nav sets sets";
    height: 100%;
    max-width: 1440px;
    background-color: white;
    margin: 0 auto;
  }
  .setting-navbars {
    grid-area: nav;
  }
  .setting-container {
    grid-area: sets;
    border-left: 1px solid #e6ecf0;
    h4 {
      font-size: 19px;
      padding: 1rem;
    }
    .set-input {
      @extend %input-bottom;
      background-color: #f5f8fa;
      width: 642px;
      height: 52px;
      margin: 1rem 0 1rem 0.7rem;
      border-radius: 4px 4px 0px 0px;
    }
    .setting-label {
      font-size: 13px;
      color: #657786;
      display: block;
    }
    .setting-input {
      background-color: #f5f8fa;
      font-size: 15px;
      margin-bottom: 0.5rem;
      width: 100%;
    }
    .set-btn {
      min-width: 642px;
      display: flex;
      justify-content: end;
      .setting-btn {
        width: 90px;
        height: 36px;
        color: #ffffff;
        font-weight: 700;
        background-color: #ff6600;
        border-radius: 50px;
      }
    }
  }
}
@import "../assets/scss/efficientSetting.scss";
</style>
