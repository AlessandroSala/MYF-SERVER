<template>
  <v-app>
  <div id="app" >
    <p-header />
    <router-view/>
  </div>
  </v-app>
</template>

<script>
import PHeader from '@/components/Header.vue'
export default {
  name: 'App',
  components : {
    PHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
