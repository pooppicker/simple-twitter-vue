(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5e9c619c"],{"4ab5":function(t,e,s){"use strict";s("eaef")},"9f73":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"user-profile-area"},[t._l(t.tweets,(function(s){return e("div",{key:s.TweetId},[e("div",{staticClass:"tweet-card d-flex"},[e("img",{staticClass:"user-self-img",attrs:{src:s.User.avatar}}),e("div",{staticClass:"tweet-detail"},[e("div",{staticClass:"tweet-detail-title d-flex"},[e("h5",[t._v(t._s(s.User.name))]),e("p",{staticClass:"post-time"},[t._v(" @"+t._s(s.User.account)+"·"+t._s(t._f("fromNow")(s.createdAt))+" ")])]),e("router-link",{attrs:{to:{name:"Reply-list",params:{id:s.TweetId}}}},[e("p",{staticClass:"tweet-detail-text"},[t._v(" "+t._s(s.description)+" ")])]),e("div",{staticClass:"tweet-detail-icon d-flex"},[e("div",{staticClass:"reply-part d-flex",on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.catchTweetInfo(s)}}},[e("IconReply"),e("div",{staticClass:"icon-text"},[t._v(t._s(s.RepliesCount))])],1),e("div",{staticClass:"liked-part d-flex"},[s.isLike?e("div",{on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.cancelHeart(s)}}},[e("IconHeartFilled")],1):e("div",{on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.addHeart(s)}}},[e("IconHeartEmpty")],1),e("div",{staticClass:"icon-text"},[t._v(t._s(s.LikesCount))])])])],1)]),e("hr")])})),t.openModal?e("ReplyPostModal",{attrs:{onClose:t.handleCloseModal,initialTweet:t.tweet},on:{closeModal:t.handleCloseModal}}):t._e()],2)},i=[],o=s("a908"),n=s("9aad"),l=s("7557"),c=s("2708"),r=s("d359"),d=s("4cce"),u=s("2fa3"),p=s("6783"),w=s("2f62"),f={mixins:[c["b"]],components:{IconReply:o["a"],IconHeartEmpty:l["a"],ReplyPostModal:r["a"],IconHeartFilled:n["a"]},data(){return{tweets:[],openModal:!1}},created(){const{id:t}=this.$route.params;this.fetchTweets(t)},methods:{async fetchTweets(t){try{const e=await d["a"].getUserTweets({userID:t});this.tweets={...e.data}}catch(e){console.log(e.message),u["a"].fire({icon:"error",title:"找不到使用者推文"})}},async addHeart(t){try{const{TweetId:e}=t;t.LikesCount=t.LikesCount+1,t.isLike=!t.isLike,await p["a"].postTweetLiked({tweetId:e})}catch(e){console.log(e),u["a"].fire({icon:"error",title:"無法加入喜歡的貼文，請稍後再試"}),t.LikesCount=t.LikesCount-1,t.isLike=!t.isLike}},async cancelHeart(t){try{const{TweetId:e}=t;t.LikesCount=t.LikesCount-1,t.isLike=!t.isLike,await p["a"].postTweetUnliked({tweetId:e})}catch(e){console.log(e),u["a"].fire({icon:"error",title:"無法取消喜歡的貼文，請稍後再試"}),t.LikesCount=t.LikesCount+1,t.isLike=!t.isLike}},catchTweetInfo(t){console.log(t),this.tweet=t,this.handleOpenModal()},handleOpenModal(){this.openModal=!0},handleCloseModal(){this.openModal=!1}},beforeRouteUpdate(t,e,s){const{id:a}=t.params;this.fetchTweets(a),s()},watch:{isNewPost:{handler:function(){const{id:t}=this.$route.params;this.fetchTweets(t)},deep:!0}},computed:{...Object(w["b"])(["isNewPost"])}},C=f,h=(s("4ab5"),s("2877")),k=Object(h["a"])(C,a,i,!1,null,null,null);e["default"]=k.exports},a908:function(t,e,s){"use strict";var a=function(){var t=this,e=t._self._c;return e("svg",{attrs:{width:"13",height:"14",viewBox:"0 0 13 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[e("path",{attrs:{d:"M7.77875 0.90127L5.18625 0.89502H5.185C2.45125 0.89502 0.309998 3.03689 0.309998 5.77127C0.309998 8.33252 2.30125 10.275 4.97562 10.3775V12.77C4.97562 12.8375 5.00312 12.9488 5.05062 13.0219C5.13937 13.1625 5.29062 13.2388 5.44562 13.2388C5.53187 13.2388 5.61875 13.215 5.69687 13.165C5.86187 13.06 9.7425 10.5775 10.7519 9.72377C11.9406 8.71752 12.6519 7.24252 12.6537 5.77877V5.76814C12.65 3.03877 10.51 0.901269 7.77875 0.900644V0.90127ZM10.1456 9.00877C9.43687 9.60877 7.10687 11.1369 5.91312 11.9106V9.91877C5.91312 9.66002 5.70375 9.45002 5.44437 9.45002H5.19687C2.90937 9.45002 1.24812 7.90252 1.24812 5.77127C1.24812 3.56252 2.97812 1.83252 5.18562 1.83252L7.7775 1.83877H7.77875C9.98625 1.83877 11.7162 3.56752 11.7175 5.77377C11.7156 6.96752 11.1287 8.17627 10.1462 9.00877H10.1456Z",fill:"#657786"}})])},i=[],o=s("2877"),n={},l=Object(o["a"])(n,a,i,!1,null,null,null);e["a"]=l.exports},eaef:function(t,e,s){}}]);
//# sourceMappingURL=chunk-5e9c619c.dce2149f.js.map