import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import moment from "moment";

// Sync store and localStorage on state change
store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

createApp(App).use(VueSweetalert2).use(moment).use(router).use(store).mount("#app");
