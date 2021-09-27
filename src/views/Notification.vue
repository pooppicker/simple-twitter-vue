<template>
  <div class="container noti-container">
    <div class="notification">
      <div class="navbars">
        <!--navbar-->
        <NavBars />
      </div>
      <div>
       <!-- NOtifications -->
        <Notifications />
      </div>
      <div class="myfollowing">
        <MyFollowing v-if="isMore" />
        <MoreFollowing v-else :onClick="showMore" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBars from "./../components/NavBars.vue"
import MyFollowing from "./../components/MyFollowing.vue"
import MoreFollowing from "./../components/MoreFollowing.vue"
import Notifications from "./../components/Notifications.vue"
export default {
  components: {
    NavBars,
    Notifications,
    MyFollowing,
    MoreFollowing
  },
  data() {
    return {
      isMore: false
    }
  },
  methods: {
    showMore() {
      this.isMore = true
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/efficientSetting.scss";
.noti-container {
  height: 100vh;
  width: 100vw;
  //標示用
 // outline: red 2px solid;
  .notification {
    @extend %views-grid;
    position: relative;
  }
  .myfollowing {
    height: 100vh;
    border-left: 1px solid #e6ecf0;
  }
}

@media screen and (max-width: 768px) {
  .noti-container {
    height: 100%;
    h5 {
      font-size: 15px;
    }
    .notification {
      grid-template-columns: 1fr;
      grid-template-rows: 5fr 20fr;
    }
    }

    
    }
</style>