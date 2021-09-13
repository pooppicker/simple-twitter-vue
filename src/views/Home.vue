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
  outline: red 2px solid;
  .home {
    @extend %views-grid;
    //標示用
    // outline: green 2px solid;
    position: relative;
  }
}

//嘗試rwd
@media screen and (max-width: 1200px) {
  .home-content {
    height: 100vh;
    h5 {
      font-size: 10px;
    }
  }
}

@media screen and (max-width: 992px) {
  .middle-container {
    h4 {
      width: 30em;
    }
  }
  .popular {
    .btn {
      display: none;
    }
  }
}

@media screen and (max-width: 768px) {
  .home-content {
    height: 100%;
    .home {
      grid-template-columns: 5fr 20fr;
    }
    .nav-top,.logout {
      .nav-link {
        flex-direction: column;
        width: 100%;
        margin: 0px 0px 0px 0px;
      }
      ul {
        h4 {
          display: none;
        }
      }
      .nav-icon {
        width: 50px;
        height: 50px;
        margin:0px 0px 20px 0px;
      }
    }

    .popular {
      display: none;
    }
  }
}
</style>
