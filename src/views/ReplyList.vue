<template>
  <div class="container reply-list">
    <div class="replylist">
      <div class="navbars">
        <NavBars />
      </div>
      
        <MiddleOfReply />
      
      <div>
        <Popular />
      </div>
    </div>
  </div>
</template>

<script>
import NavBars from "./../components/NavBars.vue";
import MiddleOfReply from "./../components/MiddleOfReply.vue";
import Popular from "./../components/Popular.vue";
// @ is an alias to /src

export default {
  components: {
    NavBars,
    Popular,
    MiddleOfReply,
  },
};
</script>

<style lang="scss">
@import "../assets/scss/efficientSetting.scss";
.reply-list {
  height: 100vh;
  width: 100vw;
  .replylist {
    @extend %views-grid;
    position: relative;
  }
}
</style>