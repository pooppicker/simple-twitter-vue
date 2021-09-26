import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue"
import store from "./../store/index"

Vue.use(VueRouter);
//const AdmintokenInLocalStorage = localStorage.getItem('admin-token')

/*const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (!AdmintokenInLocalStorage && currentUser && currentUser.role === 'user') {
    next('/admin/404')
    return
  }

  next()
}*/


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
    component: () => import('../views/UserSetting.vue'),

  },
  {
    path: "/twitter/replylist/:id",
    name: "ReplyList",
    component: () => import('../views/ReplyList.vue'),

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
        component: () => import('../components/UserProfile.vue'),

      },
      {
        path: "Tweets",
        name: "Tweets",
        component: () => import('../components/UserTweet.vue'),

      },
      {
        path: "Liked",
        name: "Liked",
        component: () => import('../components/UserLiked.vue'),

      },
    ]
  },
  {
    path: "/twitter/user/:id/following",
    name: "User-following",
    component: () => import('../views/UserFollowing.vue'),

  },

  {
    path: "/twitter/user/:id/follower",
    name: "User-follower",
    component: () => import('../views/UserFollower.vue'),

  },


  {
    path: "/twitter/replylist/:id",
    name: "Reply-list",
    component: () => import('../views/ReplyList.vue'),

  },

  {
    path: "/twitter/message/public",
    name: "Public-message",
    component: () => import('../views/PublicMessage.vue'),

  },
  {
    path: "/twitter/notification",
    name: "Notification",
    component: () => import('../views/Notification.vue'),
  },

  {
    path: "/twitter/message/private/:id",
    name: "Private-message",
    component: () => import('../views/PrivateMessage.vue'),

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
    //
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
  const AdmintokenInLocalStorage = localStorage.getItem('admin-token')

  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  const pathsWithAdmin = ['admin-main', 'admin-users']
  //管理員需有token才能去
  if (AdmintokenInLocalStorage && pathsWithAdmin.includes(to.name)) {
    next()
    return
  }

  //管理員沒有token直接倒去登入頁面

  if (!AdmintokenInLocalStorage && pathsWithAdmin.includes(to.name)) {
    next('/admin/signin')
    return
  }

  //已登入的管理員不能去登入頁

  if (AdmintokenInLocalStorage && to.name.includes("admin-sign-in")) {
    next('/admin/main')
    return
  }

  //登入的使用者驗證

  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  const pathsWithoutAuthentication = ['sign-up', 'sign-in',]

  //非使用者僅可去管理員登入頁面、註冊和登入頁面，否則返回登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name) && !to.name.includes('admin-sign-in')) {
    next('/signin')
    return
  }

  //已登入的使用者不能去登入頁

  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/twitter/Home')
    return
  }

  next()
})






export default router;
