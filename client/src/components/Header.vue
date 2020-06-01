<template>
    <b-navbar>
        <b-navbar-item>
          Titolo
        </b-navbar-item>
    </b-navbar>
</template>

<script>
/* eslint-disable */
export default {
  methods: {
    async logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name:'root'
      })
    }
  }
}
</script>

<style scoped>

</style>
