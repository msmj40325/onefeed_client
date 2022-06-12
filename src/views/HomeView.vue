<template>
  <div class="home">
    <div class="wrapper">
      <h4 class="fs-3 fw-7">{{ getWelcomeMessage(user.firstName) }}</h4>
      <MainFeed />
      <FooterMain />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MainFeed from "@/components/partials/MainFeed.vue";
import FooterMain from "@/components/FooterMain.vue";

import moment from "moment";

export default {
  name: "HomeView",
  data() {
    return {
      user: {},
    };
  },
  components: {
    MainFeed,
    FooterMain,
  },

  methods: {
    getUser() {
      this.user = JSON.parse(this.$store.getters.getUser);
    },
    goBack() {
      this.$router.back();
    },

    getWelcomeMessage(name) {
      const currentHour = moment().hour();

      if (currentHour >= 6 && currentHour < 12)
        return `Good morning, ${name} ☕`;

      if (currentHour >= 12 && currentHour < 18)
        return `Good afternoon, ${name} ${this.$store.getters.getRandomEmoji}`;

      return `Good evening, ${name} ${this.$store.getters.getRandomEmoji}`;
    },
  },
  created() {
    this.getUser();
  },
};
</script>
