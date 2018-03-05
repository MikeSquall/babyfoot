// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';

// Load extern library
import axios from 'axios';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';

// Load intern component
import App from './App';
import router from './router';

// import store from './store'
import storeModule from './store';
import i18n from './languages/i18n';

// Setup Vue instance
Vue.use(VueAxios, axios);
Vue.use(ElementUI, { locale });
Vue.use(Vuex);

Vue.config.productionTip = false;

// Store
const store = new Vuex.Store({
  modules: storeModule,
});

// Interceptor to redirect on standard error
axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 403 || error.response.status === 419) {
      // TODO ERROR 403 FORBIDDEN
      localStorage.removeItem('user');
      store.dispatch('resetUser');
      router.push({ name: 'login' });
    } else if (error.response.status === 500) {
      // TODO ERROR 500 INTERNAL SERVER ERROR
      // eslint-disable-next-line
      console.log('PUSH 500 PAGE');
      // TODO ERROR 404
    } else if (error.response.status === 404) {
      // eslint-disable-next-line
      console.log('PUSH 404 PAGE');
    }
    return error;
  },
);

i18n.locale = store.getters.language;

router.beforeEach((to, from, next) => {
  document.title = i18n.t(to.meta.title);
  next();
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // Attach the Vue instance to the window,
  // so it's available globally.
  created() {
    window.Vue = this;
  },
  router,
  store,
  i18n,
  render: h => h(App),
});
