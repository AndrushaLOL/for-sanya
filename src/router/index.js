import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/StartPage'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Messages from '@/components/Messages'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Start',
      component: StartPage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
})
