// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import http from './api/http.js'   //axios实例化后引入取名http
 
Vue.prototype.http = http   //放入全局

Vue.config.productionTip = false;
import ElementUI from 'element-ui' //引入js

import 'element-ui/lib/theme-chalk/index.css'//引入css

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
