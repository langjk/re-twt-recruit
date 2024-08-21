import { createWebHistory, createRouter } from "vue-router";
import type { App } from "vue";
// 获取所有路由
import routes from "./routes";

const router = createRouter({
  routes,
  // 这里使用历史记录模式
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  var token = localStorage.getItem("token");
  from;
  // 检查用户是否登录
  if (!token) {
    // 假设 isLoggedIn 是你用来判断用户是否登录的状态
    // 如果用户未登录，并且尝试访问需要登录的页面
    if (to.meta.requiresAuth) {
      // 重定向到登录页面
      next({ name: "login" }); // 假设你的登录页面路由名为 'Login'
    } else {
      // 如果用户未登录，但尝试访问的页面不需要登录，则继续导航
      next();
    }
  } else {
    // 如果用户已登录，则继续导航
    next();
  }
});

export const useRouter = (app: App<Element>): void => {
  app.use(router);
};
