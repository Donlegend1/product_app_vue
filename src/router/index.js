import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePage.vue";
import Login from "../views/auth/LoginPage.vue";
import Register from "../views/auth/RegisterPage.vue";
import Products from "../views/products/ProductList.vue";
import CreateProduct from "../views/products/CreateProduct.vue";
import Order from "../views/orders/OrderProduct.vue";
import NotFound from "../views/NotFound.vue"; 
import { useAuthStore } from "../stores/authStore"; 

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      if (auth.isLoggedIn) {
        next({ name: "Home" }); 
      } else {
        next(); 
      }
    },
  },

  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      if (auth.isLoggedIn) {
        next({ name: "Home" });
      } else {
        next();
      }
    },
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      if (!auth.isLoggedIn) {
        next({ name: "Login" }); 
      } else {
        next(); 
      }
    },
  },

  {
    path: "/create-product",
    name: "CreateProduct",
    component: CreateProduct,
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      if (!auth.isLoggedIn) {
        next({ name: "Login" }); 
      } else {
        next(); 
      }
    },
  },

  {
    path: "/order",
    name: "Order",
    component: Order,
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      if (!auth.isLoggedIn) {
        next({ name: "Login" }); 
      } else {
        next(); 
      }
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
