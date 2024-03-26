import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/pageHome.vue'
import pgPrincipal from '../pages/pagePrincipal.vue'

Vue.use(VueRouter)

const routes = [
    {
		path: '',
		component: Home,
    },
    {
      path: '/Principal',
      component: pgPrincipal,
    }
];

const router = new VueRouter({
    mode:'history',
    routes,  
   
})

export default router;