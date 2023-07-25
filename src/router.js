import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "./views/HomePage.vue";
import LoginForm from "./views/Login.vue";
import RegisterForm from "./views/Register.vue";
import MyProfile from "./views/MyProfile.vue";
import MisPedidos from "./views/MisPedidos.vue";
import ListadoPedidos from "./views/ListadoPedidos.vue";
import AdminStock from "./views/AdminStock.vue";

Vue.use(VueRouter);

const routes = [
  {path: "/", component: HomePage, name: "home"},
  {path: "/login", component: LoginForm, name: "LoginForm"},
  {path: "/register", component: RegisterForm, name: "RegisterForm"},
  {path: "/myprofile", component: MyProfile, name: "MyProfile", meta: { requiresAuth: true }},
  {path: "/mispedidos", component: MisPedidos, name: "MisPedidos", meta: { requiresAuth: true }},
  {path: "/listadoPedidos", component: ListadoPedidos, name: "ListadoPedidos", meta: { requiresAuth: true }},
  {path: "/adminStock", component: AdminStock, name: "AdminStock", meta: { requiresAuth: true }},
]

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (to.matched.some(route => route.meta.requiresAuth) && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;