<template>
  <div class="wrapper source-details">
    <ButtonBack />
    <div class="sd-author mb-4 flex-b">
      <div class="flex">
        <img
          :src="author.profile_image_url"
          :alt="author.name"
          class="mr-2 sd-img"
        />

        <div class="flex-v-c">
          <!-- <p class="name"><span class="author-mic">🎤</span>{{ author.name }}</p> -->
          <p class="name">{{ author.name }}</p>
          <a href="#" class="username">@{{ author.username }}</a>
        </div>
      </div>
    </div>

    <div class="tweet-text mb-4">
      {{ tweet.text }}
    </div>

    <div class="created mb-4 flex flex-b align-center">
      <p>{{ formatDate(tweet.created_at) }}</p>

      <img class="sd-logo-img" :src="logo" alt="" />
    </div>

    <div class="urls mb-4" v-if="urls.length > 0">
      <div v-for="(url, i) in urls" :key="i">
        <div>
          <h1 class="fs-2 mb-2">{{ url.title }}</h1>
          <p class="lh">{{ url.description }}</p>
          <a :href="url.expanded_url">{{ url.display_url }}</a>
        </div>

        <div class="mt-3" v-for="(img, i) in url.images" :key="i">
          <img class="post-img mt-3" v-show="img.width !== 150" :src="img.url" />
        </div>
      </div>
    </div>

    <div class="hashtags mb-4" v-if="hashtags.length > 0">
      <a href="#" v-for="(hashtag, i) in hashtags" :key="i"
        >#{{ hashtag.tag }}</a
      >
    </div>

    <div class="metrics mb-4">
      <div class="flex flex-b">
        <p>{{ metrics.like_count }} <span>Likes</span></p>
        <p>{{ metrics.retweet_count }} <span>Retweets</span></p>
        <p>{{ metrics.reply_count }} <span>Replies</span></p>
        <p>{{ metrics.quote_count }} <span>Quotes</span></p>
      </div>
    </div>

    <div class="actions mb-4">
      <i class="fa-solid fa-message"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
      <i class="fa-solid fa-arrow-up-from-bracket"></i>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import ButtonBack from "@/components/ButtonBack.vue";
import twitterLogo from "../assets/img/twitter.png";

export default {
  name: "Source-Detail-Page",

  components: {
    ButtonBack,
  },

  data() {
    return {
      logo: twitterLogo,
      postId: null,
      tweet: {},
      hashtags: [],
      urls: [],
      metrics: {},
      author: {},
    };
  },

  methods: {
    async getPost(id) {
      return await fetch(
        `${process.env.VUE_APP_API_URI}/proxy/twitter/tweets/${id}?expansions=author_id&tweet.fields=attachments,created_at,entities,public_metrics`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${process.env.VUE_APP_TWITTER_TOKEN}`,
          },
        }
      )
        .then((response) => response.json())
        .then(async (response) => {
          this.tweet = response.data;
          // console.log("tweet", this.tweet);
          /* Set metrics */
          this.metrics = response.data.public_metrics;
          // console.log("metrics", this.metrics);

          /* Set hashtags */
          if (response.data.entities?.hashtags?.length)
            for (let i = 0; i < response.data.entities.hashtags.length; i++) {
              this.hashtags.push(response.data.entities.hashtags[i]);
            }
          // console.log("hashtags", this.hashtags);

          /* Set urls */
          if (response.data.entities?.urls?.length)
            for (let i = 0; i < response.data.entities.urls.length; i++) {
              this.urls.push(response.data.entities.urls[i]);
            }

          /* Get tweet author */
          await fetch(
            `${process.env.VUE_APP_API_URI}/proxy/twitter/users/${this.tweet.author_id}?user.fields=profile_image_url`,
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${process.env.VUE_APP_TWITTER_TOKEN}`,
              },
            }
          )
            .then((response) => response.json())
            .then((response) => {
              // console.log("author", response);
              this.author = response.data;
            });
        });
    },

    formatDate(date) {
      /* Return if no date is provided */
      if (!date) return;
      /* Check if date is today */
      const today = new Date();
      const postDateTime = new Date(date);

      /* If post was posted today, display hours and minutes */
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
        let hrs = `${hours} hours`,
          min = `${minutes} minutes ago`,
          and = ``;

        if (hours == 1) hrs = `${hours} hour`;
        if (hours == 0) hrs = ``;

        if (minutes == 1) min = `${minutes} minute ago`;
        if (minutes == 0) min = `ago`;

        if (hours > 0 && minutes > 0) and = "and";

        return `${hrs} ${and} ${min}`;
      }

      /* Otherwise display post date */
      const timestamp = new Date(date).getTime();
      const dateObj = new Date(timestamp).toLocaleString("en-GB");
      const postDate = dateObj.slice(0, 10);
      return postDate;
    },
  },

  beforeMount() {
    const route = useRoute();
    this.postId = route.params.id;
    this.getPost(this.postId);
  },
};
</script>
