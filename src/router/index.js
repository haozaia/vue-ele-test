import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import first1 from '@/components/first1';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/111',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/',
      name: 'first1',
      component: first1,
    },
  ],
});
