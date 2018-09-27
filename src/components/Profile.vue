<template>
  <v-layout row wrap>
    <v-flex xs6 offset-xs3>
      <p>{{user}}</p>
    </v-flex>
  </v-layout>
</template>

<script>
import {auth} from '../firebase'

export default {
  name: 'Profile',
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  mounted () {
    console.log(auth.currentUser.getIdToken())
  }
}
</script>
