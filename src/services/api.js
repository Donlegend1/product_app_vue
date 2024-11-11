import axios from "axios";
import { BASE_URL } from "../utils/constants";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    // "Content-Type": "application/json",
  },
});


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


//api calls
export default {
  register(user) {
    return apiClient.post("/register", user);
  },
  login(user) {
    return apiClient.post("/login", user);
  },
  getProducts() {
    return apiClient.get("/products");
  },
  createProduct(product) {
    return apiClient.post("/product", product);
  },
   async orderProduct(params) {
    return apiClient.get("/order", params ); 
  },
  getOrders(filters = {}) {
    const params = {};
    if (filters.fullname) {
      params.fullname = filters.fullname;
    }
    if (filters.product) {
      params.product = filters.product;
    }
    if (filters.amount) {
      params.amount = filters.amount;
    }
     if (filters.order_number) {
       params.order_number = filters.order_number;
     }
    return apiClient.get("/orders", {
      params: params, 
    });
  },
};
