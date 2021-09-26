<template>
  <div class="notification-area">
    <div class="noti-title">
      <h4>通知</h4>
    </div>
    <hr>
    <div class="noti-content">
      <img class="noti-avatar" src="https://i.ytimg.com/vi/Q9o4MumeWj8/maxresdefault.jpg" alt="">
      <h6 class="noti-new">JoJo 有新的推文通知</h6>
      <p>Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. </p>
    </div>
    <div class="noti-content">
      <img class="noti-avatar" src="https://i.ytimg.com/vi/Q9o4MumeWj8/maxresdefault.jpg" alt="">
      <h6 class="noti-new">JoJo 有新的回覆</h6>
      <p>Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. </p>
    </div>
    <div class="noti-content">
      <img class="noti-avatar" src="https://cdn.myanimelist.net/images/characters/15/422168.jpg" alt="">
      <h6 class="noti-new">Gojou 開始追蹤你</h6>
    </div>
    <div class="noti-content">
      <img class="noti-avatar" src="https://i.ytimg.com/vi/Q9o4MumeWj8/maxresdefault.jpg" alt="">
      <h6 class="noti-new">你的貼文有新的回覆</h6>
      <p>Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. </p>
    </div>
    <div class="noti-content">
      <img class="noti-avatar" src="https://i.ytimg.com/vi/Q9o4MumeWj8/maxresdefault.jpg" alt="">
      <h6 class="noti-new">JoJo 喜歡你的貼文</h6>
    </div>
    <div class="noti-content">
      <img class="noti-avatar" src="https://i.ytimg.com/vi/Q9o4MumeWj8/maxresdefault.jpg" alt="">
      <h6 class="noti-new">JoJo 喜歡你的貼文</h6>
    </div>
  </div>
</template>

<style lang="scss">
.notification-area {
  height: 100vh;
  width: 100%;
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .noti-title {
    padding: 0.7rem;
  }
  .noti-content {
    border-bottom: 1px solid #e6ecf0;
    padding: 0.7rem 0 0.7rem 0.7rem;
    .noti-avatar {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      object-fit: cover;
      cursor: pointer;
    }
    .noti-new {
      font-size: 15px;
      color: #1C1C1C;
      line-height: 2.1;
    }
    p {
      width: 90%;
      color: #657786;
      font-size: -15px;
      cursor: pointer;
    }
  }
}
</style>