<template>
  <b-form-select
    v-model="selected"
    :options="options"
    @change="update"
    size="sm"
  ></b-form-select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selected: "USD",
    };
  },
  methods: {
    update() {
      this.$emit("updateSelection", this.selected);
    },
  },
};
</script>

