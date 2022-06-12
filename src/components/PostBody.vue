<template>
  <div class="postBody">
    <p>{{ description }}</p>
    <div class="flex flex-b w-full align-center mt-4">
      <span class="created">{{ this.formatDate(created) }} </span>
      <img class="soMeLogo" :src="twitterLogo" alt="SoMe" />
    </div>
  </div>
</template>

<script>
import twitterLogo from "@/assets/img/twitter.png";

export default {
  name: "Post-body",

  data() {
    return {
      twitterLogo: twitterLogo,
    };
  },
  props: {
    description: {
      type: String,
      require: true,
    },
    image: String,
    created: String,
  },
  methods: {
    formatDate(date) {
      /* Return if no date is provided */
      if (!date) return;
      /* Check if date is today */
      const today = new Date();
      const postDateTime = new Date(date);

      /* If post was posted today, display hours / minutes */
      if (
        postDateTime.getDate() == today.getDate() &&
        postDateTime.getMonth() == today.getMonth() &&
        postDateTime.getFullYear() == today.getFullYear()
      ) {
        const hours = parseInt(
          (Math.abs(postDateTime - today) / (1000 * 60 * 60)) % 24
        );
        const minutes = parseInt(
          (Math.abs(postDateTime.getTime() - today.getTime()) / (1000 * 60)) %
            60
        );

        const hrs = hours !== 0 ? `${hours} hr.` : ``;

        return `${hrs} ${minutes} min.`;
      }

      /* Otherwise display post date */
      const timestamp = new Date(date).getTime();
      const dateObj = new Date(timestamp).toLocaleString("en-GB");
      const postDate = dateObj.slice(0, 10);
      return postDate;
    },
  },
};
</script>
