<template>
  <div class="container reply-list">
    <div class="replylist">
      <div class="navbars">
        <NavBars />
      </div>
      <div>
      
        <MiddleOfReply />
        </div>
      
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

//手機
@media screen and (max-width: 768px) {
  .reply-list {
    height: 100%;
    h5 {
      font-size: 15px;
    }
    .replylist {
      grid-template-columns: 1fr;
      grid-template-rows: 5fr 20fr;
    }
    }

    
    }

</style>