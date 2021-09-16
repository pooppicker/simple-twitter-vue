<template>
  <div class="user-spinner-content d-flex">
    <img class="ac-logo-spinner" src="../assets/ac-logo.png" />
    <h4>使用者資料努力載入中</h4>
  </div>
</template>

<style lang="scss">
.user-spinner-content {
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
  h4 {
    border: 2px #FF6600 solid;
    border-radius:50px ;
    padding: 0.3em  0.8em;
    margin: 50px auto 0 auto;
    animation: textpart  0.6s infinite alternate;
    animation-duration: 0.2s;
    color:#FF6600;
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