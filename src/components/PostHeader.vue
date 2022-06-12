<template>
  <div>
    <div class="postHeader">
      <img :src="profilePic" alt="picture" class="post-profile-pic mr-2" />

      <div class="flex align-center mr-2">
        <div class="mr-2">
          <p class="name">{{ name }}</p>
          <p class="username">@{{ username }}</p>
        </div>
      </div>
      <!-- <span class="created">{{ this.formatDate(created) }} </span> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "PostHeader",

  methods: {

  },

  props: {
    profilePic: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    created: {
      type: String,
      require: true,
    },
    socialMedia: {
      type: String,
      require: true,
    },
  },
};
</script>
