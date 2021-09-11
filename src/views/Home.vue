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
<<<<<<< HEAD

  },
};
</script>
=======
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
>>>>>>> 1d9fcdf0dea5eb1b3b262b0454bc66cb25d0ac58
