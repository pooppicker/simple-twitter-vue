<template>
  <div class="container setting-content">
    <div class="setting">
      <div class="setting-navbars">
        <!--navbar-->
        <NavBars />
      </div>
      <div class="setting-container">
        <h4>帳戶設定</h4>
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
@import "../assets/scss/efficientSetting.scss";
.setting-content {
  height: 100vh;
  width: 100vw;
  .setting {
    @extend %views-grid;
    grid-template-areas: "nav sets sets";
  }
  .setting-navbars {
    grid-area: nav;
  }
  .setting-container {
    grid-area: sets;
    border-left: 1px solid #e6ecf0;
    margin-left: 1.3%;
    overflow: scroll;
    h4 {
      // outline: 1px solid black;
      border-bottom: 1px solid #e6ecf0;
      font-size: 19px;
      padding: 0.7rem;
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
//手機板
@media screen and (max-width: 768px) {
  .setting-content {
    .setting {
      grid-template-columns: 0fr 1fr 0fr;
    }
    .setting-container {
      border-left: none;
      margin-left: 0;
    }
    .setting-container {
      h4 {
        // outline: 1px solid black;
        margin-top: 3em;
        width: 100vw;
        background-color: $color-orange;
        border-bottom: 1px solid #e6ecf0;
        font-size: 19px;
        padding: 0.7rem;
        color: white;
      }
      .set-input {
        width: 100%;
        margin: 1rem 0 1rem 0rem;
      }
      .set-btn {
        min-width: 100%;
        padding-right: 1em;
      }
    }
  }
}
</style>
