import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: 'AIzaSyCSbjQPg3aTCeC4_7Bjp5QSgwxvjdaDz50',
  authDomain: 'vue-fir.firebaseapp.com',
  databaseURL: 'https://vue-fir.firebaseio.com',
  projectId: 'vue-fir',
  storageBucket: 'vue-fir.appspot.com',
  messagingSenderId: '618545500733'
})

const db = app.database()
export const messagesRef = db.ref('messages')
export const auth = app.auth()
export const usersRef = db.ref('users')
