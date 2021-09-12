<template>
  <div class="container py-5">
    <form class="w-100">
      <div class="text-center mb-4">
        <AcLogo class="mb-4" />
        <h1 class="font-weight-normal">
          登入 Alphitter
        </h1>
      </div>
      <div class="text-center mb-2">
        <label for="account">帳號</label>
        <input id="account" type="account" class="form-control" autofocus required>
      </div>

      <div class="text-center mb-2">
        <label for="password">密碼</label>
        <input id="password" type="password" class="form-control" autofocus required>
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
