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
      <div class="popular">
        <!--popular-->
        <Popular />
      </div>
    </div>
  </div>
</template>

<script>
import NavBars from "./../components/NavBars.vue"
import Popular from "./../components/Popular.vue"
import Notifications from "./../components/Notifications.vue"
export default {
  components: {
    NavBars,
    Notifications,
    Popular
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
}
</style>