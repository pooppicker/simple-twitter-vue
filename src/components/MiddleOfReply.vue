<template>
  <div class="title-area">
    <router-link to="/"><LeftArrow /></router-link>
    <div class="user-title">
      <h4 class="user-profile-name">推文</h4>
    </div>
    <hr />
  </div>
</template>

<script>
import LeftArrow from "./../components/icons/IconBack.vue";

const dummyTweet = {
  id: 5,
  description: "eaque",
  createdAt: "2021-07-07T19:31:27.000Z",
  LikesCount: 1,
  isLike: "false",
  User: {
    id: 2,
    name: "user1",
    avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
    account: "@user1",
  },
  Replies: [
    {
      id: 13,
      comment: "quisquam",
      createdAt: "2021-07-07T19:31:27.000Z",
      User: {
        id: 4,
        name: "user3",
        cover:
          "https://images.unsplash.com/photo-1567261585152-02a94eeda80a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1190&q=80",
        account: "@user1",
      },
    },
    {
      id: 14,
      comment: "cum",
      createdAt: "2021-07-07T19:31:27.000Z",
      User: {
        id: 5,
        name: "user4",
        cover:
          "https://images.unsplash.com/photo-1621328895567-f909e923c9d1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        account: "@user1",
      },
    },
    {
      id: 15,
      comment: "suscipit",
      createdAt: "2021-07-07T19:31:27.000Z",
      User: {
        id: 6,
        name: "user5",
        cover:
          "https://images.unsplash.com/photo-1621328895567-f909e923c9d1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        account: "@user1",
      },
    },
  ],
};
</script>
