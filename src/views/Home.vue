<template>
  <div class="container home">
    <div class="home">
    <div>
      <!--navbar-->
      <NavBars />
    </div>
    <div>
      <!--middle of home-->
    </div>
    <div>
      <!--popular-->
    </div>
    </div>
  </div>
</template>

<script>
import NavBars from "./../components/NavBars";
// @ is an alias to /src


export default {
  name: "Home",
  components: {
    NavBars,
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
  //標示用
  border: red 2px solid;
  .home {
    max-width: 1440px;
    background-color:white;
    margin: 0 auto;
  }
}
</style>
