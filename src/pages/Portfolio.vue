<template>
  <h2 v-if="isLoggedIn">Your Portfolio</h2>
  <p v-else>Login to see your portfolio</p>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
};
</script>

<style>
</style>