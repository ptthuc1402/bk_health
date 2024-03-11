import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import SigninView from '@/views/Authentication/SigninView.vue'
// @ts-ignore
import SignupView from '@/views/Authentication/SignupView.vue'
// @ts-ignore
import ECommerceView from '@/views/Dashboard/ECommerceView.vue'

const routes = [
  {
    path: '/signin',
    name: 'signin',
    component: SigninView,
    meta: {
      title: 'Signin'
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
    meta: {
      title: 'Signup'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: ECommerceView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
const isLoggedIn = localStorage.getItem('user')
const publicPages = ['/signin', '/signup',];
const authRequired = !publicPages.includes(to.path);
  if(authRequired && !isLoggedIn) {
    next('/signin');
  } else {
    next();
  }
})

export default router
