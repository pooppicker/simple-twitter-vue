<template>
  <div class="container admin-signin-container">
    <form
      class="d-flex flex-column align-items-center"
      @submit.stop.prevent="handleSubmit"
    >
      <div class="text-center mb-4">
        <AcLogo class="mb-4" />
        <h3 class="mb-4">後台登入</h3>
      </div>
      <div class="input-style mb-2">
        <label class="signin-label" for="account">Email</label>
        <input
          v-model="account"
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
      <div class="a-link">
        <router-link class="admin-signin-link" to="/signin"
          >前台登入</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import AcLogo from "../components/icons/AcLogo.vue";
import adminAuthorizationAPI from "../apis/adminAuthorization";
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
        this.isProcessing = true;
        if (!this.account || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "請填入 Email 和 密碼",
          });
          this.isProcessing = false;
          return;
        }
        const { data } = await adminAuthorizationAPI.SignIn({
          email: this.account,
          password: this.password,
        });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: "登入成功",
        });
        localStorage.setItem("admin-token", data.token);
        this.$router.push("/admin/main");
      } catch (error) {
        this.account = "";
        this.password = "";
        this.isProcessing = false;
        Toast.fire({
          icon: "warning",
          title: "請確認您輸入了正確的Email和密碼",
        });
      }
    },
  },
};
</script>

<style lang="scss">
.admin-signin-container {
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
  .a-link {
    min-width: 450px;
    display: flex;
    justify-content: end;
    // outline: 1px solid black;
    .admin-signin-link {
      text-decoration: none;
      color: #0099ff;
      border-bottom: 1px solid #0099ff;
      display: inline-block;
      font-size: 13px;
      font-weight: 700;
    }
  }
}

//手機
@media screen and (max-width: 768px) {
  .admin-signin-container {
    padding: 5em 2em;
    height: 100%;
    .input-style {
      width: 100%;
    }
    .signin-btn {
      width: 100%;
    }
    .a-link {
      min-width: 100%;
    }
  }
}

@import "../assets/scss/efficientSetting.scss";
</style>
