/* eslint-disable */
import { createStore } from "vuex";
import router from "@/router";

const store = createStore({
  state: {
    authenticated: false,

    twitter: {
      id: localStorage.getItem("TwitterId") || null,
    },

    facebook: {
      id: localStorage.getItem("FacebookId") || null,
    },
    // accessToken: "",
    // user: {},
  },

  /* Change the actual state */
  mutations: {
    // Make store semi-persistent
    initLocalStorageCache(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
      }
    },

    setAuthenticated(state, payload) {
      state.authenticated = payload;
    },

    setTwitterId(state, payload) {
      state.twitter.id = payload;
    },

    setFacebookId(state, payload) {
      state.facebook.id = payload;
    },

    async logOut(state) {
      localStorage.removeItem("user");
      localStorage.removeItem("jwt");
      localStorage.removeItem("FacebookId");
      localStorage.removeItem("TwitterId");
      localStorage.removeItem("uid");
      localStorage.removeItem("feed");

      if (state.twitter.id) {
        state.twitter.id = null;
      }

      if (!localStorage.getItem("fbAuth")) return router.push("/login");

      /* Sign out from facebook */
      state.facebook.id = null;
      FB.getLoginStatus(async () => {
        await FB.logout(function (response) {
          localStorage.removeItem("fbAuth");
          console.log("User logged out from using Facebook", response);
        });
        return router.push("/login");
      });
    },
  },

  /* Actions to dispatch, that can commit mutations */
  actions: {
    // Auth
    setAuthenticated: async (context, payload) => {
      context.commit("setAuthenticated", payload);
    },

    setTwitterId: async (context, payload) => {
      context.commit("setTwitterId", payload);
    },

    setFacebookId: async (context, payload) => {
      context.commit("setFacebookId", payload);
    },

    logOut: async (context) => {
      context.commit("logOut");
    },
  },

  getters: {
    // getUser(state) {
    //   return state.user;
    // },

    getRandomEmoji() {
      let emojis = [
        "👍",
        "👀",
        "👌",
        "🐱‍🏍",
        "🐱‍👓",
        "🎉",
        "🎈",
        "🥓",
        "🍔",
        "😎",
        "🦄",
        "🐎",
        "🦃",
        "🦾",
        "🦩",
        "🐧",
      ];
      return emojis[Math.floor(Math.random() * emojis.length)];
    },

    getAuth(state) {
      return state.authenticated;
    },

    getAccessToken(state) {
      // return state.accessToken;
      return localStorage.getItem("jwt");
    },

    getUserId() {
      return localStorage.getItem("uid");
    },

    getUser() {
      return localStorage.getItem("user");
    },

    getUserTwitterId(state) {
      return state.twitter.id;
    },

    getUserFbId(state) {
      return state.twitter.id;
    },
  },
});

export default store;
