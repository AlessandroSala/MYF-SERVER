<template>
  <div>
    <h1>
      Register
    </h1>
    <input type="email" name ="email" placeholder="Inserire email" v-model="email" />
    <br>
    <input type="password" name ="password" placeholder="Inserire password" v-model="password" />
    <br>
    <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'HelloWorld',
  data () {
    return {
      email:"",
      password:""
    }
  },
  methods: {
    async register(){
      console.log("pulsante cliccato");
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data);
    }
  }
}
</script>

<style scoped>

</style>
