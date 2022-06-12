<template>
  <div class="flex flex-b footer-design">
    <div class="flex">
      <div class="mr-1" @click="handleLike" :class="like"></div>
      <p>{{ numberOfLikes }}</p>
    </div>
    <div class="flex">
      <div class="fa-solid fa-message mr-1"></div>
      <p>{{ comments }}</p>
    </div>
    <div class="flex">
      <div class="mr-1" @click="handleShare" :class="share"></div>
      <p>{{ numberOfShares }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostFooter",
  props: {
    comments: {
      type: Number,
      require: true,
    },
    numberOfLikes: Number,
    numberOfShares: Number,
  },
  data() {
    return {
      hasDislike: true,
      likeIsActive: false,
      shareIsActive: false,
      like: "fa-solid fa-angle-up",
      share: "fa-solid fa-retweet",
    };
  },
  methods: {
    handleLike() {
      this.likeIsActive = !this.likeIsActive;
      this.like = this.likeIsActive
        ? "fa-duotone fa-angle-up"
        : "fa-solid fa-angle-up";
    },
    handleShare() {
      this.shareIsActive = !this.shareIsActive;
      this.share = this.shareIsActive
        ? "fa-light fa-retweet"
        : "fa-solid fa-retweet";
    },
  },
};
</script>

<style>
.postFooter {
  display: flex;
  padding: 1rem 1rem;
  font-size: 1rem;
  text-align: center;
  justify-content: space-between;
  align-items: center;
}
</style>
