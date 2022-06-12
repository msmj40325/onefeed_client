<template>
  <div class="feed">
    <!-- If user has no SoMe connections -->
    <div v-show="!connected" class="w-full my-3 text-center">
      <h1>Click to connect media</h1>
      <h1 class="my-1 fs-3"><i class="fa-solid fa-arrow-down"></i></h1>
      <h1 class="fs-4">
        <router-link to="/manage"
          ><i class="fa-solid fa-circle-plus"></i
        ></router-link>
      </h1>
      <h2 class="mt-2 fs-2">to generate your feed!</h2>
    </div>

    <!-- If user has SoMe connections, but no feed OR API rate limits -->
    <div v-show="noFeed" class="text-center">
      <h1 class="mb-2">➗🦶 You have no feed! ➗🦶</h1>
      <h4>Go follow some awesome people 👣</h4>
    </div>

    <!-- Filter -->
    <div v-if="connected">
      <div class="feed-filter">
        <div class="flex flex-b flex-wrap align-center">
          <div class="flex mt-2">
            <button
              @click="filter = 'date'"
              :class="{ active: filter == 'date' }"
              class="filterBtn mr-1"
            >
              Most recent
            </button>
            <button
              @click="filter = 'likes'"
              :class="{ active: filter == 'likes' }"
              class="filterBtn mr-1"
            >
              Most likes
            </button>
          </div>

          <div class="mt-2">
            <p><label for="filterByUser">See tweets from only</label></p>
            @<input
              id="filterByUser"
              type="text"
              v-model="searchUsername"
              placeholder="username"
            />
          </div>
        </div>
      </div>

      <div v-if="filteredTweets.length > 0">
        <MainPost
          v-for="tweet in filteredTweets"
          :key="tweet.tweetData.id"
          :id="tweet.tweetData.id"
          :profilepic="tweet.userData.users[0].profile_image_url"
          :name="tweet.userData.users[0].name"
          :username="tweet.userData.users[0].username"
          :description="tweet.tweetData.text"
          :created="tweet.tweetData.created_at"
          :numberOfLikes="tweet.tweetData.public_metrics.like_count"
          :comments="tweet.tweetData.public_metrics.reply_count"
          :numberOfShares="tweet.tweetData.public_metrics.retweet_count"
        />
      </div>

      <p v-show="filteredTweets.length == 0 && loaded">No tweets found!</p>
      <p v-show="tweets.length <= 0 && !loaded">Loading feed... Hang tight</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import MainPost from "@/components/partials/MainPost.vue";

export default {
  name: "MainFeed",
  components: {
    MainPost,
  },

  data() {
    return {
      tweets: [],
      filter: "date",
      sortByLikes: false,
      connected: false,
      noFeed: false,
      searchUsername: "",
      loaded: false,
    };
  },

  methods: {
    async populateMediaData() {
      /* If user is not connected to twitter */
      if (!this.$store.getters.getUserTwitterId)
        return console.log("User is not connected to Twitter");

      this.connected = true;

      /* Check if local feed exists */
      if (localStorage.getItem("feed") !== null) {
        console.log("using local feed");
        return (this.tweets = JSON.parse(localStorage.getItem("feed")));
      }

      /* *** If local feed doesn't exist, pull tweets from API *** */

      /* Get user IDs of the people this user is following */
      let following = await this.getFollowers(
        this.$store.getters.getUserTwitterId
      );

      /* If user is not following anybody */
      if (!following) {
        console.log(
          "User is not following anyone! Or API rate limit reached :-)"
        );
        return (this.noFeed = true);
      }

      await this.loopFollowersTweets(following);

      /* Store feed to avoid API rate limits */
      localStorage.setItem("feed", JSON.stringify(this.tweets));

      this.loaded = true;
    },

    async loopFollowersTweets(data, limit = 5) {
      // If user is following less than 5 people, set limit to number of people being followed
      if (data.length < limit) limit = data.length;
      /*
       ** limit defaults to 5 in case user is following many people
       ** limit the max amount of people, the user is following, to get tweets from
       */
      for (let index = 0; index < limit; index++) {
        await this.getTweets(data[index].id);
      }
    },

    // Get IDs of people this user is following
    async getFollowers(userId) {
      return await fetch(
        `${process.env.VUE_APP_API_URI}/proxy/twitter/users/${userId}/following`,
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
          return response.data;
        });
    },

    // Get tweets from user ID
    async getTweets(id) {
      const url = `${process.env.VUE_APP_API_URI}/proxy/twitter/users/${id}/tweets?`;

      return await fetch(
        url +
          `tweet.fields=created_at,public_metrics&expansions=author_id&user.fields=profile_image_url&max_results=5`,
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
          for (let i = 0; i < response.data.length; i++) {
            const tweetWithUserData = {
              tweetData: response.data[i],
              userData: response.includes,
            };
            this.tweets.push(tweetWithUserData);
          }
        });
    },

    /* Filter by username */
    filterTweetsByUser(username) {
      const search = username.toLowerCase();
      return this.tweets.filter(
        (tweet) =>
          tweet.userData.users[0].username.toLowerCase().indexOf(search) > -1
      );
    },

    /* Sort tweets by likes */
    likeFilter() {
      return this.tweets.sort((a, b) => {
        return (
          b.tweetData.public_metrics.like_count -
          a.tweetData.public_metrics.like_count
        );
      });
    },

    /* Sort tweets by date */
    sortedTweets() {
      return this.tweets.sort((a, b) => {
        let dateOne = new Date(a.tweetData.created_at).getTime();
        let dateTwo = new Date(b.tweetData.created_at).getTime();
        return dateTwo - dateOne;
      });
    },
  },
  computed: {
    filteredTweets() {
      /* If search query is not null, use search filter */
      if (this.searchUsername.length > 0)
        return this.filterTweetsByUser(this.searchUsername);

      if (this.filter == "date") return this.sortedTweets();
      if (this.filter == "likes") return this.likeFilter();
    },
  },
  beforeMount() {
    this.populateMediaData();
  },
};
</script>
