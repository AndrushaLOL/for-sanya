<template>
  <v-layout row wrap style="max-height: 100px">
    <v-flex xs12 md6 offset-md3  class="mt-5" >
      
        <v-card >
          <v-toolbar class="indigo darken-2" dark v-if="!isMob"> 
            <v-toolbar-title >
              Chat
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text style="height: 200px" class="scroll-y">
            <v-container grid-list-xs >
            <v-list>
              <template  v-for="(message) in messages" >     
                <v-list-tile :key="message.mesId" class="mt-3" @mouseover="message.hover=true" @mouseout="message.hover=false">
                  <v-list-tile-content>
                    <v-list-tile-sub-title>{{message.nick}}</v-list-tile-sub-title>
                    <v-list-tile-title><span class="font-weight-medium">{{message.text}}</span></v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-layout row wrap>
                      <v-flex>
                      <v-btn 
                        color="grey lighten-2" 
                        small 
                        icon 
                        v-if="user && user.uid === message.mesUid && message.hover"
                        @click="removeMessage(message.mesId, message.mesUid)"
                      ><v-icon small>remove</v-icon></v-btn>
                      <v-tooltip bottom>
                        <v-btn 
                          slot="activator" 
                          color="grey lighten-2" 
                          small 
                          icon 
                          v-if="user && user.uid === message.mesUid && message.hover" 
                          class="ml-2"
                          disabled
                          ><v-icon small>edit</v-icon></v-btn>
                        <span>coming soon</span>
                      </v-tooltip>
                      </v-flex>
                    </v-layout>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider :key="message.mesId+'huy'" class="mt-1"></v-divider>
              </template>
            </v-list>
            <div id="scroll-target" ref="scroll"></div>
              </v-container>


            <v-snackbar
              v-model="value"
            >
              {{err}}
              <v-btn flat color="primary" @click.native="value = false">Close</v-btn>
            </v-snackbar>
            </v-card-text>
            <v-card-actions class="mt-3 px-4">
              
              <v-text-field
                name="name"
                id="id"
                v-model="message"
                placeholder="message"
                clearable
                @keyup.enter="addMessage"
                @input="err= ''"
                absolute
              ></v-text-field>
              <v-btn 
                flat 
                icon 
                color="primary" 
                class="ml-2" 
                :disabled="message === ''" 
                @click="addMessage"
                ><v-icon>send</v-icon>
              </v-btn>
          </v-card-actions>
        </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { messagesRef } from '../firebase'

export default {
  name: 'Messages',
  data () {
    return {
      messages: [],
      message: '',
      err: '',
      value: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    isMob () {
      return this.breakpoint.xs === true && !(this.breakpoint.sm * this.breakpoint.md * this.breakpoint.lg * this.breakpoint.xl)
    },
    breakpoint () {
      return this.$vuetify.breakpoint
    }
  },
  created () {
    messagesRef.on('value', snapshot => {
      let messages = []
      snapshot.forEach(element => {
        let { createdAt, nick, mesUid, text } = element.val()
        messages.push({
          text,
          mesUid,
          mesId: element.key,
          createdAt,
          nick,
          hover: false
        })
      })
      this.messages = messages
    })
  },
  methods: {
    link () {
      this.message = ''
    },

    addMessage () {
      if (!this.user) {
        this.err = 'you must log in'
        this.value = true
        return
      }
      messagesRef.push({
        mesUid: this.user.uid,
        text: this.message,
        createdAt: new Date().getTime(),
        nick: this.user.displayName
      })
      .catch((err) => {
        this.err = err.message
      })
      this.message = ''
    },

    removeMessage (mesId, mesUid) {
      if (!this.user) {
        return
      }
      if (mesUid === this.user.uid) {
        messagesRef.child(mesId).remove()
      }
    }
  },
  watch: {
    messages (value) {
      console.log('changed')
      this.$vuetify.goTo('#scroll-target', {
        duration: 100,
        offset: -100,
        easing: 'linear'
      })
    }
  }
}
</script>
