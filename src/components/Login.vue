<template>
<v-layout row wrap>
    <v-flex xs6 offset-xs3 class="elevation-2 px-4 pa-4 mt-5">
        <v-text-field 
        label="enter your email" 
        v-model="email" 
        @input="err=''"
        ></v-text-field>
        <v-text-field 
        label="enter your password" 
        v-model="password" 
        @keyup.enter="signIn" 
        @input="err = ''"
        :append-icon="show ? 'visibility_off' : 'visibility'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        ></v-text-field>
        <v-alert
        :value="err"
        type="error"
        >
            {{err}}
        </v-alert>
        <v-btn @click="signIn" class="indigo darken-2" dark>Login</v-btn>
        <br>
        <small class="mt-2">do not have account? <router-link to="/register">Register</router-link></small>
    </v-flex>
</v-layout>

</template>

<script>
import {auth} from '../firebase'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      err: '',
      show: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    signIn () {
      if (this.user) return
      auth.signInWithEmailAndPassword(this.email, this.password)
        .catch((err) => {
          this.err = err.message
        })
    }
  }
}
</script>
