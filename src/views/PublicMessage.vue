<template>
  <div class="container public-message-content">
    <div class="public-message">
      <div class="navbars">
        <!--navbar-->
        <NavBars />
      </div>
      <!--上線使用者-->
      <div>

      </div>
      <!--公開聊天室-->
      <div>
        <Message />

      </div>
    </div>
  </div>
</template>

<script>
import NavBars from "./../components/NavBars";
import Message from "./../components/Message.vue";

export default {
  name: "Public-message",
  components: {
    NavBars,
    Message
  },
};
</script>

<style lang="scss">
@import "../assets/scss/efficientSetting.scss";
.public-message-content {
  height: 100vh;
  width: 100vw;
  //標示用
 // outline: red 2px solid;
  .public-message {
    @extend %views-grid;
    grid-template-columns: 5fr 9fr 11.5fr;
    //標示用
    // outline: green 2px solid;
    position: relative;
  }
}

</style>