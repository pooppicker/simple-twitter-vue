<template>
  <div class="container setting-content">
    <div class="setting">
      <div class="setting-navbars">
        <!--navbar-->
        <NavBars />
      </div>
      <div class="setting-container">
     
        <h4>帳戶設定</h4>
        <form
          class="d-flex flex-column align-items-start"
          
        >
          <div class="setting-rwb">
            <div class="set-input mb-2">
              <label class="setting-label" for="account">帳號</label>
              <input
                v-model="userInfo.account"
                name="account"
                class="setting-input"
                id="account"
                type="text"
                autofocus
              />
            </div>

            <div class="set-input mb-2">
              <label class="setting-label" for="name">名稱</label>
              <input
                v-model="userInfo.name"
                class="setting-input"
                id="name"
                name="name"
                type="text"
                autofocus
              />
            </div>

            <div class="set-input mb-2">
              <label class="setting-label" for="email">Email</label>
              <input
                v-model="userInfo.email"
                name="email"
                class="setting-input"
                id="email"
                type="email"
                autofocus
              />
            </div>

            <div class="set-input mb-2">
              <label class="setting-label" for="password">密碼</label>
              <input
                v-model="userInfo.password"
                class="setting-input"
                id="password"
                name="password"
                type="password"
                autocomplete="new-password"
              />
            </div>

            <div class="set-input mb-2">
              <label class="setting-label" for="checkPassword">密碼確認</label>
              <input
                v-model="userInfo.checkPassword"
                class="setting-input"
                id="checkPassword"
                name="checkPassword"
                type="password"
                autocomplete="new-password"
              />
            </div>
          </div>

          <div class="set-btn">
            <button type="submit" class="setting-btn mb-3" @click.stop.prevent="handleSubmit" :disabled="isProcessing">儲存</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NavBars from "./../components/NavBars.vue";
import UserAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex"; //新增這裡

export default {
  components: {
    NavBars,
  },

  data() {
    return {
      userInfo: {
        id: -1,
        account: "",
        name: "",
        email: "",
        password: "",
        checkPassword: "",
      },
      isProcessing: false,
    };
  },

  created() {
    // const { id } = this.$route.params;
    this.fetchUser();
    // console.log(this.currentUser);
  },
  methods: {
    //這裡我們把原本的api拿資料fetch過程，改成拿vuex的資料fetch

    fetchUser() {
      const { id, account, name, email } = this.currentUser;

      this.userInfo = {
        ...this.userInfo,
        id,
        account,
        name,
        email,
      };
      this.isProcessing = false;
    },

    async handleSubmit() {
      try {
        this.isProcessing = true;
        const { id, account, name, email, password, checkPassword} =this.userInfo;
        
        //確認沒缺格
        if (!account || !name || !email) {
          Toast.fire({
            icon: "warning",
            title: "帳號、姓名與電子信箱為必填",
          });
          this.isProcessing = false;
          return;
        }

        //確認密碼確認跟密碼一樣
        if (password !== checkPassword) {
          Toast.fire({
            icon: "warning",
            title: "密碼與密碼確認內容須相同！",
          });
          this.userInfo.checkPassword = "";
          this.isProcessing = false;
          return;
        }

        //確認帳號格式(不能有空格)

        if (account.indexOf(" ") !== -1) {
          Toast.fire({
            icon: "warning",
            title: "帳號不能有空格",
          });
          this.isProcessing = false;
          return;
        }

        //確認名字格式(不能有空格)

        if (name.length > 50) {
          Toast.fire({
            icon: "warning",
            title: "名稱不能多於50字！",
          });
          this.isProcessing = false;
          return;
        }

        //確認email格式
        if (
          email.indexOf("@") === -1 ||
          email.indexOf(".com") === -1
        ) {
          Toast.fire({
            icon: "warning",
            title: "email須含有@與icom等字元",
          });
          this.isProcessing = false;
          return;
        }

        //console.log(formData);

        const { data } = await UserAPI.editUserAccount({
          userID: id,
          account,
          name,
          email,
          password,
          checkPassword,
        });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: "成功更新資料",
        });

        this.$store.dispatch("fetchCurrentUser");
        this.$router.push({ name: "User", params: { id: this.userInfo.id } });
        this.isProcessing = false;
      } catch (error) {
        console.log(error);
        this.isProcessing = false;
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
            title: "更新失敗，請稍後再試！",
          });
        }
      }
    },
  },
  //新增這裡，把vuex的資料拿出來~等於現在已經有一個data() {return{currentUser:{...}}的資料囉 }
  computed: {
    ...mapState(["currentUser"]),
  },
  //新增這裡！這裏特別注意！因為重新整理之後，路由那裡會再去叫一次currentUser的api，這時候會有時間差，可能畫面渲染好，currentUser才回來，所以要再監聽一次看資料有沒有變化
  watch: {
    currentUser: {
      handler: function () {
        this.fetchUser();
      },
      deep: true,
    },
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
      .setting-rwb {
        width: 100%;
        padding: 0 1em;
      }
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
