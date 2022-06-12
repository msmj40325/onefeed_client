<template>
  <div class="input-row">
    <label :for="id"
      >{{ label }} <span v-if="required" class="required">*</span></label
    >
    <input
      :id="id"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      :class="classes"
      @change="$emit('inputChange', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    id: String,
    type: {
      type: String,
      required: true,
    },
    required: Boolean,
    placeholder: String,
    classes: String,
    label: String,
  },
};
</script>
