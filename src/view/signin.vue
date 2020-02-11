<template>
  <div>
    <h1>登陆</h1>
    <input v-model="mobile" />
    <input v-model="password" />
    <button @click="signin">登陆</button>
  </div>
</template>

<script>
  import { authStore } from '@/store'

  export default {
    name: 'login',

    data() {
      return {
        mobile: '',
        password: '',
      }
    },

    methods: {
      async signin() {
        await authStore.signin({ mobile: this.mobile, password: this.password })
        await this.$router.push(authStore.next)
        authStore.signinNext('home')
      },
    },

  }
</script>
