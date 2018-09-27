import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import router from './router'
import store from './store'
import directives from 'vuetify/es5/directives'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VTextField,
  VCard,
  VAlert,
  VDivider,
  VToolTip,
  VSnackbar
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VTextField,
    VCard,
    VAlert,
    VDivider,
    VToolTip,
    VSnackbar
  },
  directives
})

Vue.use(VueFire)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    user: null,
    mes: 'huy'
  },
  router,
  store,
  components: { App },
  template: '<App/>'
})
