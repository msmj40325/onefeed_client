<template>
  <div class="page">
    <header>
      <MainNavigation v-if="this.$route.name !== 'Login'" />
    </header>

    <main>
      <router-view />
    </main>

    <FooterMain v-if="this.$route.name !== 'Login'" />
    <div v-if="this.$route.name == 'Login'" class="waves"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import MainNavigation from "@/components/MainNavigation.vue";
import FooterMain from "@/components/FooterMain.vue";

export default {
  name: "App",
  components: {
    MainNavigation,
    FooterMain,
  },
  beforeCreate() {
    // Init semi-persistent store
    this.$store.commit("initLocalStorageCache");
  },
};
</script>

<style lang="scss">
@use "./assets/scss/__reset.scss";
@use "./assets/scss/app.scss";
</style>
