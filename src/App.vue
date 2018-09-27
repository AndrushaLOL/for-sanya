<template>
  <v-app>
    <v-toolbar app color="indigo darken-3" dark>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-btn flat to="/messages">Messages</v-btn>
      <v-spacer></v-spacer>
      <span v-if="user" class="headline">{{user.displayName}}</span>
      <v-btn flat @click="signOut" v-if="user" to>Sign Out</v-btn>
      <v-btn>huy</v-btn>
      <v-btn flat @click="signOut" v-if="!user && this.$route.path !== '/login'" to="/login">Login</v-btn>
      <v-btn flat @click="signOut" v-if="!user && this.$route.path !== '/register'" to="/register">Register</v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import {
    auth
  } from './firebase'
  
  export default {
    data () {
      return {
        title: 'VueChat',
        count: 1
      }
    },
    name: 'App',
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    methods: {
      signOut () {
        auth.signOut()
      }
    },
    created () {
      auth.onAuthStateChanged((user) => {
        this.$store.commit('SET_USER', user)
        if (user) {
          this.$router.replace({
            name: 'Messages'
          })
        } else {
          this.$router.replace({
            name: 'Login'
          })
        }
      })
    },
    mounted () {
      if (this.user) {
        this.$router.replace({
          name: 'Messages'
        })
      } else {
        this.$router.replace({
          name: 'Login'
        })
      }
    }
  }
</script>
