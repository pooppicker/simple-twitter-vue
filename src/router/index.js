import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue"
import store from "./../store/index"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "",
    redirect: "/signin"
  },
  {
    path: "/twitter/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/signin",
    name: "sign-in",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "sign-up",
    component: () => import('../views/SignUp.vue')
  },
  {
    path: "/twitter/Setting",
    name: "Setting",
     component: () => import('../views/UserSetting.vue')
   },
  {
    path: "/twitter/replylist/:id",
    name: "ReplyList",
    component: () => import('../views/ReplyList.vue')
  },
  {
    path: "/twitter/user/:id",
    name: "User",
    component: () => import('../views/User.vue'),
    redirect: "/twitter/user/:id/profile",
    children: [
      {
        path: "profile",
        name: "profile",
        component: () => import('../components/UserProfile.vue')
      },
      {
        path: "Tweets",
        name: "Tweets",
        component: () => import('../components/UserTweet.vue')
      },
      {
        path: "Liked",
        name: "Liked",
        component: () => import('../components/UserLiked.vue')
      },
    ]
  },
  {
    path: "/twitter/user/:id/following",
    name: "User-following",
    component: () => import('../views/UserFollowing.vue')
  },

  {
    path: "/twitter/user/:id/follower",
    name: "User-follower",
    component: () => import('../views/UserFollower.vue')
  },


  {
    path: "/twitter/replylist/:id",
    name: "Reply-list",
    component: () => import('../views/ReplyList.vue')
  },


  {
    path: "/admin/signin",
    name: "admin-sign-in",
    component: () => import('../views/AdminSignIn.vue'),
  },
  {
    path: "/admin/main",
    name: "admin-main",
    component: () => import('../views/AdminMain.vue'),
  },
  {
    path: "/admin/users",
    name: "admin-users",
    component: () => import('../views/AdminUsers.vue'),
  }
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('to', to)
  console.log('from', from)
  store.dispatch('fetchCurrentUser')
  next()
})

export default router;
