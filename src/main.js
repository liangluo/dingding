import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
//vuex

Vue.config.productionTip = false;

//引入mint

Vue.use(MintUI);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })