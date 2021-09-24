<template>
  <div class="message-part">
    <div class="message-title">
      <h2>公開聊天室</h2>
    </div>
    <div class="message-show">
      <!--上線-->
      <div class="message-info">
        <p class="message-info-text">李喵吉 上線</p>
      </div>
      <div class="message-other">
        <img
          class="message-other-img"
          src="https://booksfromtaiwan.tw/images/authors_img/20200114033913%E6%80%AA%E5%A5%87%E4%BA%8B%E7%89%A9%E6%89%80%E6%89%80%E9%95%B7.png"
        />
        <div class="message-other-content">
          <div class="message-other-content-text">
            推薦大家去看怪奇事務所、ptt
            morvel版，喵吉真可愛，我好想睡覺又好想切版，484有病
          </div>
          <div class="message-other-content-time">發送時間</div>
        </div>
      </div>
      <div class="message-self">
        <div class="message-self-text">
          大家好我是李喵吉二號今年三歲，興趣吃飯睡覺大吼大叫，最近流行不播貓砂，好爽喔
        </div>
        <div class="message-self-time">發送時間</div>
      </div>
    </div>
    <div class="message-input">
      <input
        class="message-input-area"
        type="text"
        placeholder="輸入訊息..."
        required
        autofocus
        v-model="inputMessage"
      />
      <div class="message-input-icon">
        <IconSendMessage />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/colorAndSize.scss";
@import "../assets/scss/efficientSetting.scss";
.message-part {
  position: relative;
  height: 100vh;
  border-left: $color-message-gray 1px solid;
  overflow: scroll;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  .message-title {
    padding-left: 15px;
    padding-top: 13px;
    position: fixed;
    width: 100%;
    top: 0;
    height: 55px;
    border-bottom: $color-message-gray 1px solid;
  }
  .message-show {
    padding-top: 2%;
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 55px;
    .message-info {
       margin-bottom: 15px;
       padding-bottom: 15px;
     
      display: flex;

      &-text {
        
        font-size: 15px;
        color: $color-gray;
        display: inline-block;
        margin: 0 auto;
        padding: 5px 14px;
        background-color: $color-bg-dark;
        border-radius: 50px;
      }
    }
    .message-other {
      display: flex;
      margin-top: 20px;
      align-items: flex-end;
      &-img {
        border-radius: 100%;
        object-fit: cover;
        height: 40px;
        width: 40px;
        transform: translateY(-20px);
      }
      &-content {
        max-width: 70%;
        margin-left: 12px;
        &-text {
          padding: 15px 10px;
          background-color: $color-message-gray;
          color: $color-black;
          font-size: 15px;
          border-top-right-radius: 25px;
          border-top-left-radius: 25px;
          border-bottom-right-radius: 25px;
        }
        &-time {
          font-size: 13px;
          color: $color-gray;
        }
      }
    }
    .message-self {
      
      margin-top: 20px;
      width: 100%;
      padding-left: 30%;
      text-align: right;
      &-text {
        padding: 15px 10px;
        text-align: left;
        background-color: $color-orange;
        font-size: 15px;
        border-top-right-radius: 25px;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        color: white;
      }
      &-time {
        font-size: 13px;
        color: $color-gray;
      }
    }
  }
  .message-input {
    height: 55px;
    position: fixed;
    bottom: 0;
    border-top: $color-message-gray 1px solid;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;

    &-area {
      height: 32px;
      display: block;
      width: 40%;
      background-color: $color-message-gray;
      border-radius: 50px;
      margin-right: 1%;
      padding-left: 15px;
    }
  }
}
</style>





<script>
import IconSendMessage from "./../components/icons/IconSendMessage.vue";
export default {
  name: "Message",
  components: {
    IconSendMessage,
  },
  data() {
    return {
      inputMessage: "",
    };
  },
};
</script>