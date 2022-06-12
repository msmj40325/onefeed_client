<template>
  <button :type="type" :class="classes">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "ButtonMain",
  props: {
    text: String,
    type: String,
    dynamicClass: String,
    classes: String,
  },
};
</script>
