<template>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar  color="primary" flat dark >
                <v-toolbar-title>Welcome Back!</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field label="Email" name="email" type="email" v-model="email" />
                  <v-text-field  id="password"  label="Password" name="password"  type="password" v-model="password"/>

                </v-form>
                <div v-html="error" class="error"/>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  
</template>


<script>
/* eslint-disable */
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data(){
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login(){
      try {
      const response = await AuthenticationService.login({
        email: this.email,
        password: this.password
      })
      } catch (e){
        console.log(e)
        this.error = e.response.data.error
      }
    }
  },
  props: {
      source: String,
    }
}
</script>

<style scoped>

</style>
