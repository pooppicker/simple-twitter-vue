<template>
  <div class="container">
    <form class="d-flex flex-column align-items-center">
      <div class="text-center mb-4">
        <AcLogo class="mb-4" />
        <h3 class="mb-4">登入 Alphitter</h3>
      </div>
      <div class="input-style mb-2">
        <label class="signin-label" for="account">帳號</label>
        <input
          class="signin-input"
          id="account"
          type="account"
          autofocus
          required
        />
        <div v-show="false" class="error-message">帳號不存在</div>
      </div>

      <div class="input-style mb-2">
        <label class="signin-label" for="password">密碼</label>
        <input
          class="signin-input"
          id="password"
          type="password"
          autofocus
          required
        />
      </div>
      <button type="submit" class="signin-btn mb-3">登入</button>
      <div class="links">
        <p>
          <router-link class="signin-links" to="/signup"
            >註冊 Alphitter</router-link>·<router-link class="signin-links" to="/admin/signin">後台登入</router-link>
        </p>
      </div>
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
.container {
  margin-top: 4rem;
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
  }
  .signin-btn {
    width: 450px;
    height: 40px;
    color: #ffffff;
    font-weight: 700;
    background-color: #ff6600;
    border-radius: 50px;
  }
  .links {
    display: flex;
    justify-content: end;
    min-width: 450px;
    p {
      color: #0099ff;
      font-size: 13px;
      font-weight: 700;
    }
    .signin-links {
      text-decoration: none;
      color: #0099ff;
      border-bottom: 1px solid #0099ff;
      display: inline-block;
    }
  }
}

@import "../assets/scss/efficientSetting.scss";
</style>
