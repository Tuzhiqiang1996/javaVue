import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import(/* webpackChunkName: "Login" */ "@/view/Login.vue")
  },
  {
    path: "/home",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "@/page/index.vue"),
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  {
    path: "/edit/:blogid/edit",
    name: "editblogid",
    component: () =>
      import(/* webpackChunkName: "editblogid" */ "@/page/blogsedit.vue"),
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  {
    path: "/edits",
    name: "edit",
    component: () =>
      import(/* webpackChunkName: "edit" */ "@/page/blogsedit.vue"),
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  {
    path: "/blogs/:blogid",
    name: "blogId",
    component: () => import(/* webpackChunkName: "blogId" */ "@/page/blogs.vue")
  },
  {
    path: "/editchange",
    name: "editchange",
    component: () =>
      import(/* webpackChunkName: "editchange" */ "@/page/editchange.vue")
  },
  {
    path: "/userlist",
    name: "userlist",
    component: () =>
      import(/* webpackChunkName: "userlist" */ "@/page/userlist.vue")
  },
  {
    path: "/systemList",
    name: "systemList",
    component: () =>
      import(/* webpackChunkName: "systemList" */ "@/page/systemList.vue")
  },
  {
    path: "/orderList",
    name: "orderList",
    component: () =>
      import(/* webpackChunkName: "orderList" */ "@/page/orderList.vue")
  },
  {
    path: "/devlogList",
    name: "devlogList",
    component: () =>
      import(/* webpackChunkName: "devlogList" */ "@/page/devlogList.vue")
  },
  {
    path: "/devList",
    name: "devList",
    component: () =>
      import(/* webpackChunkName: "devList" */ "@/page/devList.vue")
  },
  {
    path: "/userinfo",
    name: "userinfo",
    component: () =>
      import(/* webpackChunkName: "userinfo" */ "@/page/userinfo.vue")
  },
  {
    path: "/updown",
    name: "updown",
    component: () =>
      import(/* webpackChunkName: "updown" */ "@/pages/updown.vue")
  },
  {
    path: "*",
    redirect: "/404"
  },
  {
    path: "/404",
    name: "404",
    component: () => import(/* webpackChunkName: "404 */ "@/view/notFound.vue")
  }
];
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//避免重复跳转产生问题
const VueRouterPush = Router.prototype.push;
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err);
};
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限

    if (localStorage.getItem("token")) {
      // 通过vuex state获取当前的token/name是否存在
      next();
    } else {
      next({
        path: "/",
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});
export default router;
