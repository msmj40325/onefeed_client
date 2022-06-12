<template>
  <div class="wrapper">
    <div v-if="!signup" class="login-wrapper">
      <h1 class="text-center">OneFeed</h1>
      <LoginForm @login="handleLogin" class="login-form" />

      <div class="forgot-password">
        <a href="#">Forgot password?</a>
      </div>
    </div>

    <div v-if="signup" class="login-wrapper">
      <h1 class="text-center">Register</h1>
      <RegisterForm @register="handleRegister" />
    </div>

    <button @click="handleLoginFacebook" class="fb-login">
      <i class="fab fa-facebook-f"></i>
      <span v-show="!signup">Sign in with Facebook</span>
      <span v-show="signup">Continue with Facebook</span>
    </button>

    <ButtonMain
      @click="signup = !signup"
      :text="!signup ? 'Create new account' : 'Already have an account?'"
      classes="sign-in-or-up"
    />
  </div>
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import store from "@/store/index.js";
import LoginForm from "@/components/partials/LoginForm.vue";
import RegisterForm from "@/components/partials/RegisterForm.vue";
import ButtonMain from "@/components/ButtonMain.vue";
import Swal from "sweetalert2";

export default {
  name: "HomeView",
  components: {
    LoginForm,
    RegisterForm,
    ButtonMain,
  },
  data() {
    return {
      signup: false,
    };
  },

  methods: {
    async handleLoginFacebook() {
      const that = this;
      await FB.login(
        (response) => {
          fetch(`${process.env.VUE_APP_API_URI}/api/auth/facebook`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "access-control-allow-origin": "*",
            },
            body: JSON.stringify(response),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.error)
                return Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: `${res.error}`,
                  footer: '<a href="#">Forgot your password?</a>',
                });
              localStorage.setItem("fbAuth", true);
              that.handleLogin(res);
            })
            .catch((error) => {
              console.log("error:", error);
            });
        },
        {
          scope: "email",
          return_scopes: true,
        }
      );
    },

    async handleLogin(val) {
      /* Sweetalert success toast */
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      /* If error */
      if (!val)
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email and password don't match",
          footer: '<a href="#">Forgot your password?</a>',
        });

      window.localStorage.setItem("user", JSON.stringify(val?.user));
      window.localStorage.setItem("jwt", val?.accessToken);
      window.localStorage.setItem("uid", val?.user?.id);

      /* If user has Facebook connection, set localStorage */
      //   if (val?.user?.facebookID)
      //     window.localStorage.setItem("fbId", val.user.facebookID);

      /* Set localstorage for each social connection */
      for (let i = 0; i < val?.social_connections?.length; i++) {
        /* Set local storage */
        window.localStorage.setItem(
          `${val.social_connections[i].social_name}Id`,
          val.social_connections[i].social_user_id
        );

        /* Set vuex */
        if (val.social_connections[i].social_name.toLowerCase() == "twitter")
          this.$store.dispatch(
            "setTwitterId",
            val.social_connections[i].social_user_id
          );
        if (val.social_connections[i].social_name.toLowerCase() == "facebook")
          this.$store.dispatch(
            "setFacebookId",
            val.social_connections[i].social_user_id
          );
      }

      Toast.fire({
        icon: "success",
        title: "Signed in successfully!",
      });

      return this.$router.push("/");
    },

    handleRegister(val) {
      if (val == true) {
        this.signup = false;
        return Swal.fire({
          icon: "success",
          title: `Registration complete!`,
          text: "Welcome to OneFeed 🎉",
        });
      }
    },
  },

  /* If user is signed in, redirect to home */
  async beforeRouteEnter(to, from, next) {
    let authenticated = false,
      error = false;
    const accessToken = store.getters.getAccessToken;
    const userId = store.getters.getUserId;

    if (accessToken) {
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
    }

    store.dispatch("setAuthenticated", authenticated);
    authenticated == true ? next("/") : next();
  },
};
</script>
