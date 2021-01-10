<template>
  <div>
    <Modal v-if="isErrorOccurred" @dismiss="closeModal">
      <h1>Error occurred</h1>
      <p>{{ errorMessage }}</p>
    </Modal>
    <Header />
    <b-container fluid="lg">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </b-container>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Modal from "./components/UI/Modal.vue";
export default {
  name: "App",
  components: {
    Header,
    Modal,
  },
  computed: {
    isErrorOccurred() {
      return this.$store.getters.getErrorState.show;
    },
    errorMessage() {
      return this.$store.getters.getErrorState.message.error;
    },
  },
  methods: {
    closeModal() {
      this.$store.commit("dismissError");
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>>