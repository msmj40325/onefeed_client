<template>
  <div>
    <div ref="pageOverlay" id="pagelayer" @click="closeBurger()"></div>
    <div ref="burgerMenu" class="sideBar">
      <div class="sideBar-content">
        <i @click="closeBurger()" class="fa-solid fa-xmark"></i>
        <router-link @click="closeBurger()" to="/">Home</router-link>
        <router-link @click="closeBurger()" to="/manage">Manage</router-link>
        <router-link @click="closeBurger()" to="/help">Help</router-link>
        <router-link @click="closeBurger()" to="/settings"
          >Settings</router-link
        >
        <a @click="closeBurger(); this.$store.dispatch('logOut');">Log out</a>
      </div>
    </div>
    <div class="burger-nav">
      <div @click="openBurger()" class="burger">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BurgerMenu",
  methods: {
    openBurger() {
      this.$refs.burgerMenu.style.width = "75%";
      this.$refs.pageOverlay.style.display = "block";
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    },
    closeBurger() {
      this.$refs.burgerMenu.style.width = "0%";
      this.$refs.pageOverlay.style.display = "none";
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    },
  },
};
</script>
