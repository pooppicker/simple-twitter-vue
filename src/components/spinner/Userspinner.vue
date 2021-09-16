<template>
  <div class="user-spinner-content d-flex">
    <img class="ac-logo-spinner" src="./../../assets/ac-logo.png" />
    <h3>使用者資料努力載入中...</h3>
  </div>
</template>

<style lang="scss">
.user-spinner-content {
  padding: 50% 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: white;
  flex-direction: column;
  z-index: 10;
  .ac-logo-spinner {
    margin: 0 auto;
    width: 5em;
    height: 5em;
    animation: logo 3s ease infinite normal;
  }
  h3 {
    margin: 50px auto 0 auto;
    animation: textpart  0.6s infinite alternate;
    animation-duration: 0.1s;
    color: #FF6600;;
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
  0%{transform:rotate(0deg);}
  100%{transform:rotate(360deg);}
}
</style>