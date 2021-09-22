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
          v-model="account"
          class="signin-input"
          id="account"
          type="text"
          autofocus
          required
        />
        <div class="input-hint" v-if="!accountCorrect">帳號不可有空白！</div>
      </div>

      <div class="input-style mb-2">
        <label class="signin-label" for="name">名稱</label>
        <input
          v-model="name"
          class="signin-input"
          id="name"
          name="name"
          type="text"
          autofocus
          required
        />
        <div class="input-hint" v-if="!nameCorrect">名稱不可超過50個字！</div>
      </div>

      <div class="input-style mb-2">
        <label class="signin-label" for="email">Email</label>
        <input
          v-model="email"
          class="signin-input"
          id="email"
          type="email"
          autofocus
          required
        />
        <div class="input-hint" v-if="!emailCorrect">
          信箱格式錯誤，須含有 "@"、".com" 等字符！
        </div>
      </div>

      <div class="input-style mb-2">
        <label class="signin-label" for="password">密碼</label>
        <input
          v-model="password"
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
          v-model="passwordChecked"
          class="signin-input"
          id="checkPassword"
          name="checkPassword"
          type="password"
          autocomplete="new-password"
          required
        />
        <div class="input-hint" v-if="!passwordCorrect">
          密碼確認須與密碼相同！
        </div>
      </div>
      <button
        v-if="isProcessing"
        type="submit"
        class="signin-btn mb-3"
        disabled
        @click.stop.prevent="handleSubmit"
      >
        建立帳號中...
      </button>

      <button
        v-else
        type="submit"
        class="signin-btn mb-3"
        :disabled="
          !account || !password || !email || !password || !passwordChecked
        "
        @click.stop.prevent="handleSubmit"
      >
        註冊
      </button>

      <router-link class="go-back-link" to="/signin">取消</router-link>
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
      name: "",
      email: "",
      password: "",
      passwordChecked: "",
      isProcessing: false,
      passwordCorrect: true,
      nameCorrect: true,
      emailCorrect: true,
      accountCorrect: true,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.isProcessing = true;
        //確認沒缺格
        if (
          !this.account ||
          !this.name ||
          !this.email ||
          !this.password ||
          !this.passwordChecked
        ) {
          Toast.fire({
            icon: "warning",
            title: "請確認資料皆已填妥",
          });
          this.isProcessing = false;
          return;
        }

        //確認密碼確認跟密碼一樣
        if (this.password !== this.passwordChecked) {
          this.passwordCorrect = false;
          this.passwordChecked = "";
        }

        //確認帳號格式(不能有空格)

        if (this.account.indexOf(" ") !== -1) {
          this.accountCorrect = false;
        }

        //確認名字格式(不能有空格)

        if (this.name.length > 50) {
          this.nameCorrect = false;
        }

        //確認email格式
        if (this.email.indexOf("@") === -1 || this.email.indexOf(".com") === -1) {
          this.emailCorrect = false;
        }

        //有以上任一狀況通通return

        if (
          this.password !== this.passwordChecked ||
          this.account.indexOf(" ") !== -1 ||
          this.name.length > 50 ||
          this.email.indexOf("@") === -1 ||
          this.email.indexOf(".com") === -1
        ) {
          this.isProcessing = false;
          return;
        }

        //以下是成功欄

        this.passwordCorrect = true;
        this.nameCorrect = true;
        this.emailCorrect = true;
        this.accountCorrect = true;
        this.isProcessing = true;
        console.log();
        const response = await authorizationAPI.signUp({
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.passwordChecked,
        });
        const { data } = response;
        console.log(data);

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        localStorage.setItem("token", data.token);
        Toast.fire({
          icon: "success",
          title: "註冊成功！請以帳號密碼登入！",
        });
        this.$router.push("/signin");
        //以下是打api回傳錯誤內容
      } catch (error) {
        this.password = "";
        this.passwordChecked = "";
        this.isProcessing = false;
        console.log(error);
        if (error.message === "This account name has been registered") {
          Toast.fire({
            icon: "warning",
            title: "帳號已重覆註冊",
          });
        } else if (error.message === "This email has been registered") {
          Toast.fire({
            icon: "warning",
            title: "Email已重覆註冊",
          });
        } else {
          Toast.fire({
            icon: "warning",
            title: "註冊失敗，請稍後再試！",
          });
        }
      }
    },
  },
};
</script>

<!--樣式分隔線-->

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
    &:disabled {
      opacity: 0.6;
    }
  }
  .go-back-link {
    text-decoration: none;
    color: #0099ff;
    border-bottom: 1px solid #0099ff;
    font-weight: 700;
    font-size: 13px;
  }
  .input-hint {
    font-size: 13px;
    color: #fc5a5a;
  }
}

//手機
@media screen and (max-width: 768px) {
  .signup-container {
    padding: 5em 2em;
    height: 100%;
    .input-style {
      width: 100%
    }
    .signin-btn {
      width: 100%;
    }
     .links{
       min-width: 100%
  }
  }
}

@import "../assets/scss/efficientSetting.scss";
</style>