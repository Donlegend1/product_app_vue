// src/stores/authStore.js

import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false, 
    user: null,
    token: null, 
  }),

  actions: {
    // Log in the user and store user data and token
    login(userData, token) {
      this.isLoggedIn = true;
      this.user = userData;
      this.token = token;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(userData));
       window.location = "/order";
    },

    // Log out the user by clearing data
    logout() {
      this.isLoggedIn = false;
      this.user = null;
      this.token = null;
      localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        window.location ='/'
    },

    // Check if the user is logged in on app load
    checkAuthStatus() {
      const token = localStorage.getItem("authToken");
      const user = JSON.parse(localStorage.getItem("user"));
      if (token && user) {
        this.isLoggedIn = true;
        this.token = token;
        this.user = user;
      }
    },
  },

  persist: true, 
});
