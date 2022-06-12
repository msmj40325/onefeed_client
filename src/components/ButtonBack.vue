<template>
  <a @click="goBack()" class="btn mb-3">
    <i class="fa-solid fa-arrow-left"></i>
  </a>
</template>

<script>
import router from "@/router";

export default {
  name: "ButtonBack",
  methods: {
    goBack() {
      router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
$btn-size: 50px;
$btn-color: #000;

header {
  width: 100%;
}

.btn {
  display: block;
  height: $btn-size;
  width: $btn-size;
  text-align: center;
  left: 0;
}

i {
  font-size: calc($btn-size - 15px);
  line-height: $btn-size;
  color: $btn-color;
}
</style>
