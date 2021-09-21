<template>
  <div class="container adminmain-content">
    <div class="adminmain">
      <div class="navbars">
        <!--navbar-->
        <AdminNavBars />
      </div>
      <div class="admintweet-list">
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
  //outline: red 2px solid;
  .adminmain {
    @extend %views-grid;
    grid-template-columns: 5fr 21.3fr 0fr;
    //標示用
    // outline: green 2px solid;
    position: relative;
    .admintweet-list{
      position: relative;
    }
  }
}

@media screen and (max-width: 768px) {
  .adminmain-content {
    height: 100%;
    width: 100vw;

    h5 {
      font-size: 15px;
    }
    .adminmain {
      grid-template-columns:0fr 1fr;
      grid-template-rows: 5fr 20fr;
    }
  }
}

</style>
