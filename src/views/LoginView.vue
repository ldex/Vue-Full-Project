<template>
  <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input
              label="Email"
              type="email" name="email" v-model="email" autofocus autocomplete="off" />
        <br />
        <input
              label="Password"
              type="password" name="password" v-model="password" />
        <br />
        <button type="submit">Login</button>
      </form>
  </div>
</template>

<script>
import { useProductStore } from '@/stores/product';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      const productStore = useProductStore();
      productStore
        .login({
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: "admin" });
          console.log('Successfully logged in!');
        })
        .catch(error => {
          console.error('Unsuccessful login: ', error.response);
        });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>