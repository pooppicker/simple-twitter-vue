<template>
  <div class="admin-spinner-content d-flex">
    <h3>權限不足，無法瀏覽此頁面</h3>
    <img class="ac-logo-spinner" src="../assets/ac-logo.png" />

    <h5 class="go-back" @click.stop.prevent="previousPage">點我返回上一頁</h5>
  </div>
</template>

<style lang="scss">
.admin-spinner-content {
  padding: 35vh 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: white;
  flex-direction: column;
  z-index: 4;
  .ac-logo-spinner {
    margin: 0 auto;
    width: 5em;
    height: 5em;
    animation: logo 3s ease infinite normal;
  }
  h3 {
    border-left: 4px #ff6600 solid;
    border-right: 4px #ff6600 solid;
    padding: 0.3em 0.8em;
    margin: 0px auto 50px auto;
    color: #ff6600;
  }
  h5 {
    border: 2px #ff6600 solid;
    border-radius: 50px;
    margin: 50px auto 0 auto;
    animation-duration: 0.2s;
    animation: textpart 0.6s infinite alternate;
    color: white;
    padding: 0.3em 0.8em;
    background-color: #ff6600;
  }
}
@keyframes textpart {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 1;
    transform: translateY(-1.5rem);
  }
}
@keyframes logo {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script>
export default {
  methods: {
    previousPage() {
      this.$router.back();
    },
  },
};
</script>