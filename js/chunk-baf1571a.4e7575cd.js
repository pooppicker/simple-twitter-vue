(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-baf1571a"],{"1aa8":function(t,s,a){"use strict";var e=function(){var t=this,s=t._self._c;return s("nav",{staticClass:"d-flex admin-nav"},[s("div",{staticClass:"nav-top"},[s("div",{staticClass:"logo-part"},[s("router-link",{staticClass:"text-center",attrs:{to:{name:"admin-main"}}},[s("img",{staticClass:"ac-logo",attrs:{src:a("6c6c")}})])],1),s("div",{staticClass:"navigation"},[s("ul",[s("li",[s("router-link",{staticClass:"d-flex nav-link",attrs:{to:{name:"admin-main"}}},[s("IconHome"),s("h4",[t._v("推文清單")])],1)],1),s("li",[s("router-link",{staticClass:"d-flex nav-link",attrs:{to:{name:"admin-users"}}},[s("IconUser"),s("h4",[t._v("使用者列表")])],1)],1)])])]),s("div",{staticClass:"logout"},[s("ul",[s("li",[s("div",{staticClass:"d-flex nav-link",on:{click:function(s){return s.stopPropagation(),s.preventDefault(),t.logout.apply(null,arguments)}}},[s("IconLogout"),s("h4",[t._v("登出")])],1)])])])])},n=[],i=(a("14d9"),a("7be9")),r=a("d308"),o=a("2e0e");const c={id:15,email:"user1@example.com",name:"user1",avatar:"https://image.flaticon.com/icons/png/512/847/847969.png",introduction:null,role:"user",account:"user1",cover:"https://images.unsplash.com/27/perspective.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",createdAt:"2021-07-05T11:04:52.000Z",updatedAt:"2021-07-05T11:04:52.000Z",Followers:[],Followings:[],Likes:[]};var l={components:{IconLogout:i["a"],IconHome:r["a"],IconUser:o["a"]},data(){return{curretUser:c}},methods:{logout(){localStorage.removeItem("admin-token"),this.$router.push("/admin/signin")}}},d=l,u=(a("239e"),a("2877")),m=Object(u["a"])(d,e,n,!1,null,null,null);s["a"]=m.exports},"239e":function(t,s,a){"use strict";a("4b91")},"37ae":function(t,s,a){"use strict";a("58f2")},"4b91":function(t,s,a){},5685:function(t,s,a){"use strict";a("6eb7")},"58f2":function(t,s,a){},6135:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t._self._c;return s("div",{staticClass:"container adminmain-content"},[s("div",{staticClass:"adminmain"},[s("div",{staticClass:"navbars"},[s("AdminNavBars")],1),s("div",[s("AdminUsersList")],1)])])},n=[],i=a("1aa8"),r=function(){var t=this,s=t._self._c;return s("div",{staticClass:"container adminUsers-container"},[s("h4",[t._v("使用者列表")]),t.isProcessing?s("Spinner"):t._e(),s("div",{staticClass:"adminUsers-part d-flex"},t._l(t.users,(function(a){return s("div",{key:a.id,staticClass:"adminUser-card"},[s("div",{staticClass:"adminUsers-image"},[s("div",{staticClass:"adminUsers-avatar"},[s("router-link",{attrs:{to:{name:"User",params:{id:a.id}}}},[s("img",{attrs:{src:a.avatar}})])],1),s("div",{staticClass:"adminUsers-coverimage"},[s("img",{attrs:{src:a.cover}})])]),s("div",{staticClass:"adminUsers-info"},[s("router-link",{attrs:{to:{name:"User",params:{id:a.id}}}},[s("h5",[t._v(t._s(t._f("accountLength")(a.name)))])]),s("p",[t._v("@"+t._s(a.account))])],1),s("div",{staticClass:"adminUsers-icon d-flex"},[s("div",{staticClass:"adminUsers-message-icon d-flex"},[s("IconLiked"),s("p",[t._v(t._s(a.TweetsCount))])],1),s("div",{staticClass:"adminUsers-heart-com d-flex"},[s("IconHeartEmpty"),s("p",[t._v(t._s(a.LikesCount))])],1)]),s("div",{staticClass:"adminUsers-follow d-flex"},[s("div",{staticClass:"adminUsers-following"},[s("router-link",{staticStyle:{"text-decoration":"none",color:"#1C1C1C"},attrs:{to:{name:"User-following",params:{id:a.id}}}},[t._v(" "+t._s(a.FollowingCount)+"位"),s("span",[t._v("跟隨中")])])],1),s("div",{staticClass:"adminUsers-follower"},[s("router-link",{staticStyle:{"text-decoration":"none",color:"#1C1C1C"},attrs:{to:{name:"User-follower",params:{id:a.id}}}},[t._v(" "+t._s(a.FollowersCount)+"位"),s("span",[t._v("跟隨者")])])],1)])])})),0)],1)},o=[],c=a("2708"),l=a("cf65"),d=a("7557"),u=a("be6c"),m=a("d948"),v={components:{IconLiked:l["a"],IconHeartEmpty:d["a"],Spinner:m["a"]},mixins:[c["b"],c["d"]],data(){return{users:[],isProcessing:!0}},created(){this.fetchUsers()},methods:{async fetchUsers(){try{const t=await u["a"].adminGetUsers();this.users={...t.data},this.isProcessing=!1}catch(t){console.log(t.message)}}}},f=v,p=(a("a8ed"),a("2877")),C=Object(p["a"])(f,r,o,!1,null,null,null),g=C.exports,h={name:"AdminUsers",components:{AdminNavBars:i["a"],AdminUsersList:g}},_=h,U=(a("37ae"),Object(p["a"])(_,e,n,!1,null,null,null));s["default"]=U.exports},"6eb7":function(t,s,a){},a8ed:function(t,s,a){"use strict";a("d1ca")},be6c:function(t,s,a){"use strict";var e=a("2fa3");const n=()=>localStorage.getItem("admin-token");s["a"]={adminGetTweets(){return e["b"].get("/admin/tweets",{headers:{Authorization:"Bearer "+n()}})},adminGetUsers(){return e["b"].get("/admin/users",{headers:{Authorization:"Bearer "+n()}})},delete({tweetId:t}){return e["b"].delete("/admin/tweets/"+t,{headers:{Authorization:"Bearer "+n()}})}}},d1ca:function(t,s,a){},d948:function(t,s,a){"use strict";var e=function(){var t=this;t._self._c;return t._m(0)},n=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"spinner"},[s("div",{staticClass:"bouncing-loader"},[s("div"),s("div"),s("div")])])}],i=(a("5685"),a("2877")),r={},o=Object(i["a"])(r,e,n,!1,null,"451f49a9",null);s["a"]=o.exports}}]);
//# sourceMappingURL=chunk-baf1571a.4e7575cd.js.map