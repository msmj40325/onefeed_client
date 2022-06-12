<template>
  <div>
    <nav class="nav-bar">
      <router-link class="logo" to="/"><h1>OneFeed</h1></router-link>
      <BurgerMenu />
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/manage">Manage</router-link>
        <router-link to="/help">Help</router-link>
        <router-link to="/settings">Settings</router-link>
        <router-link to="/login" v-if="!this.$store.getters.getAuth"
          >Login</router-link
        >
        <router-link
          to="/login"
          v-if="this.$store.getters.getAuth"
          @click="this.$store.dispatch('logOut')"
          >Log out</router-link
        >
      </div>
    </nav>
  </div>
</template>

<script>
import BurgerMenu from "@/components/BurgerMenu.vue";
export default {
  name: "MainNavigation",
  components: {
    BurgerMenu,
  },
  props: {},
};
</script>
