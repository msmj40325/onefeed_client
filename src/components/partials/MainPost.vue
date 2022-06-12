<template>
  <router-link :to="`/details/${id}`" class="post">
    <div class="postContainer">
      <PostHeader
        :profilePic="profilepic"
        :name="name"
        :username="username"
        :socialMedia="socialMedia"
        :group="group"
      />
      <PostBody :description="description" :created="created" />
      <PostFooter
        :comments="comments"
        :numberOfLikes="numberOfLikes"
        :numberOfDislikes="numberOfDislikes"
        :numberOfShares="numberOfShares"
      />
    </div>
  </router-link>
</template>

<script>
import PostHeader from "@/components/PostHeader.vue";
import PostBody from "@/components/PostBody.vue";
import PostFooter from "@/components/PostFooter.vue";

export default {
  name: "MainPost",

  components: {
    PostHeader,
    PostBody,
    PostFooter,
  },

  props: {
    id: String,
    profilepic: String,
    name: String,
    username: String,
    created: String,
    socialMedia: String,
    group: String,
    description: String,
    comments: Number,
    numberOfLikes: Number,
    numberOfDislikes: Number,
    numberOfShares: Number,
  },
};
</script>
