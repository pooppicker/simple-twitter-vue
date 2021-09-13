<template>
  <div class="container adminmain-content">
    <div class="adminmain">
    <div class="navbars">
      <!--navbar-->
      <AdminNavBars />
    </div>
    <div>
      <!--middle of home-->
      <MiddleOfHome />
    </div>

    </div>
  </div>
</template>

<script>
import AdminNavBars from "./../components/AdminNavBars";
import MiddleOfHome from "./../components/MiddleOfHome";
//import Popular from "./../components/Popular";
// @ is an alias to /src


export default {
  name: "Home",
  components: {
    AdminNavBars,
    MiddleOfHome
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
    //標示用
   // outline: green 2px solid; 
    position: relative;
  }
}
</style>
