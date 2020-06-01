<template>
<v-navigation-drawer permanent>
        <v-list-item>
        <v-list-item-content>
            <v-list-item-avatar>
              <v-icon> fas fa-lock </v-icon>
            </v-list-item-avatar>
            <v-list-item-title class="title">
                {{ user.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
                {{ user.balance }}
            </v-list-item-subtitle>
        </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider> 
        
        <v-list dense nav>
        <v-list-item>
        </v-list-item>
        </v-list>
</v-navigation-drawer>
</template>

<script>
export default {
    data(){
        return{
            user : {
                balance: "0",
                name: "ciao",
                icon: "account"
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
