<template>
  <div class="container home-content">
    <div class="home">
      <div class="navbars">
        <!--navbar-->
        <NavBars />
      </div>
      <div>
        <!--middle of home-->
        <MiddleOfHome 
        />
      </div>
      <div class="popular">
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
    MiddleOfHome,
  },
};
</script>

<style lang="scss">
@import "../assets/scss/efficientSetting.scss";
.home-content {
  height: 100vh;
  width: 100vw;
  //標示用
 // outline: red 2px solid;
  .home {
    @extend %views-grid;
    //標示用
    // outline: green 2px solid;
    position: relative;
  }
}

//嘗試rwd

@media screen and (max-width: 1022px) {
  .home-content {
    .middle-container {
      .middle-h4 {
        width: 30em;
      }
    }
   /* .popular {
      .btn {
        display: none;
      }
    }*/
  }
}

@media screen and (max-width: 768px) {
  .home-content {
    height: 100%;
    h5 {
      font-size: 15px;
    }
    .home {
      grid-template-columns: 1fr;
      grid-template-rows: 5fr 20fr;
    }

    .middle-container {
      width: 100vw;
      border-left: white 0px solid;
      margin-left: 0px;
      margin-right: 0px;
      .middle-h4 {
        top: 3em;
        width: 100%;
        background-color: $color-orange;
        color: white;
      }
      .user-post-panel {
        margin-top: 7em;
      }
    }
   

    /*.popular {
      display: none;
    }*/
  }
}
</style>
