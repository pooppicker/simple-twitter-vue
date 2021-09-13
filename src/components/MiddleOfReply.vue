<template>
  <div class="reply-list-area">
    <!-- Title -->
    <div class="title-area">
      <router-link to="/"><LeftArrow /></router-link>
      <div class="user-title">
        <h4 class="user-profile-name">推文</h4>
      </div>
      <hr />
    </div>
    <!-- Single Comment -->
    <div class="txt-area">
      <div class="image-and-name">
        <img
          class="user-sm-avatar"
          src="https://source.unsplash.com/1600x1200/?man/?random=15.46792589859454"
          alt="avatar"
        />
        <div class="name-account">
          <h4>Apple</h4>
          <span>@apple</span>
        </div>
      </div>
      <!-- paragraph and time -->
      <div class="para">
        <p>
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum.
        </p>
        <span>上午 10:05・2020年6月10日</span>
      </div>
      <!-- comments and likes -->
      <div class="comments-area">
       <div class="coms-amount"><strong>30 </strong>回覆</div>
       <div class="likes-amount"><strong>808 </strong>喜歡次數</div>
      </div>
      <!-- icons -->
      <div class="icons-area">
        <IconReply class="ic" />
        <IconHeartEmpty class="ic ic-right" />
      </div>
    </div>
  </div>
</template>

<script>
import LeftArrow from "./../components/icons/IconBack.vue";
import IconReply from "./../components/icons/IconReply.vue";
import IconHeartEmpty from "./../components/icons/IconHeartEmpty.vue";
// const dummyTweet = {
//   id: 5,
//   description: "eaque",
//   createdAt: "2021-07-07T19:31:27.000Z",
//   LikesCount: 1,
//   isLike: "false",
//   User: {
//     id: 2,
//     name: "user1",
//     avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
//     account: "@user1",
//   },
//   Replies: [
//     {
//       id: 13,
//       comment: "quisquam",
//       createdAt: "2021-07-07T19:31:27.000Z",
//       User: {
//         id: 4,
//         name: "user3",
//         cover:
//           "https://images.unsplash.com/photo-1567261585152-02a94eeda80a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1190&q=80",
//         account: "@user1",
//       },
//     },
//     {
//       id: 14,
//       comment: "cum",
//       createdAt: "2021-07-07T19:31:27.000Z",
//       User: {
//         id: 5,
//         name: "user4",
//         cover:
//           "https://images.unsplash.com/photo-1621328895567-f909e923c9d1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         account: "@user1",
//       },
//     },
//     {
//       id: 15,
//       comment: "suscipit",
//       createdAt: "2021-07-07T19:31:27.000Z",
//       User: {
//         id: 6,
//         name: "user5",
//         cover:
//           "https://images.unsplash.com/photo-1621328895567-f909e923c9d1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         account: "@user1",
//       },
//     },
//   ],
// };

export default {
  components: {
    LeftArrow,
    IconReply,
    IconHeartEmpty
  },
};
</script>

<style lang="scss">
@import "../assets/scss/colorAndSize.scss";
@import "../assets/scss/efficientSetting.scss";
.reply-list-area {
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e6ecf0;
  margin-left: 2%;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .title-area {
    background-color: white;
    position: fixed;
    z-index: 3;
    width: 100%;
    padding: 0.7rem;
    display: flex;
    border-bottom: 1px solid #e6ecf0;
    .user-title {
      margin-left: 2rem;
    }
  }
  .txt-area {
    display: flex;
    flex-direction: column;
    margin-top: 3.2rem;
    padding: 1rem;
    // outline: 1px solid black;
    .image-and-name {
      display: flex;
      // outline: 1px solid black;
      img {
        margin-right: 1rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
      }
      h4 {
        font-size: 15px;
        font-weight: 700;
        color: $color-black;
      }
      span {
        font-size: 15px;
        color: $color-gray;
      }
    }
    .para {
      border-bottom: 1px solid #e6ecf0;
      padding-bottom: 1rem;
      p {
        margin: 1rem 0;
        width: 80%;
        height: 136px;
        font-size: 25px;
        line-height: 34px;
        color: $color-black;
      }
      span {
        font-size: 15px;
        color: $color-gray;
        padding-bottom: 1rem;
      }
    }
    .comments-area {
      display: flex;
      padding: 1.5rem 0;
      border-bottom: 1px solid #e6ecf0;
      color: $color-gray;
      font-size: 19px;
      strong {
        color: $color-black;
      }
      .coms-amount {
        cursor: pointer;
      }
      .likes-amount {
        margin-left: 2rem;
        cursor: pointer;
      }
    }
    .icons-area {
      display: flex;
      padding: 1.5rem 0;
      border-bottom: 1px solid #e6ecf0;
      .ic {
        width: 28px;
        height: 28px;
      }
      .ic-right {
        margin-left: 10rem;
      }
    }
  }
}

.user-profile-name {
  font-size: 18px;
  color: $color-black;
}
.span-setting {
  font-size: 13px;
  color: $color-gray;
}
</style>