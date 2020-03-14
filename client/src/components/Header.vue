<template>
<v-card
    color="grey lighten-4"
    class="white--text"
    flat
    tile
  >
    <v-toolbar color="primary">
      <v-app-bar-nav-icon class="white--text"></v-app-bar-nav-icon>

      <v-toolbar-title  class="white--text" >Manage Your Finance</v-toolbar-title>

      <v-spacer></v-spacer>
    <router-link to="home">
      <v-btn icon class="white--text mr-2">
        <v-icon class="white--text">mdi-home</v-icon>
      </v-btn>
        </router-link>
        <router-link to="login"> <v-btn dark outlined depressed class="mr-2">Sign in</v-btn> </router-link>
        <router-link to="register"><v-btn dark outlined depressed >Sign up</v-btn></router-link>
    </v-toolbar>
  </v-card>

</template>

<script>
/* eslint-disable */
export default {
}
</script>

<style scoped>

</style>
