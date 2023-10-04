<template>
  <div class="home">
    <h2>Welcome to our store!</h2>
    <modal-button button-text="Open Modal!"></modal-button>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
import ModalButton from '@/components/ModalButton.vue';

export default {
  name: 'HomeView',
  components: {
    ModalButton
  }
}
</script>
