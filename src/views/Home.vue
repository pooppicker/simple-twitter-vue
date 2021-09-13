<template>
  <div class="container home-content">
    <div class="home">
    <div class="navbars">
      <!--navbar-->
      <NavBars />
    </div>
    <div>
      <!--middle of home-->
      <MiddleOfHome />
    </div>
    <div>
      <!--popular-->
      <Popular />
    </div>
    </div>
  </div>
</template>

<script>
import NavBars from "./../components/NavBars";
import MiddleOfHome from "./../components/MiddleOfHome";
import Popular from "./../components/Popular";
// @ is an alias to /src


export default {
  name: "Home",
  components: {
    NavBars,
    Popular,
    MiddleOfHome
  },
};
</script>

<style lang="scss">
@import "../assets/scss/efficientSetting.scss";
.home-content {
  height: 100vh;
  width: 100vw;
  //標示用
  outline: red 2px solid;
  .home {
    @extend %views-grid;
    //標示用
   // outline: green 2px solid; 
    position: relative;
  }
}
</style>
