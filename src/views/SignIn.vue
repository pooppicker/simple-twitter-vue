<template>
  <div class="container signin-container">
    <form
      class="d-flex flex-column align-items-center"
      @submit.prevent.stop="handleSubmit"
    >
      <div class="text-center mb-4">
        <AcLogo class="mb-4" />
        <h3 class="mb-4">登入 Alphitter</h3>
      </div>
      <div class="input-style mb-2">
        <label class="signin-label" for="account">帳號</label>
        <input
          v-model="account"
          class="signin-input"
          id="account"
          type="account"
          autofocus
          required
        />
      </div>

      <div class="input-style mb-2">
        <label class="signin-label" for="password" 
          >密碼</label
        >
        <input
          v-model="password"
          class="signin-input"
          id="password"
          type="password"
          autofocus
          required
        />
      </div>
      <button
        v-if="isProcessing"
        type="submit"
        class="signin-btn mb-3"
        @click.stop.prevent="handleSubmit"
        disabled
      >
        驗證中 ...
      </button>
      <button
        v-else
        type="submit"
        class="signin-btn mb-3"
        @click.stop.prevent="handleSubmit"
      >
        登入
      </button>
      <div class="links">
        <p>
          <router-link class="signin-links" to="/signup"
            >註冊 Alphitter</router-link
          >·<router-link class="signin-links" to="/admin/signin"
            >後台登入</router-link
          >
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import AcLogo from "../components/icons/AcLogo.vue";
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    AcLogo,
  },
  data() {
    return {
      account: "",
      password: "",
      isProcessing: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.account || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "請填入 帳號 和 密碼",
          });
          return;
        }
        this.isProcessing = true;
        const response = await authorizationAPI.signIn({
          account: this.account,
          password: this.password,
        });
        const { data } = response;
        console.log(data)

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        localStorage.setItem("token", data.token);
        console.log(data.token)
        this.$router.push('/twitter/Home')
      } catch (error) {
        console.log(error)
        this.password = "";
        this.isProcessing = false;

        Toast.fire({
          icon: "warning",
          title: "請確認您輸入了正確的帳號密碼",
        });
      }
    },
  },
};
</script>






<!--樣式分隔線-->
<style lang="scss">
.signin-container {
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
    &:disabled {
      opacity: 0.6;
    }
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
  .error-message {
    border-bottom: 2px solid #fc5a5a;
    font-size: 13px;
    color: #fc5a5a;
  }
}

@import "../assets/scss/efficientSetting.scss";
</style>
