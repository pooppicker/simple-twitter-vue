import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue"


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect:"/twitter/Home"
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
    path: "/admin/signin",
    name: "admin-sign-in",
    component: () => import('../views/AdminSignIn.vue'),
  }
];

const router = new VueRouter({
  routes,
});

export default router;
