<template>
<v-card
    color="grey lighten-4"
    class="white--text"
    flat
    tile
  >
    <v-toolbar color="primary">
      <v-app-bar-nav-icon class="white--text" v-if="$store.state.userLogged"></v-app-bar-nav-icon>

      <v-toolbar-title  class="white--text" >Manage Your Finance</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon to="home" class="white--text mr-2">
        <v-icon class="white--text">mdi-home</v-icon>
      </v-btn>
        <v-btn dark outlined depressed class="mr-2" to="login" v-if="!$store.state.userLogged">Sign in</v-btn>
        <v-btn dark outlined depressed to="register" v-if="!$store.state.userLogged">Sign up</v-btn>
        <v-btn dark outlined depressed @click="logout" v-if="$store.state.userLogged">Log Out</v-btn>
    </v-toolbar>
  </v-card>

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
