

<template>

  
  <div id="app" >
    <b-navbar>
        <b-navbar-item>
          Titolo
        </b-navbar-item>
    </b-navbar>
    <router-view/>
  </div>

</template>

<script>
import Header from '@/components/Header.vue'
import Drawer from '@/components/Drawer.vue'
export default {
  name: 'App',
  components : {
    Header,
    Drawer
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
