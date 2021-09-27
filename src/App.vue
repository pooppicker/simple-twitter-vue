<template>
  <div id="simple-twitter">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "assets/scss/reset.scss";
@import "assets/scss/efficientSetting.scss";
@import "assets/scss/colorAndSize.scss";

#simple-twitter {
  height: 100vh;
  width: 100vw;
}
</style>

<script>
// //import { io } from "socket.io-client";
// export default {
//   data() {
//     return {
//       socket: [],
//     };
//   },

//   // created() {
//   //   const tokenInLocalStorage = localStorage.getItem("token");
//   //   this.socket = io("https://twitter-apis-demo.herokuapp.com", {
//   //     auth: { token: tokenInLocalStorage },
//   //   });
//   //    this.$store.commit("addSocket", this.socket);
//   // },
// };
</script>