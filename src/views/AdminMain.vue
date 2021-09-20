<template>
  <div class="container adminmain-content">
    <div class="adminmain">
      <div class="navbars">
        <!--navbar-->
        <AdminNavBars />
      </div>
      <div>
        <!--middle of home-->
        <AdminTweetList />
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavBars from "./../components/AdminNavBars";
import AdminTweetList from "./../components/AdminTweetList";

//import Popular from "./../components/Popular";
// @ is an alias to /src


export default {
  name: "Home",
  components: {
    AdminNavBars,
    AdminTweetList,
  },
};
</script>

<style lang="scss">
@import "../assets/scss/efficientSetting.scss";
.adminmain-content {
  height: 100vh;
  width: 100vw;
  //標示用
  outline: red 2px solid;
  .adminmain {
    @extend %views-grid;
    grid-template-columns: 5fr 21.3fr;
    //標示用
    // outline: green 2px solid;
    position: relative;
  }
}
</style>
