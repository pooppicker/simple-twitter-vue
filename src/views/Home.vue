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
      grid-template-columns: 1fr;
       grid-template-rows: 5fr 20fr;
    }
    .nav{
        border-bottom: 1px solid #e6ecf0;
      height: 60px;
     flex-direction: row;
     position: fixed;
     width: 100vw;
     background-color: white;
     top:0;
     z-index: 6;
     padding-left: 1em;
     margin: 0 0 0 0;
     ;
    }

    
    .nav-top,.logout {
      display: flex;
      flex-direction: row;;
      .navigation {
        margin: 0 0 0 20px;
        display: flex;
      }

      .ac-logo {
        transform: translate(0, 3px);
      }
      .nav-link {
        width: 100%;
        margin: 0px 0px 0px 0px;
      }
      ul {
        display: flex;
        h4 {
          display: none;
        }
      }
      .nav-icon {
        width: 30px;
        height: 30px;
        margin:0px 10px 0px 0px;
         transform: translate(0, -1px);
      }

    }

    .middle-container {
      width: 100%;
      border-left: white 0px solid;
      margin-left: 0px;
      margin-right: 0px;
      h4 {
        display:none;
      }
      .user-post-panel {
        margin-top: 4em;
      }

    }

    .popular {
      display: none;
    }
  }
}
</style>
