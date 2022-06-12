import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import ManageView from "../views/ManageView.vue";
import AboutView from "../views/AboutView.vue";
import HelpView from "../views/HelpView.vue";
import SettingsView from "../views/SettingsView.vue";
import SourceDetailView from "../views/SourceDetailView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      auth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: {
      auth: false,
    },
  },
  {
    path: "/manage",
    name: "Manage",
    component: ManageView,
    meta: {
      auth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
    meta: {
      auth: true,
    },
  },
  {
    path: "/help",
    name: "Help",
    component: HelpView,
    meta: {
      auth: true,
    },
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingsView,
    meta: {
      auth: true,
    },
  },
  {
    path: "/details/:id",
    name: "Details",
    component: SourceDetailView,
    meta: {
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

/* Login protect views with meta.auth = true */
router.beforeEach(async (to, from, next) => {
  const accessToken = store.getters.getAccessToken;
  const userId = store.getters.getUserId;
  let error = false,
    authenticated = false;

  if (to.meta.auth) {
    await fetch(`${process.env.VUE_APP_API_URI}/api/validate_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
        "access-control-allow-origin": "*",
      },
      body: JSON.stringify({ userId: userId }),
    })
      .then(async (res) => (res.ok ? res.json() : (error = true)))
      .then(async (res) => {
        if (error) return console.log("Invalid JWT");
        authenticated = true;
        window.localStorage.setItem("jwt", res.accessToken);
      });

    store.dispatch("setAuthenticated", authenticated);
    return authenticated == true ? next() : next("/login");
  }
  next();
});

export default router;
