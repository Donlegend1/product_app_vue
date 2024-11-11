import { createApp } from "vue";
import "./assets/styles.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import { useAuthStore } from "./stores/authStore";

const app = createApp(App);

// Create Pinia instance and use it in the app
const pinia = createPinia();
app.use(pinia);

// Use the router
app.use(router);

// Mount the app
app.mount("#app");

// Now that Pinia is active, we can use the store
const authStore = useAuthStore();
authStore.checkAuthStatus(); // Ensure that this runs after app.mount
