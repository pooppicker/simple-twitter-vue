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
    beforeEnter: authorizeIsAdmin
  },
  {
    path: "/admin/main",
    name: "admin-main",
    component: () => import('../views/AdminMain.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: "/admin/users",
    name: "admin-users",
    component: () => import('../views/AdminUsers.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: "/admin/404",
    name: "admin-error",
    component: () => import('../views/Admin404.vue'),
  },
  {
    path: "*",
    name: "error",
    component: () => import('../views/404.vue'),
  }
];

const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  const pathsWithoutAuthentication = ['sign-up', 'sign-in']
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/twitter/Home')
    return
  }

  next()
})

const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.role === 'user') {
    next('/admin/404')
    return
  }

  next()
}

export default router;
