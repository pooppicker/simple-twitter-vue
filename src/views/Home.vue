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
.home-content {
  height: 100vh;
  width: 100vw;
  //標示用
  outline: red 2px solid;
  .home {
    display:grid;
    grid-template-columns: 5fr 13fr 9fr; //已調成grid，比例在這裡喔！
    grid-gap: 1fr;//每個區塊中間的gap
    height:100%; //9/12新增這裡唷！
    max-width: 1440px;
    background-color:white;
    margin: 0 auto;
    //標示用
   // outline: green 2px solid; 
    position: relative;
  }
}
</style>
