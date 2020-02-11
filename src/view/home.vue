<template>
  <div>
    <img src="@/assets/logo.png" alt="" />
    <div @click="nav">username: {{ user.nickname }}</div>
    <h2>{{ info.customer_service_name }}</h2>
    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
  </div>
</template>

<script>
  export default {
    name: 'home',

    data() {
      return {
        info: {},
        user: {},
      }
    },

    async mounted() {
      await Promise.all([
        this.fetchMember(),
        this.fetchUser(),
      ])
      // const { data } = await this.fetchData()
      // this.info = data
    },

    methods: {
      fetchData() {
        return axios.get('site_configs')
      },

      nav() {
        this.$router.push('order')
      },

      fetchMember() {
        return axios.get('members')
      },

      fetchUser() {
        return axios.get('users')
      },

      search() {
        this.$message('hihi')
      },
    },
  }
</script>
