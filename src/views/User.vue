<template>
  <div class="container user-container">
    <div class="user-content">
      <div class="navbars">
        <!--navbar-->
        <NavBars />
      </div>
      <div class="user-top">
        <div class="title-area">
          <LeftArrow />
          <div class="user-title">
            <h4 class="user-profile-name">John Doe</h4>
            <span class="span-setting">25 推文</span>
          </div>
          <hr />
        </div>
        <!-- Cover Photo -->
        <div class="cover-area">
          <img
            class="cover-photo"
            src="https://images.unsplash.com/27/perspective.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            alt="cover"
          />
        </div>
        <!-- Images & btn-->
        <div class="edit-area">
          <img
            class="user-avatar"
            src="https://image.flaticon.com/icons/png/512/847/847969.png"
            alt="avatar"
          />
          <button type="submit" class="user-edit-btn">編輯個人資料</button>
        </div>
        <!-- Description -->
        <div class="desc-area">
          <h4 class="user-profile-name">John Doe</h4>
          <span class="span-setting">@heyjohn</span>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint.
          </p>
          <!-- followers -->
          <div class="follow-area">
            <div class="user-following"><span>34 個</span>跟隨中</div>
            <div class="user-follower"><span>59 位</span>跟隨者</div>
          </div>
        </div>
        <!-- Tabs -->
        <div class="user-tabs">
          <div class="tab tab-a">推文</div>
          <div class="tab">推文與回覆</div>
          <div class="tab">喜歡的內容</div>
        </div>
        <!-- userProfile  -->
        <UserProfile />
      </div>
      <div>
        <!--popular-->
        <Popular />
      </div>
    </div>
  </div>
</template>

<script>
import NavBars from "./../components/NavBars.vue";
import UserProfile from "./../components/UserProfile.vue";
import Popular from "./../components/Popular.vue";
import LeftArrow from "./../components/icons/IconBack.vue";

export default {
  components: {
    NavBars,
    Popular,
    UserProfile,
    LeftArrow,
  },
};
</script>

<style lang="scss">
@import "../assets/scss/colorAndSize.scss";

.user-container {
  height: 100vh;
  width: 100vw;
  .user-content {
    display: grid;
    grid-template-columns: 5fr 14fr 8.3fr;
    grid-gap: 1fr;
    height: 100%;
    max-width: 1440px;
    background-color: white;
    margin: 0 auto;
  }
}
.user-top {
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
  .title-area {
    width: 100%;
    display: flex;
    padding: .7rem;
    .user-title {
      display: block;
      margin-left: 2rem;
      line-height: 1;
    }
  }
  .cover-area {
    height: 250px;
    
    img {
      object-fit: cover;
      position: relative;
    }
  }
  .edit-area {
    display: flex;
    justify-content: end;
    .user-avatar {
      position: fixed;
      top: 35%;
      left: 20%;
      width: 140px;
      height: 140px;
      border: 4px solid #FFFFFF;
      border-radius: 50%;
    }
    .user-edit-btn {
      margin: 1rem 1rem;
      border: solid 1px $color-orange;
      color: $color-orange;
      border-radius: 100px;
      width: 120px;
      height: 35px;
      font-weight: bold;
    }
  }
  .desc-area {
    margin: 1rem;
    p {
      margin: .5rem 0;
      color: $color-black;
    }
    .follow-area {
      display: flex;
      font-weight: 400;
      color: $color-gray;
      font-size: 14px;
      cursor: pointer;
      .user-follower {
        margin-left: 1rem;
      }
      span {
        color: $color-black;
        font-weight: 600;
      }
    }
  }
  .user-tabs {
    display: flex;
    border-bottom: 1px solid #E6ECF0;
    .tab {
      // outline: 1px solid black;
      cursor: pointer;
      padding: 0 2rem;
      padding-bottom: .5rem;
      margin: 0 1rem;
      color: $color-gray;
      font-weight: 700;
      font-size: 15px;
    }
    .tab-a {
      color: $color-orange;
      border-bottom: 2px solid $color-orange;
      font-weight: 700;
    }
  }
}
.user-profile-name {
  font-size: 19px;
  color: $color-black;
}
.span-setting {
  font-size: 13px;
  color: $color-gray;
}
</style>
