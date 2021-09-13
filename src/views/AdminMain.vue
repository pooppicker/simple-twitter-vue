<template>
  <div class="container adminmain-content">
    <div class="adminmain">
      <div class="navbars">
        <!--navbar-->
        <AdminNavBars />
      </div>
      <div>
        <!--middle of home-->
        <AdminTweetList
        :innitialTweets="tweets" />
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavBars from "./../components/AdminNavBars";
import AdminTweetList from "./../components/AdminTweetList";
//import Popular from "./../components/Popular";
// @ is an alias to /src

const dummyTweets = [
  {
    isLike: false,
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut maximus est. Phasellus placerat magna vitae iaculis blandit. Praesent luctus, lectus in blandit volutpat, neque lectus dictum erat, nec gravida nisl lectus ut turpis. Vivamus eget odio est. Nullam a neque eros. Nam molestie blandit erat nec ultricies. Nam eget velit cursus, ultrices elit quis, pellentesque nibh. Pellentesque sed leo dolor. Pellentesque porta aliquam ex vitae laoreet. Vestibulum bibendum auctor facilisis. Nullam faucibus lobortis ipsum quis ornare. Cras commodo nibh purus, in efficitur nunc interdum nec. Donec dignissim aliquam egestas. Ut sed erat leo.",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "user1",
      avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
      account: "@user1",
    },
  },
  {
    isLike: false,
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut maximus est. Phasellus placerat magna vitae iaculis blandit. Praesent luctus, lectus in blandit volutpat, neque lectus dictum erat, nec gravida nisl lectus ut turpis. Vivamus eget odio est. Nullam a neque eros. Nam molestie blandit erat nec ultricies. Nam eget velit cursus, ultrices elit quis, pellentesque nibh. Pellentesque sed leo dolor. Pellentesque porta aliquam ex vitae laoreet. Vestibulum bibendum auctor facilisis. Nullam faucibus lobortis ipsum quis ornare. Cras commodo nibh purus, in efficitur nunc interdum nec. Donec dignissim aliquam egestas. Ut sed erat leo.",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "user1",
      avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
      account: "@user1",
    },
  },
  {
    isLike: true,
    TweetId: 3,
    createdAt: "2021-07-07T19:31:27.000Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut maximus est. Phasellus placerat magna vitae iaculis blandit. Praesent luctus, lectus in blandit volutpat, neque lectus dictum erat, nec gravida nisl lectus ut turpis. Vivamus eget odio est. Nullam a neque eros. Nam molestie blandit erat nec ultricies. Nam eget velit cursus, ultrices elit quis, pellentesque nibh. Pellentesque sed leo dolor. Pellentesque porta aliquam ex vitae laoreet. Vestibulum bibendum auctor facilisis. Nullam faucibus lobortis ipsum quis ornare. Cras commodo nibh purus, in efficitur nunc interdum nec. Donec dignissim aliquam egestas. Ut sed erat leo.",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "user1",
      avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
      account: "@user1",
    },
  },
  {
    isLike: false,
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut maximus est. Phasellus placerat magna vitae iaculis blandit. Praesent luctus, lectus in blandit volutpat, neque lectus dictum erat, nec gravida nisl lectus ut turpis. Vivamus eget odio est. Nullam a neque eros. Nam molestie blandit erat nec ultricies. Nam eget velit cursus, ultrices elit quis, pellentesque nibh. Pellentesque sed leo dolor. Pellentesque porta aliquam ex vitae laoreet. Vestibulum bibendum auctor facilisis. Nullam faucibus lobortis ipsum quis ornare. Cras commodo nibh purus, in efficitur nunc interdum nec. Donec dignissim aliquam egestas. Ut sed erat leo.",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "user1",
      avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
      account: "@user1",
    },
  },
  {
    isLike: false,
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut maximus est. Phasellus placerat magna vitae iaculis blandit. Praesent luctus, lectus in blandit volutpat, neque lectus dictum erat, nec gravida nisl lectus ut turpis. Vivamus eget odio est. Nullam a neque eros. Nam molestie blandit erat nec ultricies. Nam eget velit cursus, ultrices elit quis, pellentesque nibh. Pellentesque sed leo dolor. Pellentesque porta aliquam ex vitae laoreet. Vestibulum bibendum auctor facilisis. Nullam faucibus lobortis ipsum quis ornare. Cras commodo nibh purus, in efficitur nunc interdum nec. Donec dignissim aliquam egestas. Ut sed erat leo.",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "user1",
      avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
      account: "@user1",
    },
  },
  {
    isLike: false,
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut maximus est. Phasellus placerat magna vitae iaculis blandit. Praesent luctus, lectus in blandit volutpat, neque lectus dictum erat, nec gravida nisl lectus ut turpis. Vivamus eget odio est. Nullam a neque eros. Nam molestie blandit erat nec ultricies. Nam eget velit cursus, ultrices elit quis, pellentesque nibh. Pellentesque sed leo dolor. Pellentesque porta aliquam ex vitae laoreet. Vestibulum bibendum auctor facilisis. Nullam faucibus lobortis ipsum quis ornare. Cras commodo nibh purus, in efficitur nunc interdum nec. Donec dignissim aliquam egestas. Ut sed erat leo.",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "user1",
      avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
      account: "@user1",
    },
  },
    {
    isLike: false,
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut maximus est. Phasellus placerat magna vitae iaculis blandit. Praesent luctus, lectus in blandit volutpat, neque lectus dictum erat, nec gravida nisl lectus ut turpis. Vivamus eget odio est. Nullam a neque eros. Nam molestie blandit erat nec ultricies. Nam eget velit cursus, ultrices elit quis, pellentesque nibh. Pellentesque sed leo dolor. Pellentesque porta aliquam ex vitae laoreet. Vestibulum bibendum auctor facilisis. Nullam faucibus lobortis ipsum quis ornare. Cras commodo nibh purus, in efficitur nunc interdum nec. Donec dignissim aliquam egestas. Ut sed erat leo.",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "user1",
      avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
      account: "@user1",
    },
  },
  {
    isLike: false,
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut maximus est. Phasellus placerat magna vitae iaculis blandit. Praesent luctus, lectus in blandit volutpat, neque lectus dictum erat, nec gravida nisl lectus ut turpis. Vivamus eget odio est. Nullam a neque eros. Nam molestie blandit erat nec ultricies. Nam eget velit cursus, ultrices elit quis, pellentesque nibh. Pellentesque sed leo dolor. Pellentesque porta aliquam ex vitae laoreet. Vestibulum bibendum auctor facilisis. Nullam faucibus lobortis ipsum quis ornare. Cras commodo nibh purus, in efficitur nunc interdum nec. Donec dignissim aliquam egestas. Ut sed erat leo.",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "user1",
      avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
      account: "@user1",
    },
  },
  {
    isLike: true,
    TweetId: 3,
    createdAt: "2021-07-07T19:31:27.000Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut maximus est. Phasellus placerat magna vitae iaculis blandit. Praesent luctus, lectus in blandit volutpat, neque lectus dictum erat, nec gravida nisl lectus ut turpis. Vivamus eget odio est. Nullam a neque eros. Nam molestie blandit erat nec ultricies. Nam eget velit cursus, ultrices elit quis, pellentesque nibh. Pellentesque sed leo dolor. Pellentesque porta aliquam ex vitae laoreet. Vestibulum bibendum auctor facilisis. Nullam faucibus lobortis ipsum quis ornare. Cras commodo nibh purus, in efficitur nunc interdum nec. Donec dignissim aliquam egestas. Ut sed erat leo.",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "user1",
      avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
      account: "@user1",
    },
  },
  {
    isLike: false,
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut maximus est. Phasellus placerat magna vitae iaculis blandit. Praesent luctus, lectus in blandit volutpat, neque lectus dictum erat, nec gravida nisl lectus ut turpis. Vivamus eget odio est. Nullam a neque eros. Nam molestie blandit erat nec ultricies. Nam eget velit cursus, ultrices elit quis, pellentesque nibh. Pellentesque sed leo dolor. Pellentesque porta aliquam ex vitae laoreet. Vestibulum bibendum auctor facilisis. Nullam faucibus lobortis ipsum quis ornare. Cras commodo nibh purus, in efficitur nunc interdum nec. Donec dignissim aliquam egestas. Ut sed erat leo.",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "user1",
      avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
      account: "@user1",
    },
  },
  {
    isLike: false,
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut maximus est. Phasellus placerat magna vitae iaculis blandit. Praesent luctus, lectus in blandit volutpat, neque lectus dictum erat, nec gravida nisl lectus ut turpis. Vivamus eget odio est. Nullam a neque eros. Nam molestie blandit erat nec ultricies. Nam eget velit cursus, ultrices elit quis, pellentesque nibh. Pellentesque sed leo dolor. Pellentesque porta aliquam ex vitae laoreet. Vestibulum bibendum auctor facilisis. Nullam faucibus lobortis ipsum quis ornare. Cras commodo nibh purus, in efficitur nunc interdum nec. Donec dignissim aliquam egestas. Ut sed erat leo.",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "user1",
      avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
      account: "@user1",
    },
  },
  {
    isLike: false,
    TweetId: 1,
    createdAt: "2021-07-07T19:31:27.000Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut maximus est. Phasellus placerat magna vitae iaculis blandit. Praesent luctus, lectus in blandit volutpat, neque lectus dictum erat, nec gravida nisl lectus ut turpis. Vivamus eget odio est. Nullam a neque eros. Nam molestie blandit erat nec ultricies. Nam eget velit cursus, ultrices elit quis, pellentesque nibh. Pellentesque sed leo dolor. Pellentesque porta aliquam ex vitae laoreet. Vestibulum bibendum auctor facilisis. Nullam faucibus lobortis ipsum quis ornare. Cras commodo nibh purus, in efficitur nunc interdum nec. Donec dignissim aliquam egestas. Ut sed erat leo.",
    LikesCount: 2,
    RepliesCount: 2,
    User: {
      id: 2,
      name: "user1",
      avatar: "https://image.flaticon.com/icons/png/512/847/847969.png",
      account: "@user1",
    },
  },
];

export default {
  name: "Home",
  components: {
    AdminNavBars,
    AdminTweetList,
  },
  data() {
    return {
      tweets: [],
    };
  },

  methods: {
    fetchTweets() {
      this.tweets = dummyTweets;
    },
  },

  created() {
    this.fetchTweets();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/efficientSetting.scss";
.adminmain-content {
  height: 100vh;
  width: 100vw;
  //標示用
  outline: red 2px solid;
  .adminmain {
    @extend %views-grid;
    grid-template-columns: 5fr 21.3fr;
    //標示用
    // outline: green 2px solid;
    position: relative;
  }
}
</style>
