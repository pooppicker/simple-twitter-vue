<template>
  <div class="container signup-container">
    <form class="d-flex flex-column align-items-center">
      <div class="text-center mb-4">
        <AcLogo class="mb-4" />
        <h3 class="mb-4">建立你的帳號</h3>
      </div>
      <div class="input-style mb-2">
        <label class="signin-label" for="account">帳號</label>
        <input
          class="signin-input"
          id="account"
          type="text"
          autofocus
          required
        />
      </div>

      <div class="input-style mb-2">
        <label class="signin-label" for="name">名稱</label>
        <input
          class="signin-input"
          id="name"
          name="name"
          type="text"
          autofocus
          required
        />
      </div>

      <div class="input-style mb-2">
        <label class="signin-label" for="email">Email</label>
        <input
          class="signin-input"
          id="email"
          type="email"
          autofocus
          required
        />
      </div>

      <div class="input-style mb-2">
        <label class="signin-label" for="password">密碼</label>
        <input
          class="signin-input"
          id="password"
          name="password"
          type="password"
          autocomplete="new-password"
          required
        />
      </div>

      <div class="input-style mb-2">
        <label class="signin-label" for="checkPassword">密碼確認</label>
        <input
          class="signin-input"
          id="checkPassword"
          name="checkPassword"
          type="password" 
          autocomplete="new-password"
          required
        />
      </div>

      <button type="submit" class="signin-btn mb-3">註冊</button>

      <router-link class="go-back-link" to="/signin">取消</router-link>
    </form>
  </div>
</template>

<script>
import AcLogo from "../components/icons/AcLogo.vue";

export default {
  components: {
    AcLogo,
  },
};
</script>

<style lang="scss">
.signup-container {
  padding-top: 4rem;
  height: 100vh;
  width: 100vw;
  .input-style {
    @extend %input-bottom;
    background-color: #f5f8fa;
    width: 450px;
    height: 52px;
    margin-bottom: 2rem;
  }
  .signin-label {
    font-size: 13px;
    color: #657786;
    display: block;
  }
  .signin-input {
    background-color: #f5f8fa;
    font-size: 15px;
    margin-bottom: 0.5rem;
    width: 100%;
  }
  .signin-btn {
    width: 450px;
    height: 40px;
    color: #ffffff;
    font-weight: 700;
    background-color: #ff6600;
    border-radius: 50px;
  }
  .go-back-link {
    text-decoration: none;
    color: #0099ff;
    border-bottom: 1px solid #0099ff;
    font-weight: 700;
    font-size: 13px;
  }
}

@import "../assets/scss/efficientSetting.scss";
</style>