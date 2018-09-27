<template>
<v-layout row wrap>
    <v-flex xs6 offset-xs3 class="elevation-2 px-4 pa-4 mt-5">
        <v-text-field label="enter your Login" v-model="displayName" :rules="[rules.required]"></v-text-field>
        <v-text-field 
        label="enter your email" 
        :rules="[rules.required, rules.email]"
        v-model="email" 
        @input="err=''"
        ></v-text-field>
        <v-text-field 
        label="enter your password" 
        counter
        :rules="[rules.counterMin, rules.counterMax, rules.required]"
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
        <v-btn @click="signUp" class="indigo darken-2" dark>Register</v-btn>
        <br>
        <small>have account? <router-link to="/login">Login</router-link></small>
    </v-flex>
</v-layout>

</template>

<script>
import {auth, usersRef} from '../firebase'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      displayName: '',
      show: false,
      err: '',
      rules: {
        required: value => !!value || 'Required.',
        counterMax: value => value.length <= 20 || 'Max 20 characters',
        counterMin: value => value.length >= 8 || 'Min 8 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    signUp () {
      if (this.user) {
        this.err = 'you already logined'
        return
      }
      auth.createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.updateProfile()
          this.$store.commit('SET_USER', auth.currentUser)
          usersRef.push({
            displayName: this.displayName,
            email: this.user.email
          })
        })
        .catch((err) => {
          this.err = err.message
        })
    },
    updateProfile () {
      auth.currentUser.updateProfile({
        displayName: this.displayName
      })
    }
  }
}
</script>
