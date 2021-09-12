<template>
  <div class="container py-5">
    <form class="d-flex flex-column align-items-center">
      <div class="text-center mb-4">
        <AcLogo class="mb-4" />
        <h1 class="font-weight-normal">
          登入 Alphitter
        </h1>
      </div>
      <div class="input-style mb-2">
        <label for="account">帳號</label>
        <input id="account" type="account" autofocus required>
      </div>

      <div class="input-style mb-2">
        <label for="password">密碼</label>
        <input id="password" type="password" autofocus required>
      </div>
      <button type="submit" class="btn-signin mb-3">
        登入
      </button>
      <div class="text-center">
        <p>
          <router-link to="/signup">註冊 Alphitter</router-link>
          <router-link to="/admin/signin">·後台登入</router-link>
        </p>
      </div>
    </form>
  </div>
  
</template>

<script>
import AcLogo from "../components/icons/AcLogo.vue"

export default {
  components: {
    AcLogo
  }
}
</script>

<style lang="scss">
.container {
  margin: auto auto;
}
.input-style {
  @extend %input-bottom;
  background-color: #F5F8FA;
  width: 400px;
  height: 60px;
}
label {
  font-size: 13px;
  color: #657786;
  display: block;
}
  
input {
  background-color: #F5F8FA;
  font-size: 19px;
}
  

@import "../assets/scss/efficientSetting.scss"
</style>
